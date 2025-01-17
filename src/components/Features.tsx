import { Activity, Brain, FileText } from "lucide-react";

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
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-tcm-accent">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </div>
    </div>
  );
};

export default Features;