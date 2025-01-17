import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-tcm-accent">TCM</span>
          <span className="text-tcm-secondary">Diagnostic</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Features</Button>
          <Button className="bg-tcm-primary text-white hover:bg-tcm-primary/90">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;