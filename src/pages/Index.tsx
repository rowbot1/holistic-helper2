import Hero from "@/components/Hero";
import Features from "@/components/Features";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <Hero />
        <Features />
      </div>
    </div>
  );
};

export default Index;
