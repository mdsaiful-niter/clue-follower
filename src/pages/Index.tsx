import { useState, useRef, useCallback } from "react";
import { HeroSection } from "@/components/HeroSection";
import { SearchBar } from "@/components/SearchBar";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FilterBar } from "@/components/FilterBar";
import { ToolCard } from "@/components/ToolCard";
import { useToolsFilter } from "@/hooks/useToolsFilter";
import { Button } from "@/components/ui/button";
import { SeedButton } from "@/components/SeedButton";

const Index = () => {
  const {
    searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory,
    sortBy, setSortBy,
    pricingFilter, setPricingFilter,
    filteredTools, trendingTools, newTools, topTools,
    categoriesWithCount, totalTools,
  } = useToolsFilter();

  const [showAllTrending, setShowAllTrending] = useState(false);
  const [showAllTop, setShowAllTop] = useState(false);
  const [showAllNew, setShowAllNew] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  const handleCategorySelect = useCallback((id: string | null) => {
    setSelectedCategory(id);
    if (id && toolsRef.current) {
      setTimeout(() => {
        toolsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [setSelectedCategory]);

  const isFiltering = searchQuery || selectedCategory || pricingFilter;

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <div className="container mx-auto px-3 sm:px-4 space-y-8 sm:space-y-12 pb-16 sm:pb-20">
        <SearchBar value={searchQuery} onChange={setSearchQuery} totalTools={totalTools} />

        <section>
          <h2 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-foreground mb-4 sm:mb-6">Browse Categories</h2>
          <CategoryGrid
            categories={categoriesWithCount}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </section>

        {isFiltering ? (
          <section>
            <FilterBar
              sortBy={sortBy}
              onSortChange={setSortBy}
              pricingFilter={pricingFilter}
              onPricingChange={setPricingFilter}
              resultCount={filteredTools.length}
            />
            <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filteredTools.map((tool, i) => (
                <ToolCard key={tool.id} tool={tool} index={i} />
              ))}
            </div>
            {filteredTools.length === 0 && (
              <p className="text-center text-muted-foreground py-8 sm:py-12 text-sm sm:text-base">No tools found. Try adjusting your filters.</p>
            )}
          </section>
        ) : (
          <>
            <section>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-foreground">🔥 Trending AI Tools</h2>
                <Button variant="ghost" size="sm" className="text-primary text-xs sm:text-sm" onClick={() => setShowAllTrending(!showAllTrending)}>
                  {showAllTrending ? "Show Less" : `View All (${trendingTools.length})`}
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {(showAllTrending ? trendingTools : trendingTools.slice(0, 8)).map((tool, i) => (
                  <ToolCard key={tool.id} tool={tool} index={i} />
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-foreground">⭐ Best AI Tools</h2>
                <Button variant="ghost" size="sm" className="text-primary text-xs sm:text-sm" onClick={() => setShowAllTop(!showAllTop)}>
                  {showAllTop ? "Show Less" : `View All (${topTools.length})`}
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {(showAllTop ? topTools : topTools.slice(0, 8)).map((tool, i) => (
                  <ToolCard key={tool.id} tool={tool} index={i} />
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-foreground">✨ New AI Tools</h2>
                <Button variant="ghost" size="sm" className="text-primary text-xs sm:text-sm" onClick={() => setShowAllNew(!showAllNew)}>
                  {showAllNew ? "Show Less" : `View All (${newTools.length})`}
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {(showAllNew ? newTools : newTools.slice(0, 8)).map((tool, i) => (
                  <ToolCard key={tool.id} tool={tool} index={i} />
                ))}
              </div>
            </section>

            {/* ALL TOOLS */}
            <section>
              <h2 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-foreground mb-4 sm:mb-6">🌊 All AI Tools ({totalTools})</h2>
              <FilterBar
                sortBy={sortBy}
                onSortChange={setSortBy}
                pricingFilter={pricingFilter}
                onPricingChange={setPricingFilter}
                resultCount={filteredTools.length}
              />
              <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {filteredTools.map((tool, i) => (
                  <ToolCard key={tool.id} tool={tool} index={i} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 sm:py-8">
        <div className="container mx-auto px-4 text-center text-xs sm:text-sm text-muted-foreground">
          <p>Doraemon's Poket — Discover {totalTools}+ AI Tools across {categoriesWithCount.length} categories</p>
          <p className="mt-2 text-[10px] sm:text-xs">Updated daily with new AI tools. No tool is ever removed.</p>
          <p className="mt-2 text-[10px] sm:text-xs">Created by <a href="/about" className="text-primary hover:underline font-medium">Saiful Islam</a></p>
          <div className="mt-4">
            <SeedButton />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
