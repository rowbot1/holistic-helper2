import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TCMKnowledgeBase from "@/components/TCMKnowledgeBase";

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
      <TCMKnowledgeBase />
    </div>
  );
};

export default Index;