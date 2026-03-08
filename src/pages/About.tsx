import { Navbar } from "@/components/Navbar";
import { User, Globe, Heart, Zap, Mail, Github } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        {/* Owner Section */}
        <div className="glass rounded-2xl p-8 md:p-12 mb-12 border border-border/50 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">Saiful Islam</h1>
          <p className="text-primary font-medium text-lg mb-4">Founder & Creator</p>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
            Passionate about making AI accessible to everyone. I built this directory to help people discover the best AI tools
            across every category — from free tools to premium solutions. My mission is to create the most comprehensive
            AI tools directory on the internet.
          </p>
        </div>

        {/* Mission */}
        <div className="space-y-8">
          <div className="glass rounded-xl p-6 border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-display font-bold text-foreground">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To build an ocean of AI — the largest, most up-to-date directory of AI tools in the world. We add new tools
              every day and never remove any. Whether you're looking for free AI tools, freemium options, or premium solutions,
              we've got you covered.
            </p>
          </div>

          <div className="glass rounded-xl p-6 border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-display font-bold text-foreground">Why This Directory?</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              The AI landscape is growing exponentially. New tools launch every single day, making it hard to keep track.
              This directory is designed by Saiful Islam to be your one-stop destination — organized by category, pricing,
              and popularity — so you can find the perfect AI tool in seconds.
            </p>
          </div>

          <div className="glass rounded-xl p-6 border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-display font-bold text-foreground">Always Growing</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We're committed to keeping this directory the most comprehensive resource available. Tools are added daily,
              categories are expanded, and no tool is ever removed. Our goal is to be an unlimited ocean of AI tools.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Built with ❤️ by <span className="text-primary font-semibold">Saiful Islam</span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Have a tool to suggest? <a href="/submit" className="text-primary hover:underline">Submit it here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
