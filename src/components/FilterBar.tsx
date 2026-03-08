import { Button } from "@/components/ui/button";

interface FilterBarProps {
  sortBy: "popularity" | "newest" | "name";
  onSortChange: (sort: "popularity" | "newest" | "name") => void;
  pricingFilter: string | null;
  onPricingChange: (pricing: string | null) => void;
  resultCount: number;
}

export function FilterBar({ sortBy, onSortChange, pricingFilter, onPricingChange, resultCount }: FilterBarProps) {
  const sortOptions: { value: "popularity" | "newest" | "name"; label: string }[] = [
    { value: "popularity", label: "Popular" },
    { value: "newest", label: "Newest" },
    { value: "name", label: "A-Z" },
  ];

  const pricingOptions = [
    { value: null, label: "All" },
    { value: "free", label: "Free" },
    { value: "freemium", label: "Freemium" },
    { value: "free_trial", label: "Trial" },
    { value: "paid", label: "Paid" },
  ];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <p className="text-xs sm:text-sm text-muted-foreground">
        Showing <span className="text-foreground font-medium">{resultCount}</span> tools
      </p>
      <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
        <span className="text-[10px] sm:text-xs text-muted-foreground mr-0.5 sm:mr-1">Sort:</span>
        {sortOptions.map(opt => (
          <Button
            key={opt.value}
            size="sm"
            variant={sortBy === opt.value ? "default" : "ghost"}
            className={`h-7 sm:h-8 px-2 sm:px-3 text-xs ${sortBy === opt.value ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            onClick={() => onSortChange(opt.value)}
          >
            {opt.label}
          </Button>
        ))}
        <div className="w-px h-4 sm:h-5 bg-border mx-0.5 sm:mx-1" />
        <span className="text-[10px] sm:text-xs text-muted-foreground mr-0.5 sm:mr-1">Price:</span>
        {pricingOptions.map(opt => (
          <Button
            key={opt.value ?? "all"}
            size="sm"
            variant={pricingFilter === opt.value ? "default" : "ghost"}
            className={`h-7 sm:h-8 px-2 sm:px-3 text-xs ${pricingFilter === opt.value ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            onClick={() => onPricingChange(opt.value)}
          >
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
