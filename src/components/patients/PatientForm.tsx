import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { Patient, NewPatient } from '@/types/patient';

interface PatientFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: NewPatient) => void;
  editingPatient: Patient | null;
  isLoading: boolean;
}

export function PatientForm({ isOpen, onOpenChange, onSubmit, editingPatient, isLoading }: PatientFormProps) {
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
    onSubmit(patientData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
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
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {editingPatient ? 'Update' : 'Create'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}