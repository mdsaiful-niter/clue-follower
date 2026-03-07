import { Link, useLocation } from "react-router-dom";
import { Cpu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Cpu className="h-5 w-5" />
          </div>
          <span className="font-display font-bold text-lg text-foreground">AI Directory</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/categories">
            <Button variant="ghost" size="sm" className={location.pathname === "/categories" ? "text-primary" : "text-muted-foreground"}>
              Categories
            </Button>
          </Link>
          <Link to="/submit">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-1" /> Submit Tool
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
