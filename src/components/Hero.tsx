import { Card } from "@/components/ui/card";

const Hero = () => {
  return (
    <div className="bg-tcm-light py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-tcm-accent mb-6">
              Revolutionizing Traditional Chinese Medicine
            </h1>
            <p className="text-lg md:text-xl text-tcm-secondary mb-8">
              Combining ancient wisdom with modern technology for precise diagnostics and treatment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-tcm-primary mb-4">AI-Powered Diagnostics</h3>
              <p className="text-tcm-secondary">
                Our advanced algorithms analyze patient data to provide accurate TCM diagnoses
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold text-tcm-primary mb-4">Comprehensive Treatment Plans</h3>
              <p className="text-tcm-secondary">
                Get personalized acupuncture, herbal, and lifestyle recommendations
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold text-tcm-primary mb-4">Secure Patient Management</h3>
              <p className="text-tcm-secondary">
                HIPAA-compliant platform for storing and managing patient records
              </p>
            </Card>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-tcm-primary mb-6 text-center">
              Trusted by Practitioners Worldwide
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <blockquote className="text-tcm-secondary italic mb-4">
                  "AcuAssist has transformed my practice. The diagnostic accuracy and treatment recommendations are unparalleled."
                </blockquote>
                <p className="font-bold text-tcm-accent">- Dr. Li Wei, Beijing</p>
              </div>
              <div>
                <blockquote className="text-tcm-secondary italic mb-4">
                  "The platform is intuitive and has significantly reduced my diagnostic time while improving patient outcomes."
                </blockquote>
                <p className="font-bold text-tcm-accent">- Dr. Maria Gonzalez, Madrid</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
