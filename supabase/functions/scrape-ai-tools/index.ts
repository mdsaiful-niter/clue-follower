import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SOURCES = [
  { url: "https://theresanaiforthat.com/new/", name: "TAAFT" },
  { url: "https://www.futuretools.io/recently-added", name: "FutureTools" },
  { url: "https://www.producthunt.com/topics/artificial-intelligence", name: "ProductHunt" },
];

const VALID_CATEGORIES = [
  "chat-ai", "image-generation", "video-generation", "audio-ai", "music-ai",
  "presentation-ai", "writing-ai", "coding-ai", "productivity-ai", "research-ai",
  "marketing-ai", "design-ai", "website-builder", "avatar-ai", "data-analysis",
  "automation-ai", "document-ai", "meeting-ai", "education-ai", "social-media-ai",
  "seo-ai", "ecommerce-ai", "ai-agents", "translation-ai", "legal-ai",
  "healthcare-ai", "finance-ai", "hr-ai", "customer-support-ai", "3d-ai",
  "photo-editing-ai", "email-ai", "sales-ai", "cybersecurity-ai", "real-estate-ai",
  "gaming-ai", "fashion-ai", "food-ai", "travel-ai", "fitness-ai",
  "video-ai", "data-analytics", "security-ai", "robotics-ai", "open-source-ai", "ai-api"
];

async function scrapeSource(url: string, apiKey: string): Promise<string> {
  const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      formats: ['markdown'],
      onlyMainContent: true,
      waitFor: 3000,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    console.error(`Firecrawl error for ${url}:`, data);
    return '';
  }
  return data?.data?.markdown || data?.markdown || '';
}

async function parseToolsWithAI(markdown: string, sourceName: string, aiApiKey: string): Promise<any[]> {
  const prompt = `You are an AI tool directory parser. Extract NEW AI tools from the following scraped content from ${sourceName}.

For each tool found, return a JSON array of objects with these fields:
- name: string (tool name)
- description: string (1-2 sentence description, max 120 chars)
- category: string (must be one of: ${VALID_CATEGORIES.join(', ')})
- pricingType: "free" | "freemium" | "free_trial" | "paid"
- popularityScore: number 50-90 (estimate based on mentions/traction)
- trending: boolean (true if recently popular)
- isNew: boolean (true - these are new tools)
- websiteUrl: string (full URL)

ONLY return valid JSON array. No markdown, no explanation. If no tools found, return [].
Skip tools that don't seem like real AI products.

Content:
${markdown.slice(0, 15000)}`;

  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${aiApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
    }),
  });

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content || '[]';
  
  try {
    // Extract JSON from possible markdown code blocks
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const tools = JSON.parse(jsonMatch[0]);
      return tools.filter((t: any) => 
        t.name && t.description && t.websiteUrl && 
        VALID_CATEGORIES.includes(t.category)
      );
    }
  } catch (e) {
    console.error('Failed to parse AI response:', e);
  }
  return [];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const firecrawlKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!firecrawlKey) {
      return new Response(JSON.stringify({ error: 'FIRECRAWL_API_KEY not configured' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      return new Response(JSON.stringify({ error: 'LOVABLE_API_KEY not configured' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let totalNew = 0;
    const errors: string[] = [];

    for (const source of SOURCES) {
      try {
        console.log(`Scraping ${source.name}: ${source.url}`);
        const markdown = await scrapeSource(source.url, firecrawlKey);
        
        if (!markdown) {
          errors.push(`${source.name}: No content scraped`);
          continue;
        }

        console.log(`Parsing tools from ${source.name} (${markdown.length} chars)`);
        const tools = await parseToolsWithAI(markdown, source.name, lovableApiKey);
        console.log(`Found ${tools.length} tools from ${source.name}`);

        if (tools.length > 0) {
          const rows = tools.map(t => ({
            name: t.name,
            description: t.description.slice(0, 200),
            category: t.category,
            pricing_type: t.pricingType || 'freemium',
            popularity_score: Math.min(90, Math.max(50, t.popularityScore || 60)),
            trending: t.trending || false,
            is_new: true,
            website_url: t.websiteUrl,
            source: source.name,
          }));

          const { error } = await supabase
            .from('ai_tools')
            .upsert(rows, { onConflict: 'name,website_url', ignoreDuplicates: true });

          if (error) {
            errors.push(`${source.name}: DB insert error: ${error.message}`);
          } else {
            totalNew += tools.length;
          }
        }
      } catch (e) {
        errors.push(`${source.name}: ${String(e)}`);
      }
    }

    console.log(`Scrape complete: ${totalNew} new tools, ${errors.length} errors`);

    return new Response(JSON.stringify({ 
      success: true, 
      newTools: totalNew, 
      errors: errors.length > 0 ? errors : undefined,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Scraper error:', error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
