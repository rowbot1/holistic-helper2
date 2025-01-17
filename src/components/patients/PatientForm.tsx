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
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {editingPatient ? 'Edit Patient' : 'Add New Patient'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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

              <div>
                <TCMDiagnosticForm form={form} />
              </div>
            </div>

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