import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Hero />
        <Features />
      </div>
    </div>
  );
};

export default Index;