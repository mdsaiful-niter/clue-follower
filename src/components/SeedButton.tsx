import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { aiTools } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SeedButton() {
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('seed-tools', {
        body: { tools: aiTools },
      });
      if (error) throw error;
      toast.success(`Seeded ${data?.inserted || 0} tools to database`);
    } catch (e: any) {
      toast.error(`Seed failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleScrape = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('scrape-ai-tools', {
        body: { trigger: 'manual' },
      });
      if (error) throw error;
      toast.success(`Scrape complete: ${data?.newTools || 0} new tools found`);
      if (data?.errors?.length) {
        toast.warning(`${data.errors.length} sources had errors`);
      }
    } catch (e: any) {
      toast.error(`Scrape failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button onClick={handleSeed} disabled={loading} size="sm" variant="outline">
        {loading ? "Working..." : "Seed DB"}
      </Button>
      <Button onClick={handleScrape} disabled={loading} size="sm" variant="outline">
        {loading ? "Working..." : "Scrape New Tools"}
      </Button>
    </div>
  );
}
