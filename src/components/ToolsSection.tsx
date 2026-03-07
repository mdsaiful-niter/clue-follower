import { ToolCard } from "@/components/ToolCard";
import { AITool } from "@/types/ai-tools";

interface ToolsSectionProps {
  title: string;
  tools: AITool[];
  maxItems?: number;
}

export function ToolsSection({ title, tools, maxItems }: ToolsSectionProps) {
  const displayed = maxItems ? tools.slice(0, maxItems) : tools;

  if (displayed.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayed.map((tool, i) => (
          <ToolCard key={tool.id} tool={tool} index={i} />
        ))}
      </div>
    </section>
  );
}
