import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BasicInformationFormProps {
  form: UseFormReturn<any>;
  age: number | null;
  onDateChange: (date: string) => void;
}

export function BasicInformationForm({ form, age, onDateChange }: BasicInformationFormProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        rules={{ required: 'Name is required' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Patient name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="gender"
        rules={{ required: 'Gender is required' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="dob"
        rules={{ 
          required: 'Date of birth is required',
          pattern: {
            value: /^\d{4}-\d{2}-\d{2}$/,
            message: 'Please use YYYY-MM-DD format'
          }
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Birth</FormLabel>
            <FormControl>
              <Input 
                type="date" 
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  onDateChange(e.target.value);
                }}
              />
            </FormControl>
            {age !== null && (
              <div className="text-sm text-muted-foreground">
                Age: {age} years
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="chief_complaint"
        rules={{ required: 'Chief complaint is required' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Chief Complaint</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe the main health issue"
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
        name="complaint_duration"
        rules={{ required: 'Complaint duration is required' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Duration of Complaint</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., 2 weeks, 3 months"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}