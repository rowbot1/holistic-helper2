import { Activity, Brain, FileText, Users, Clock, CheckCircle } from "lucide-react";

const features = [
  {
    icon: <Brain className="w-12 h-12 text-tcm-primary" />,
    title: "AI-Powered Analysis",
    description: "Advanced algorithms analyze symptoms and patterns based on TCM principles.",
  },
  {
    icon: <Activity className="w-12 h-12 text-tcm-primary" />,
    title: "Comprehensive Assessment",
    description: "Holistic evaluation of physical and emotional health indicators.",
  },
  {
    icon: <FileText className="w-12 h-12 text-tcm-primary" />,
    title: "Detailed Reports",
    description: "Receive in-depth diagnostic reports with personalized recommendations.",
  },
];

const Features = () => {
  return (
    <div className="py-20 bg-tcm-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-tcm-accent">
          Why Choose AcuAssist?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border bg-white hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-tcm-secondary">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Users className="w-12 h-12 text-tcm-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-tcm-accent">500+</h3>
              <p className="text-tcm-secondary">Practitioners Worldwide</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-tcm-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-tcm-accent">60%</h3>
              <p className="text-tcm-secondary">Faster Diagnosis</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-tcm-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-tcm-accent">95%</h3>
              <p className="text-tcm-secondary">Accuracy Rate</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-tcm-accent mb-4">
            Ready to Transform Your Practice?
          </h3>
          <p className="text-tcm-secondary mb-6">
            Start your free trial today and experience the future of TCM diagnostics
          </p>
          <div className="text-tcm-secondary">
            <span className="text-4xl font-bold text-tcm-primary">$99</span>/month
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
