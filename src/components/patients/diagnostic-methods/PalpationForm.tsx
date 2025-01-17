import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { TCMDiagnosticFormData } from "../types/tcm";

interface PalpationFormProps {
  form: UseFormReturn<TCMDiagnosticFormData>;
}

export function PalpationForm({ form }: PalpationFormProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="pulseRate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pulse Rate (BPM)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter pulse rate"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="pulseQualities"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pulse Qualities</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select pulse qualities" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="floating">Floating</SelectItem>
                <SelectItem value="sinking">Sinking</SelectItem>
                <SelectItem value="rapid">Rapid</SelectItem>
                <SelectItem value="slow">Slow</SelectItem>
                <SelectItem value="wiry">Wiry</SelectItem>
                <SelectItem value="slippery">Slippery</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}