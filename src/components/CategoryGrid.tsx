import { Category } from "@/types/ai-tools";
import { motion } from "framer-motion";

interface CategoryGridProps {
  categories: (Category & { toolCount: number })[];
  selectedCategory: string | null;
  onSelect: (id: string | null) => void;
}

export function CategoryGrid({ categories, selectedCategory, onSelect }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onSelect(null)}
        className={`rounded-lg border p-2 sm:p-3 text-center transition-all duration-200 ${
          !selectedCategory
            ? "border-primary bg-primary/10 text-primary glow-primary"
            : "border-border/50 bg-secondary/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
        }`}
      >
        <span className="text-base sm:text-lg">🔥</span>
        <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs font-display font-medium">All Tools</p>
      </motion.button>
      {categories.map((cat) => (
        <motion.button
          key={cat.id}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(cat.id === selectedCategory ? null : cat.id)}
          className={`rounded-lg border p-2 sm:p-3 text-center transition-all duration-200 ${
            selectedCategory === cat.id
              ? "border-primary bg-primary/10 text-primary glow-primary"
              : "border-border/50 bg-secondary/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
          }`}
        >
          <span className="text-base sm:text-lg">{cat.icon}</span>
          <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs font-display font-medium truncate">{cat.name}</p>
          <p className="text-[9px] sm:text-[10px] text-muted-foreground">{cat.toolCount}</p>
        </motion.button>
      ))}
    </div>
  );
}
