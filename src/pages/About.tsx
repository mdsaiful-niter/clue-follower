import { Navbar } from "@/components/Navbar";
import founderImage from "@/assets/founder.jpg";
import { User, Globe, Heart, Zap, GraduationCap, BookOpen, Keyboard, Calculator, TrendingUp, Target, Wrench, Lightbulb } from "lucide-react";

const projects = [
  { icon: BookOpen, name: "IPE B Notebook", desc: "A digital academic notebook where all semester notes are organized and stored in one place to help students easily access study materials." },
  { icon: Keyboard, name: "Typing Master Application", desc: "A typing practice tool designed to help users improve typing speed and accuracy through regular exercises." },
  { icon: Calculator, name: "Accounting Calculation App", desc: "An application where users can input accounting entries and automatically generate financial statements such as Income Statement and Balance Sheet." },
  { icon: TrendingUp, name: "Engineering Economy Calculator", desc: "A calculator that allows users to solve engineering economy problems including Present Worth (PW), Future Worth (FW), Annual Worth (AW), and other engineering economic analysis." },
];

const skills = ["Problem Solving", "Engineering Economy Analysis", "Accounting Calculations", "Educational Tool Development", "Productivity Tool Development"];

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
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">Md Saiful Islam</h1>
          <p className="text-primary font-medium text-lg mb-1">Founder & Creator</p>
          <p className="text-muted-foreground text-sm mb-4">Engineering Student · Tool Developer</p>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
            Md Saiful Islam is a third-year undergraduate student studying B.Sc. in Industrial and Production Engineering
            at the National Institute of Textile Engineering and Research (NITER), Bangladesh. He is interested in solving
            real-world problems by developing practical tools and applications for students and engineers.
          </p>
        </div>

        {/* Education */}
        <div className="glass rounded-xl p-6 border border-border/50 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-display font-bold text-foreground">Education</h2>
          </div>
          <div className="ml-13 space-y-1">
            <p className="text-foreground font-semibold">B.Sc. in Industrial and Production Engineering</p>
            <p className="text-muted-foreground">National Institute of Textile Engineering and Research (NITER)</p>
            <p className="text-primary text-sm font-medium">Current Status: Third Year Student</p>
          </div>
        </div>

        {/* Projects */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-display font-bold text-foreground">Projects</h2>
          </div>
          <div className="grid gap-4">
            {projects.map((project) => (
              <div key={project.name} className="glass rounded-xl p-5 border border-border/50">
                <div className="flex items-center gap-3 mb-2">
                  <project.icon className="h-5 w-5 text-primary shrink-0" />
                  <h3 className="font-display font-bold text-foreground">{project.name}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed ml-8">{project.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="glass rounded-xl p-6 border border-border/50 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Wrench className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-display font-bold text-foreground">Skills</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Mission & Goal */}
        <div className="space-y-8">
          <div className="glass rounded-xl p-6 border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-display font-bold text-foreground">Goal</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To develop practical digital tools that simplify engineering calculations, academic learning, and
              decision-making processes — making technology accessible and useful for students and engineers everywhere.
            </p>
          </div>

          <div className="glass rounded-xl p-6 border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-display font-bold text-foreground">About This Directory</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              This AI tools directory is built to be the most comprehensive resource available. Tools are added daily,
              categories are expanded, and no tool is ever removed. Whether you're looking for free AI tools, freemium
              options, or premium solutions, we've got you covered.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Built with ❤️ by <span className="text-primary font-semibold">Md Saiful Islam</span>
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
