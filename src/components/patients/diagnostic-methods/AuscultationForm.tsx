import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { TCMDiagnosticFormData } from "../types/tcm";

interface AuscultationFormProps {
  form: UseFormReturn<TCMDiagnosticFormData>;
}

export function AuscultationForm({ form }: AuscultationFormProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="voiceSound"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Voice Sound</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select voice sound" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="hoarse">Hoarse</SelectItem>
                <SelectItem value="weak">Weak</SelectItem>
                <SelectItem value="loud">Loud</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="breathOdor"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Breath Odor</FormLabel>
            <Textarea 
              placeholder="Describe breath odor characteristics"
              {...field}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}