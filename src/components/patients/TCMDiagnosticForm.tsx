import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TCMDiagnosticFormData {
  // Inspection
  complexion: string;
  tongueColor: string;
  tongueCoating: string;
  tongueFeatures: string;
  
  // Auscultation and Olfaction
  voiceSound: string;
  breathOdor: string;
  
  // Inquiry
  coldHeatSensation: string;
  sweating: string;
  appetite: string;
  thirst: string;
  sleepPattern: string;
  bowelMovements: string;
  urination: string;
  painDescription: string;
  
  // Palpation
  pulseRate: number;
  pulseQualities: string; // Changed from string[] to string
}

export function TCMDiagnosticForm() {
  const form = useForm<TCMDiagnosticFormData>();

  return (
    <Card className="p-6">
      <Form {...form}>
        <form className="space-y-6">
          <Tabs defaultValue="inspection" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="inspection">Inspection</TabsTrigger>
              <TabsTrigger value="auscultation">Auscultation</TabsTrigger>
              <TabsTrigger value="inquiry">Inquiry</TabsTrigger>
              <TabsTrigger value="palpation">Palpation</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <TabsContent value="inspection" className="space-y-4">
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
              </TabsContent>

              <TabsContent value="auscultation" className="space-y-4">
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
              </TabsContent>

              <TabsContent value="inquiry" className="space-y-4">
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
              </TabsContent>

              <TabsContent value="palpation" className="space-y-4">
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
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </form>
      </Form>
    </Card>
  );
}