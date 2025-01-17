import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { Patient, NewPatient } from '@/types/patient';
import { differenceInYears, parse } from 'date-fns';
import { TCMDiagnosticForm } from './TCMDiagnosticForm';
import { AdditionalTCMInfo } from './AdditionalTCMInfo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PatientFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: NewPatient) => void;
  editingPatient: Patient | null;
  isLoading: boolean;
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

export function PatientForm({ isOpen, onOpenChange, onSubmit, editingPatient, isLoading }: PatientFormProps) {
  const [age, setAge] = useState<number | null>(null);

  const form = useForm<PatientFormData>({
    defaultValues: {
      name: editingPatient?.name || '',
      gender: editingPatient?.gender || '',
      dob: editingPatient?.dob || '',
      chief_complaint: editingPatient?.chief_complaint || '',
      complaint_duration: editingPatient?.complaint_duration || '',
      tcm_inspection: editingPatient?.tcm_inspection || null,
      tcm_auscultation: editingPatient?.tcm_auscultation || null,
      tcm_inquiry: editingPatient?.tcm_inquiry || null,
      tcm_palpation: editingPatient?.tcm_palpation || null,
      emotional_state: editingPatient?.emotional_state || '',
      lifestyle_factors: editingPatient?.lifestyle_factors || '',
      medical_history: editingPatient?.medical_history || '',
    },
  });

  useEffect(() => {
    if (editingPatient) {
      form.reset({
        name: editingPatient.name,
        gender: editingPatient.gender,
        dob: editingPatient.dob,
        chief_complaint: editingPatient.chief_complaint,
        complaint_duration: editingPatient.complaint_duration || '',
        tcm_inspection: editingPatient.tcm_inspection || null,
        tcm_auscultation: editingPatient.tcm_auscultation || null,
        tcm_inquiry: editingPatient.tcm_inquiry || null,
        tcm_palpation: editingPatient.tcm_palpation || null,
        emotional_state: editingPatient.emotional_state || '',
        lifestyle_factors: editingPatient.lifestyle_factors || '',
        medical_history: editingPatient.medical_history || '',
      });
    }
  }, [editingPatient, form]);

  const calculateAge = (dobString: string) => {
    try {
      const dob = parse(dobString, 'yyyy-MM-dd', new Date());
      const calculatedAge = differenceInYears(new Date(), dob);
      setAge(calculatedAge);
    } catch (error) {
      setAge(null);
    }
  };

  const handleSubmit = (data: PatientFormData) => {
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
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: 'Name is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Patient name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    rules={{ required: 'Gender is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dob"
                    rules={{ 
                      required: 'Date of birth is required',
                      pattern: {
                        value: /^\d{4}-\d{2}-\d{2}$/,
                        message: 'Please use YYYY-MM-DD format'
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              calculateAge(e.target.value);
                            }}
                          />
                        </FormControl>
                        {age !== null && (
                          <div className="text-sm text-muted-foreground">
                            Age: {age} years
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="chief_complaint"
                    rules={{ required: 'Chief complaint is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chief Complaint</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the main health issue"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="complaint_duration"
                    rules={{ required: 'Complaint duration is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration of Complaint</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., 2 weeks, 3 months"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="tcm" className="space-y-4 mt-4">
                <TCMDiagnosticForm form={form} />
              </TabsContent>

              <TabsContent value="additional" className="space-y-4 mt-4">
                <AdditionalTCMInfo form={form} />
              </TabsContent>
            </Tabs>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingPatient ? 'Update' : 'Create'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}