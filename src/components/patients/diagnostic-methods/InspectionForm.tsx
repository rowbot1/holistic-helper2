import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { TCMDiagnosticFormData } from "../types/tcm";

interface InspectionFormProps {
  form: UseFormReturn<TCMDiagnosticFormData>;
}

export function InspectionForm({ form }: InspectionFormProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="complexion"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Complexion</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select complexion" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="pale">Pale</SelectItem>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="yellow">Yellow</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tongueColor"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tongue Color</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select tongue color" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="pale">Pale</SelectItem>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tongueCoating"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tongue Coating</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select tongue coating" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="thin">Thin</SelectItem>
                <SelectItem value="thick">Thick</SelectItem>
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="yellow">Yellow</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tongueFeatures"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tongue Shape/Features</FormLabel>
            <Textarea 
              placeholder="Describe tongue shape and features"
              {...field}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}