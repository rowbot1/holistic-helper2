import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="p-8">
        <h1 className="text-4xl font-bold text-tcm-primary mb-8">
          About AcuAssist: Your AI-Powered TCM Partner
        </h1>
        
        <p className="text-lg mb-8">
          At AcuAssist, we combine the ancient wisdom of Traditional Chinese Medicine (TCM) with the cutting-edge capabilities of artificial intelligence to empower practitioners and enhance patient care.
        </p>

        <Separator className="my-8" />

        <h2 className="text-3xl font-bold text-tcm-secondary mb-6">Our Mission</h2>
        <p className="text-lg mb-8">
          We aim to bridge the gap between tradition and technology by providing TCM practitioners with an intuitive platform that simplifies diagnostic processes, supports accurate treatment planning, and enhances patient outcomes.
        </p>

        <Separator className="my-8" />

        <h2 className="text-3xl font-bold text-tcm-secondary mb-6">Why AcuAssist?</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-tcm-accent">Streamlined Patient Management</h3>
            <p className="text-lg">
              Organise, store, and access patient information effortlessly with our secure and user-friendly platform. From patient intake to follow-ups, every detail is at your fingertips.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-tcm-accent">AI-Driven Diagnostic Insights</h3>
            <p className="text-lg">
              Harness the power of AI to analyse patient data and generate comprehensive TCM diagnostic reports. Our system leverages advanced algorithms and integrated knowledge bases to provide actionable insights while respecting the core principles of TCM.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-tcm-accent">Customised Treatment Planning</h3>
            <p className="text-lg">
              Receive tailored recommendations for acupuncture points, herbal formulas, and lifestyle adjustments based on patient-specific conditions and TCM methodologies.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-tcm-accent">Seamless Data Integration</h3>
            <p className="text-lg">
              Our platform integrates with tools like Weaviate for knowledge retrieval and cloud storage solutions, ensuring your data is always accessible and secure.
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <h2 className="text-3xl font-bold text-tcm-secondary mb-6">Who Is AcuAssist For?</h2>
        <p className="text-lg mb-8">
          Whether you are an experienced TCM practitioner or just starting your journey, AcuAssist is designed to support your workflow, reduce administrative burdens, and let you focus on what truly matters: providing holistic care for your patients.
        </p>

        <Separator className="my-8" />

        <h2 className="text-3xl font-bold text-tcm-secondary mb-6">Our Core Values</h2>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-tcm-accent">Innovation</h3>
            <p className="text-lg">
              Embracing the latest technologies to respect and uphold centuries-old practices.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-tcm-accent">Simplicity</h3>
            <p className="text-lg">
              Delivering an intuitive, user-friendly experience.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-tcm-accent">Security</h3>
            <p className="text-lg">
              Ensuring your patient data is protected with industry-standard protocols.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-tcm-accent">Empowerment</h3>
            <p className="text-lg">
              Supporting practitioners in making informed decisions that align with TCM principles.
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center">
          <h2 className="text-3xl font-bold text-tcm-primary mb-6">Get Started Today</h2>
          <p className="text-lg mb-8">
            Explore the future of TCM diagnostics with AcuAssist. Join us in redefining how technology can complement tradition and elevate the practice of holistic healing.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default About;
