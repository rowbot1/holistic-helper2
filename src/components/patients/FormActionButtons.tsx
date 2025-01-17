import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Loader2, Save, FileText, Trash2, RotateCcw } from "lucide-react";
import { Patient } from "@/types/patient";
import { useToast } from "@/hooks/use-toast";

interface FormActionButtonsProps {
  isEditing: boolean;
  isSubmitting: boolean;
  isGeneratingReport: boolean;
  onSubmit: () => void;
  onDelete?: (id: string) => void;
  onGenerateReport: () => void;
  onReset: () => void;
  patientId?: string;
}

export function FormActionButtons({
  isEditing,
  isSubmitting,
  isGeneratingReport,
  onSubmit,
  onDelete,
  onGenerateReport,
  onReset,
  patientId,
}: FormActionButtonsProps) {
  const { toast } = useToast();

  const handleDelete = () => {
    if (patientId && onDelete) {
      onDelete(patientId);
      toast({
        title: "Patient deleted",
        description: "The patient record has been removed.",
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-end mt-6">
      <Button
        type="submit"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <Save className="mr-2 h-4 w-4" />
        {isEditing ? "Update Patient" : "Save Patient"}
      </Button>

      {isEditing && (
        <>
          <Button
            type="button"
            variant="secondary"
            onClick={onGenerateReport}
            disabled={isGeneratingReport}
            className="w-full sm:w-auto"
          >
            {isGeneratingReport && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="destructive"
                className="w-full sm:w-auto"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Patient
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  patient record and all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}

      <Button
        type="button"
        variant="outline"
        onClick={onReset}
        className="w-full sm:w-auto"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset Form
      </Button>
    </div>
  );
}