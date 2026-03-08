import { AITool } from "@/types/ai-tools";
import { Badge } from "@/components/ui/badge";

import { ExternalLink, TrendingUp, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface ToolCardProps {
  tool: AITool;
  index?: number;
}

const pricingColors: Record<string, string> = {
  free: "bg-success/20 text-success border-success/30",
  freemium: "bg-primary/20 text-primary border-primary/30",
  free_trial: "bg-accent/20 text-accent border-accent/30",
  paid: "bg-warning/20 text-warning border-warning/30",
};

const pricingLabels: Record<string, string> = {
  free: "Free",
  freemium: "Freemium",
  free_trial: "Free Trial",
  paid: "Paid",
};

export function ToolCard({ tool, index = 0 }: ToolCardProps) {
  const initials = tool.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <motion.a
      href={tool.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.5), duration: 0.4 }}
      className="group relative card-gradient rounded-lg border border-border/50 p-5 hover:border-primary/40 transition-all duration-300 hover:glow-primary cursor-pointer block"
    >
      {tool.trending && (
        <div className="absolute -top-2 -right-2 flex items-center gap-1 rounded-full bg-accent/20 border border-accent/30 px-2 py-0.5 text-xs text-accent">
          <TrendingUp className="h-3 w-3" /> Trending
        </div>
      )}
      {tool.isNew && !tool.trending && (
        <div className="absolute -top-2 -right-2 flex items-center gap-1 rounded-full bg-success/20 border border-success/30 px-2 py-0.5 text-xs text-success">
          <Sparkles className="h-3 w-3" /> New
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary overflow-hidden">
          <img
            src={`https://www.google.com/s2/favicons?domain=${new URL(tool.websiteUrl).hostname}&sz=64`}
            alt={`${tool.name} logo`}
            className="h-8 w-8 object-contain"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              target.parentElement!.innerHTML = `<span class="text-sm font-bold text-primary font-display">${tool.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}</span>`;
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-foreground truncate">{tool.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={pricingColors[tool.pricingType]}>
            {pricingLabels[tool.pricingType] || tool.pricingType}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <div className="h-1.5 w-16 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${tool.popularityScore}%` }}
              />
            </div>
            <span>{tool.popularityScore}</span>
          </div>
        </div>
        
      </div>
    </motion.a>
  );
}
