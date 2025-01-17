import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

const Index = () => {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <div className="my-8 text-center">
        <Link to="/patients">
          <Button variant="default" size="lg">
            Manage Patients
          </Button>
        </Link>
      </div>
      <Features />
    </div>
  );
};

export default Index;