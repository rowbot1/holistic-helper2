import { Card } from "@/components/ui/card";

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <Card className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-tcm-primary mb-8">
              How It Works
            </h1>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-tcm-secondary mb-4">
                Getting Started
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    1. Adding a New Patient
                  </h3>
                  <p className="text-lg">
                    Navigate to the Patients page and click "Add New Patient".
                    Fill in the required details and save to create a new patient record.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    2. Generating a TCM Report
                  </h3>
                  <p className="text-lg">
                    Select a patient from your list, click "New Report", and follow
                    the guided process to generate a comprehensive TCM diagnostic report.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-tcm-secondary mb-4">
                Visual Guides
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="aspect-video bg-gray-200 rounded"></div>
                  <p className="mt-2 text-center text-gray-600">Adding a Patient</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="aspect-video bg-gray-200 rounded"></div>
                  <p className="mt-2 text-center text-gray-600">Generating Reports</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-tcm-secondary mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    How do I reset my password?
                  </h3>
                  <p className="text-lg">
                    Click "Forgot Password" on the login page and follow the instructions.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    Can I export my patient data?
                  </h3>
                  <p className="text-lg">
                    Yes, you can export patient records as PDF or CSV files from the Patients page.
                  </p>
                </div>
              </div>
            </section>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
