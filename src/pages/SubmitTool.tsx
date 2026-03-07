import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/data/categories";
import { toast } from "sonner";
import { Send } from "lucide-react";

const SubmitToolPage = () => {
  const [form, setForm] = useState({
    name: "", description: "", category: "", websiteUrl: "", pricing: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.category || !form.websiteUrl) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Tool submitted for review! Thank you.");
    setForm({ name: "", description: "", category: "", websiteUrl: "", pricing: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <h1 className="text-4xl font-display font-bold text-foreground mb-2">Submit an AI Tool</h1>
        <p className="text-muted-foreground mb-10">Know an AI tool we're missing? Submit it for review.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Tool Name *</label>
            <Input
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="e.g., ChatGPT"
              className="bg-secondary border-border/50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Description *</label>
            <Textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Brief description of what the tool does"
              className="bg-secondary border-border/50"
              rows={3}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Category *</label>
            <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
              <SelectTrigger className="bg-secondary border-border/50">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.icon} {c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Website URL *</label>
            <Input
              value={form.websiteUrl}
              onChange={e => setForm(f => ({ ...f, websiteUrl: e.target.value }))}
              placeholder="https://example.com"
              className="bg-secondary border-border/50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Pricing</label>
            <Select value={form.pricing} onValueChange={v => setForm(f => ({ ...f, pricing: v }))}>
              <SelectTrigger className="bg-secondary border-border/50">
                <SelectValue placeholder="Select pricing type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="freemium">Freemium</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Send className="h-4 w-4 mr-2" /> Submit Tool
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SubmitToolPage;
