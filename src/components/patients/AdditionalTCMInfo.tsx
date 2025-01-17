import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface AdditionalTCMInfoProps {
  form: UseFormReturn<any>;
}

export function AdditionalTCMInfo({ form }: AdditionalTCMInfoProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="emotional_state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emotional State</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe patient's emotional state and mental well-being"
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
          name="lifestyle_factors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lifestyle Factors</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Details about diet, exercise, stress levels, sleep patterns, etc."
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
          name="medical_history"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medical History</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Relevant past medical conditions, treatments, and family history"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Card>
  );
}