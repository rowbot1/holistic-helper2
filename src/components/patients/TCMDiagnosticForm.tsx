import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InspectionForm } from "./diagnostic-methods/InspectionForm";
import { AuscultationForm } from "./diagnostic-methods/AuscultationForm";
import { InquiryForm } from "./diagnostic-methods/InquiryForm";
import { PalpationForm } from "./diagnostic-methods/PalpationForm";
import { TCMDiagnosticFormData } from "./types/tcm";

export function TCMDiagnosticForm() {
  const form = useForm<TCMDiagnosticFormData>();

  return (
    <Card className="p-6">
      <Form {...form}>
        <form className="space-y-6">
          <Tabs defaultValue="inspection" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="inspection">Inspection</TabsTrigger>
              <TabsTrigger value="auscultation">Auscultation</TabsTrigger>
              <TabsTrigger value="inquiry">Inquiry</TabsTrigger>
              <TabsTrigger value="palpation">Palpation</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <TabsContent value="inspection">
                <InspectionForm form={form} />
              </TabsContent>

              <TabsContent value="auscultation">
                <AuscultationForm form={form} />
              </TabsContent>

              <TabsContent value="inquiry">
                <InquiryForm form={form} />
              </TabsContent>

              <TabsContent value="palpation">
                <PalpationForm form={form} />
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </form>
      </Form>
    </Card>
  );
}