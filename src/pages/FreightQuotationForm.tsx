import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const freightFormSchema = z.object({
  quotationNumber: z.string().min(1, "Quotation number is required"),
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
  containerType: z.string().min(1, "Container type is required"),
  rate: z
    .string()
    .regex(/^-?\d+(\.\d{1,2})?$/, "Rate must be a valid number"),
  validityDate: z.string().optional(),
  additionalCharges: z
    .string()
    .regex(/^-?\d+(\.\d{1,2})?$/, "Additional charges must be a valid number")
    .optional(),
  notes: z.string().optional(),
});

type FreightFormValues = z.infer<typeof freightFormSchema>;

const FreightQuotationForm = () => {
  const form = useForm<FreightFormValues>({
    resolver: zodResolver(freightFormSchema),
    defaultValues: {
      quotationNumber: "",
      origin: "",
      destination: "",
      containerType: "",
      rate: "",
      validityDate: "",
      additionalCharges: "",
      notes: "",
    },
    mode: "onTouched",
  });

  function onSubmit(data: FreightFormValues) {
    toast({
      title: "Freight Quotation Submitted",
      description: "The freight quotation has been saved successfully.",
    });
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="quotationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quotation Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter quotation number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="origin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Origin</FormLabel>
                <FormControl>
                  <Input placeholder="Enter origin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination</FormLabel>
                <FormControl>
                  <Input placeholder="Enter destination" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="containerType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Container Type</FormLabel>
                <FormControl>
                  <Input placeholder="Enter container type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="Enter rate" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="validityDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Validity Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalCharges"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Charges</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="Enter additional charges" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter notes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full md:w-auto">
          Submit Freight Quotation
        </Button>
      </form>
    </Form>
  );
};

export default FreightQuotationForm;
