import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TCMKnowledgeBase from "@/components/TCMKnowledgeBase";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
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
      </div>
    </div>
  );
};

export default Index;