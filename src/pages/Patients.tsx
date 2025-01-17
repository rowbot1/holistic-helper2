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
import { useToast } from '@/components/ui/use-toast';
import { patientsService } from '@/services/patients';
import { Patient, NewPatient } from '@/types/patient';

export default function Patients() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

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
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, patient }: { id: string; patient: Partial<NewPatient> }) =>
      patientsService.update(id, patient),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast({ title: 'Patient updated successfully' });
      setIsOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: patientsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast({ title: 'Patient deleted successfully' });
    },
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
              <Button type="submit">
                {editingPatient ? 'Update' : 'Create'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
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
                    <Button
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(patient.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}