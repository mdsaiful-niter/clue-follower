import { useMemo, useState } from "react";
import { aiTools } from "@/data/tools";
import { categories } from "@/data/categories";
import { AITool } from "@/types/ai-tools";

export function useToolsFilter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"popularity" | "newest" | "name">("popularity");
  const [pricingFilter, setPricingFilter] = useState<string | null>(null);

  const categoriesWithCount = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      toolCount: aiTools.filter(t => t.category === cat.id).length,
    }));
  }, []);

  const filteredTools = useMemo(() => {
    let tools = [...aiTools];

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
  }, [searchQuery, selectedCategory, sortBy, pricingFilter]);

  const trendingTools = useMemo(() =>
    aiTools.filter(t => t.trending).sort((a, b) => b.popularityScore - a.popularityScore),
  []);

  const newTools = useMemo(() =>
    aiTools.filter(t => t.isNew).sort((a, b) => b.popularityScore - a.popularityScore),
  []);

  const topTools = useMemo(() =>
    [...aiTools].sort((a, b) => b.popularityScore - a.popularityScore).slice(0, 20),
  []);

  return {
    searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory,
    sortBy, setSortBy,
    pricingFilter, setPricingFilter,
    filteredTools, trendingTools, newTools, topTools,
    categoriesWithCount, totalTools: aiTools.length,
  };
}
