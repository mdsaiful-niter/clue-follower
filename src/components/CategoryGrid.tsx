import { Category } from "@/types/ai-tools";
import { motion } from "framer-motion";

interface CategoryGridProps {
  categories: (Category & { toolCount: number })[];
  selectedCategory: string | null;
  onSelect: (id: string | null) => void;
}

export function CategoryGrid({ categories, selectedCategory, onSelect }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onSelect(null)}
        className={`rounded-lg border p-3 text-center transition-all duration-200 ${
          !selectedCategory
            ? "border-primary bg-primary/10 text-primary glow-primary"
            : "border-border/50 bg-secondary/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
        }`}
      >
        <span className="text-lg">🔥</span>
        <p className="mt-1 text-xs font-display font-medium">All Tools</p>
      </motion.button>
      {categories.map((cat) => (
        <motion.button
          key={cat.id}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(cat.id === selectedCategory ? null : cat.id)}
          className={`rounded-lg border p-3 text-center transition-all duration-200 ${
            selectedCategory === cat.id
              ? "border-primary bg-primary/10 text-primary glow-primary"
              : "border-border/50 bg-secondary/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
          }`}
        >
          <span className="text-lg">{cat.icon}</span>
          <p className="mt-1 text-xs font-display font-medium truncate">{cat.name}</p>
          <p className="text-[10px] text-muted-foreground">{cat.toolCount} tools</p>
        </motion.button>
      ))}
    </div>
  );
}
