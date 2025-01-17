import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="bg-tcm-light py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-tcm-accent mb-6">
            Traditional Chinese Medicine Diagnostics
          </h1>
          <p className="text-lg md:text-xl text-tcm-secondary mb-8">
            Leverage modern technology to understand and apply traditional Chinese medicine principles
            for better health outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-tcm-primary text-white hover:bg-tcm-primary/90 px-8 py-6 text-lg">
              Start Diagnosis
            </Button>
            <Button variant="outline" className="px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;