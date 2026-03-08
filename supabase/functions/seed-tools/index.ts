import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { tools } = await req.json();

    if (!tools || !Array.isArray(tools)) {
      return new Response(JSON.stringify({ error: 'tools array required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Batch insert in chunks of 50
    const chunkSize = 50;
    let inserted = 0;
    let skipped = 0;

    for (let i = 0; i < tools.length; i += chunkSize) {
      const chunk = tools.slice(i, i + chunkSize).map((t: any) => ({
        name: t.name,
        description: t.description,
        category: t.category,
        pricing_type: t.pricingType,
        popularity_score: t.popularityScore,
        trending: t.trending,
        is_new: t.isNew,
        website_url: t.websiteUrl,
        logo_url: t.logoUrl || null,
        source: 'seed',
      }));

      const { data, error } = await supabase
        .from('ai_tools')
        .upsert(chunk, { onConflict: 'name,website_url', ignoreDuplicates: true });

      if (error) {
        console.error(`Chunk ${i} error:`, error);
        skipped += chunk.length;
      } else {
        inserted += chunk.length;
      }
    }

    return new Response(JSON.stringify({ success: true, inserted, skipped }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Seed error:', error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
