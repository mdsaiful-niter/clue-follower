import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-primary/5 blur-[80px] sm:blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-accent/5 blur-[80px] sm:blur-[100px]" />
      </div>

      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 sm:px-4 py-1 sm:py-1.5 mb-4 sm:mb-6">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            <span className="text-xs sm:text-sm text-primary font-medium">Doraemon's Pocket — 500+ AI Tools</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold tracking-tight leading-tight">
            Discover The Best{" "}
            <span className="text-gradient">Free AI Tools</span>
          </h1>
          <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-muted-foreground px-2">
            The largest directory of AI tools. Search, compare, and find the perfect AI tool for any task — from image generation to coding, writing, and beyond.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
