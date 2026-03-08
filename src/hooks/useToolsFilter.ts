import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { aiTools as staticTools } from "@/data/tools";
import { categories as staticCategories } from "@/data/categories";
import { AITool } from "@/types/ai-tools";

async function fetchTools(): Promise<AITool[]> {
  const { data, error } = await supabase
    .from('ai_tools')
    .select('*')
    .order('popularity_score', { ascending: false });

  if (error || !data || data.length === 0) {
    console.log('Falling back to static tools');
    return staticTools;
  }

  return data.map((t: any) => ({
    id: t.id,
    name: t.name,
    description: t.description,
    category: t.category,
    pricingType: t.pricing_type as AITool['pricingType'],
    popularityScore: t.popularity_score,
    trending: t.trending,
    isNew: t.is_new,
    websiteUrl: t.website_url,
    logoUrl: t.logo_url,
  }));
}

async function fetchCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*');

  if (error || !data || data.length === 0) {
    return staticCategories;
  }

  return data.map((c: any) => ({
    id: c.id,
    name: c.name,
    icon: c.icon,
    toolCount: 0,
    description: c.description,
  }));
}

export function useToolsFilter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"popularity" | "newest" | "name">("popularity");
  const [pricingFilter, setPricingFilter] = useState<string | null>(null);

  const { data: allTools = staticTools } = useQuery({
    queryKey: ['ai-tools'],
    queryFn: fetchTools,
    staleTime: 5 * 60 * 1000, // 5 min
  });

  const { data: dbCategories = staticCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  });

  const categoriesWithCount = useMemo(() => {
    return dbCategories.map(cat => ({
      ...cat,
      toolCount: allTools.filter(t => t.category === cat.id).length,
    }));
  }, [dbCategories, allTools]);

  const filteredTools = useMemo(() => {
    let tools = [...allTools];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      tools = tools.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      tools = tools.filter(t => t.category === selectedCategory);
    }

    if (pricingFilter) {
      tools = tools.filter(t => t.pricingType === pricingFilter);
    }

    switch (sortBy) {
      case "popularity":
        tools.sort((a, b) => b.popularityScore - a.popularityScore);
        break;
      case "newest":
        tools.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "name":
        tools.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return tools;
  }, [allTools, searchQuery, selectedCategory, sortBy, pricingFilter]);

  const trendingTools = useMemo(() =>
    allTools.filter(t => t.trending).sort((a, b) => b.popularityScore - a.popularityScore),
  [allTools]);

  const newTools = useMemo(() =>
    allTools.filter(t => t.isNew).sort((a, b) => b.popularityScore - a.popularityScore),
  [allTools]);

  const topTools = useMemo(() =>
    [...allTools].sort((a, b) => b.popularityScore - a.popularityScore).slice(0, 50),
  [allTools]);

  return {
    searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory,
    sortBy, setSortBy,
    pricingFilter, setPricingFilter,
    filteredTools, trendingTools, newTools, topTools,
    categoriesWithCount, totalTools: allTools.length,
  };
}
