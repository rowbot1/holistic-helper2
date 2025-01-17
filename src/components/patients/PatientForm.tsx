import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Patient, NewPatient } from '@/types/patient';
import { TCMDiagnosticForm } from './TCMDiagnosticForm';
import { AdditionalTCMInfo } from './AdditionalTCMInfo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicInformationForm } from './form-sections/BasicInformationForm';
import { FormActionButtons } from './FormActionButtons';
import { useToast } from "@/hooks/use-toast";
import { tcmService } from '@/services/tcm';

interface PatientFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: NewPatient) => void;
  editingPatient: Patient | null;
  isLoading: boolean;
  onDelete?: (id: string) => void;
}

interface PatientFormData {
  name: string;
  gender: string;
  dob: string;
  chief_complaint: string;
  complaint_duration: string;
  tcm_inspection: any;
  tcm_auscultation: any;
  tcm_inquiry: any;
  tcm_palpation: any;
  emotional_state: string;
  lifestyle_factors: string;
  medical_history: string;
}

const calculateAge = (birthDate: string): number | null => {
  if (!birthDate) return null;
  
  const today = new Date();
  const birth = new Date(birthDate);
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export function PatientForm({ 
  isOpen, 
  onOpenChange, 
  onSubmit, 
  editingPatient, 
  isLoading,
  onDelete 
}: PatientFormProps) {
  const [age, setAge] = useState<number | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const { toast } = useToast();

  const form = useForm<PatientFormData>({
    defaultValues: {
      name: '',
      gender: '',
      dob: '',
      chief_complaint: '',
      complaint_duration: '',
      tcm_inspection: null,
      tcm_auscultation: null,
      tcm_inquiry: null,
      tcm_palpation: null,
      emotional_state: '',
      lifestyle_factors: '',
      medical_history: '',
    },
  });

  useEffect(() => {
    if (editingPatient) {
      console.log('Editing patient data:', editingPatient);
      form.reset({
        name: editingPatient.name || '',
        gender: editingPatient.gender || '',
        dob: editingPatient.dob || '',
        chief_complaint: editingPatient.chief_complaint || '',
        complaint_duration: editingPatient.complaint_duration || '',
        tcm_inspection: editingPatient.tcm_inspection || null,
        tcm_auscultation: editingPatient.tcm_auscultation || null,
        tcm_inquiry: editingPatient.tcm_inquiry || null,
        tcm_palpation: editingPatient.tcm_palpation || null,
        emotional_state: editingPatient.emotional_state || '',
        lifestyle_factors: editingPatient.lifestyle_factors || '',
        medical_history: editingPatient.medical_history || '',
      });
      setAge(calculateAge(editingPatient.dob));
    }
  }, [editingPatient, form]);

  const handleGenerateReport = async () => {
    if (!editingPatient?.id) return;
    
    try {
      setIsGeneratingReport(true);
      const report = await tcmService.generateReport(editingPatient.id);
      toast({
        title: "TCM Report Generated",
        description: report,
        duration: 10000,
      });
    } catch (error) {
      toast({
        title: "Error generating report",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleSubmit = (data: PatientFormData) => {
    console.log('Submitting form data:', data);
    onSubmit({
      name: data.name,
      dob: data.dob,
      gender: data.gender,
      chief_complaint: data.chief_complaint,
      complaint_duration: data.complaint_duration,
      tcm_inspection: data.tcm_inspection,
      tcm_auscultation: data.tcm_auscultation,
      tcm_inquiry: data.tcm_inquiry,
      tcm_palpation: data.tcm_palpation,
      emotional_state: data.emotional_state,
      lifestyle_factors: data.lifestyle_factors,
      medical_history: data.medical_history,
    });
  };

  const handleReset = () => {
    form.reset();
    toast({
      title: "Form Reset",
      description: "All form fields have been cleared.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingPatient ? 'Edit Patient' : 'Add New Patient'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Information</TabsTrigger>
                <TabsTrigger value="tcm">TCM Diagnostic</TabsTrigger>
                <TabsTrigger value="additional">Additional Information</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 mt-4">
                <BasicInformationForm 
                  form={form} 
                  age={age} 
                  onDateChange={(date) => setAge(calculateAge(date))}
                />
              </TabsContent>

              <TabsContent value="tcm" className="space-y-4 mt-4">
                <TCMDiagnosticForm form={form} />
              </TabsContent>

              <TabsContent value="additional" className="space-y-4 mt-4">
                <AdditionalTCMInfo form={form} />
              </TabsContent>
            </Tabs>

            <FormActionButtons
              isEditing={!!editingPatient}
              isSubmitting={isLoading}
              isGeneratingReport={isGeneratingReport}
              onSubmit={form.handleSubmit(handleSubmit)}
              onDelete={onDelete}
              onGenerateReport={handleGenerateReport}
              onReset={handleReset}
              patientId={editingPatient?.id}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}