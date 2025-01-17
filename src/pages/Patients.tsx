import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from '@/hooks/use-toast';
import { patientsService } from '@/services/patients';
import { tcmService } from '@/services/tcm';
import { Patient, NewPatient } from '@/types/patient';
import { UserPlus } from 'lucide-react';
import { PatientForm } from '@/components/patients/PatientForm';
import { PatientTable } from '@/components/patients/PatientTable';

export default function Patients() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);

  const { data: patients = [], isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: patientsService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: patientsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast({ title: 'Patient created successfully' });
      setIsOpen(false);
    },
    onError: (error) => {
      toast({ 
        title: 'Error creating patient', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, patient }: { id: string; patient: Partial<NewPatient> }) =>
      patientsService.update(id, patient),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast({ title: 'Patient updated successfully' });
      setIsOpen(false);
    },
    onError: (error) => {
      toast({ 
        title: 'Error updating patient', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: patientsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast({ title: 'Patient deleted successfully' });
    },
    onError: (error) => {
      toast({ 
        title: 'Error deleting patient', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const handleSubmit = (patientData: NewPatient) => {
    if (editingPatient) {
      updateMutation.mutate({
        id: editingPatient.id,
        patient: patientData,
      });
    } else {
      createMutation.mutate(patientData);
    }
  };

  const handleGenerateReport = async (patientId: string) => {
    try {
      setGeneratingReport(patientId);
      const report = await tcmService.generateReport(patientId);
      toast({ 
        title: 'TCM Report Generated',
        description: report,
        duration: 10000,
      });
    } catch (error) {
      toast({ 
        title: 'Error generating report', 
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setGeneratingReport(null);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 space-y-4">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="rounded-md border">
          <div className="p-4 space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Patients</h1>
        <Button
          onClick={() => {
            setEditingPatient(null);
            setIsOpen(true);
          }}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </div>

      <PatientForm
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onSubmit={handleSubmit}
        editingPatient={editingPatient}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <PatientTable
        patients={patients}
        onEdit={(patient) => {
          setEditingPatient(patient);
          setIsOpen(true);
        }}
        onDelete={(id) => deleteMutation.mutate(id)}
        onGenerateReport={handleGenerateReport}
        generatingReport={generatingReport}
      />
    </div>
  );
}