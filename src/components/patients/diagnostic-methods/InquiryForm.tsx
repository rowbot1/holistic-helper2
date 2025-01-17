import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { TCMDiagnosticFormData } from "../types/tcm";

interface InquiryFormProps {
  form: UseFormReturn<TCMDiagnosticFormData>;
}

export function InquiryForm({ form }: InquiryFormProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="coldHeatSensation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cold/Heat Sensation</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select sensation" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="chills">Chills</SelectItem>
                <SelectItem value="fever">Fever</SelectItem>
                <SelectItem value="alternating">Alternating Cold/Heat</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="sweating"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sweating</FormLabel>
            <Textarea 
              placeholder="Describe sweating patterns"
              {...field}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="appetite"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Appetite</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select appetite level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="increased">Increased</SelectItem>
                <SelectItem value="decreased">Decreased</SelectItem>
                <SelectItem value="no-appetite">No Appetite</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="sleepPattern"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sleep Pattern</FormLabel>
            <Textarea 
              placeholder="Describe sleep patterns and quality"
              {...field}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bowelMovements"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bowel Movements</FormLabel>
            <Textarea 
              placeholder="Describe bowel movement patterns"
              {...field}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="urination"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Urination</FormLabel>
            <Textarea 
              placeholder="Describe urination patterns"
              {...field}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="painDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pain Description</FormLabel>
            <Textarea 
              placeholder="Describe pain location, nature, and factors"
              {...field}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}