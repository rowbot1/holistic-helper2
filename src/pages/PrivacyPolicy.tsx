import { Card } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <Card className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-tcm-primary mb-8">
              Privacy Policy
            </h1>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-tcm-secondary mb-4">
                Data Collection and Usage
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                  We collect and process personal data only as necessary to provide our services and improve user experience. This includes:
                </p>
                <ul className="list-disc pl-6">
                  <li>User account information</li>
                  <li>Patient health data entered by practitioners</li>
                  <li>Usage analytics and diagnostic reports</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-tcm-secondary mb-4">
                Data Protection
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                  We implement industry-standard security measures to protect your data:
                </p>
                <ul className="list-disc pl-6">
                  <li>End-to-end encryption for all data transmissions</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Role-based access controls</li>
                  <li>Data anonymization where applicable</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-tcm-secondary mb-4">
                Compliance
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                  Our platform complies with major data protection regulations:
                </p>
                <ul className="list-disc pl-6">
                  <li>GDPR (General Data Protection Regulation)</li>
                  <li>HIPAA (Health Insurance Portability and Accountability Act)</li>
                  <li>PIPEDA (Personal Information Protection and Electronic Documents Act)</li>
                </ul>
                <p>
                  For more information about your rights under these regulations, please contact our Data Protection Officer at dpo@acuassist.com.
                </p>
              </div>
            </section>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
