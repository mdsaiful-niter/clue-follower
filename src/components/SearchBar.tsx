import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  totalTools: number;
}

export function SearchBar({ value, onChange, totalTools }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder={`Search ${totalTools}+ AI tools by name, category, or use case...`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-14 pl-12 pr-4 text-base rounded-xl bg-secondary border-border/50 focus:border-primary focus:glow-primary placeholder:text-muted-foreground/60"
      />
    </div>
  );
}
