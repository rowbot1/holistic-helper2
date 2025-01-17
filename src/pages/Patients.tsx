import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from '@/components/ui/use-toast';
import { patientsService } from '@/services/patients';
import { tcmService } from '@/services/tcm';
import { Patient, NewPatient } from '@/types/patient';
import { Loader2 } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const patientData = {
      name: formData.get('name') as string,
      dob: formData.get('dob') as string,
      gender: formData.get('gender') as string,
      chief_complaint: formData.get('chief_complaint') as string,
      tongue_color: formData.get('tongue_color') as string,
    };

    if (editingPatient) {
      updateMutation.mutate({
        id: editingPatient.id,
        patient: patientData,
      });
    } else {
      createMutation.mutate(patientData as NewPatient);
    }
  };

  const handleGenerateReport = async (patientId: string) => {
    try {
      setGeneratingReport(patientId);
      const report = await tcmService.generateReport(patientId);
      toast({ 
        title: 'Report generated successfully',
        description: report
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
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Patients</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingPatient(null);
                setIsOpen(true);
              }}
            >
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingPatient ? 'Edit Patient' : 'Add New Patient'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                placeholder="Name"
                defaultValue={editingPatient?.name}
                required
              />
              <Input
                name="dob"
                type="date"
                placeholder="Date of Birth"
                defaultValue={editingPatient?.dob}
                required
              />
              <Input
                name="gender"
                placeholder="Gender"
                defaultValue={editingPatient?.gender}
                required
              />
              <Input
                name="chief_complaint"
                placeholder="Chief Complaint"
                defaultValue={editingPatient?.chief_complaint}
                required
              />
              <Input
                name="tongue_color"
                placeholder="Tongue Color"
                defaultValue={editingPatient?.tongue_color}
              />
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {(createMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {editingPatient ? 'Update' : 'Create'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Chief Complaint</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.dob}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.chief_complaint}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingPatient(patient);
                      setIsOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the patient's record.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteMutation.mutate(patient.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button
                    variant="outline"
                    onClick={() => handleGenerateReport(patient.id)}
                    disabled={generatingReport === patient.id}
                  >
                    {generatingReport === patient.id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Generate Report
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}