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
    { value: "paid", label: "Paid" },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        Showing <span className="text-foreground font-medium">{resultCount}</span> tools
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground mr-1">Sort:</span>
        {sortOptions.map(opt => (
          <Button
            key={opt.value}
            size="sm"
            variant={sortBy === opt.value ? "default" : "ghost"}
            className={sortBy === opt.value ? "bg-primary text-primary-foreground" : "text-muted-foreground"}
            onClick={() => onSortChange(opt.value)}
          >
            {opt.label}
          </Button>
        ))}
        <div className="w-px h-5 bg-border mx-1" />
        <span className="text-xs text-muted-foreground mr-1">Price:</span>
        {pricingOptions.map(opt => (
          <Button
            key={opt.value ?? "all"}
            size="sm"
            variant={pricingFilter === opt.value ? "default" : "ghost"}
            className={pricingFilter === opt.value ? "bg-primary text-primary-foreground" : "text-muted-foreground"}
            onClick={() => onPricingChange(opt.value)}
          >
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
