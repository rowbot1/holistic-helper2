import { Card } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <Card className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-tcm-primary mb-8">
              Terms of Service
            </h1>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-tcm-secondary mb-4">
                Acceptance of Terms
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                  By accessing or using the AcuAssist platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-tcm-secondary mb-4">
                User Responsibilities
              </h2>
              <div className="space-y-4 text-lg">
                <p>As a user of AcuAssist, you agree to:</p>
                <ul className="list-disc pl-6">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Use the platform only for lawful purposes</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-tcm-secondary mb-4">
                Intellectual Property
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                  All content and materials on the AcuAssist platform, including but not limited to text, graphics, logos, and software, are the property of AcuAssist or its licensors and are protected by intellectual property laws.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-tcm-secondary mb-4">
                Limitations of Liability
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                  AcuAssist shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc pl-6">
                  <li>Your access to or use of or inability to access or use the service</li>
                  <li>Any conduct or content of any third party on the service</li>
                  <li>Unauthorized access, use or alteration of your transmissions or content</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-tcm-secondary mb-4">
                Governing Law
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
                </p>
              </div>
            </section>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
