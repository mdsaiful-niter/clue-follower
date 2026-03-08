import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Cpu, Plus, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Cpu className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <span className="font-display font-bold text-base sm:text-lg text-foreground">Doraemon's Poket</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-3">
          <Link to="/categories">
            <Button variant="ghost" size="sm" className={location.pathname === "/categories" ? "text-primary" : "text-muted-foreground"}>
              Categories
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="ghost" size="sm" className={location.pathname === "/about" ? "text-primary" : "text-muted-foreground"}>
              About
            </Button>
          </Link>
          <Link to="/submit">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-1" /> Submit Tool
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="sm:hidden p-2 text-muted-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-border/50 bg-card/95 backdrop-blur-xl px-4 py-3 space-y-2">
          <Link to="/categories" onClick={() => setMobileOpen(false)}>
            <Button variant="ghost" size="sm" className={`w-full justify-start ${location.pathname === "/categories" ? "text-primary" : "text-muted-foreground"}`}>
              Categories
            </Button>
          </Link>
          <Link to="/about" onClick={() => setMobileOpen(false)}>
            <Button variant="ghost" size="sm" className={`w-full justify-start ${location.pathname === "/about" ? "text-primary" : "text-muted-foreground"}`}>
              About
            </Button>
          </Link>
          <Link to="/submit" onClick={() => setMobileOpen(false)}>
            <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-1" /> Submit Tool
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
