import { useNavigate } from "react-router-dom";
import { categories } from "@/data/categories";
import { aiTools } from "@/data/tools";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";

const CategoriesPage = () => {
  const navigate = useNavigate();

  const categoriesWithCount = categories.map(cat => ({
    ...cat,
    toolCount: aiTools.filter(t => t.category === cat.id).length,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-display font-bold text-foreground mb-2">All Categories</h1>
        <p className="text-muted-foreground mb-10">Browse AI tools by category</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoriesWithCount.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => navigate(`/?category=${cat.id}`)}
              className="flex items-center gap-4 rounded-lg border border-border/50 card-gradient p-5 text-left hover:border-primary/40 transition-all hover:glow-primary"
            >
              <span className="text-3xl">{cat.icon}</span>
              <div>
                <h3 className="font-display font-semibold text-foreground">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
                <p className="mt-1 text-xs text-primary">{cat.toolCount} tools</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
