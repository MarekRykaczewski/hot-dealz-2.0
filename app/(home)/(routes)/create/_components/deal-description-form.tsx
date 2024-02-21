import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

const DealDescriptionFormSchema = z.object({
  description: z.string().min(1).max(500),
});

interface FormData {
  description: string;
}

interface DealDescriptionFormProps {
  updateFormData: (formData: { description: string }) => void;
  currentStep: number;
  setCurrentStep: (index: number) => void;
}

const DealDescriptionForm = ({
  updateFormData,
  currentStep,
  setCurrentStep,
}: DealDescriptionFormProps) => {
  const form = useForm({
    resolver: zodResolver(DealDescriptionFormSchema),
    defaultValues: {
      description: "",
    },
  });

  const handleSubmit = () => {
    form.trigger().then((isValid: boolean) => {
      if (isValid) {
        const formData = form.getValues() as FormData;
        updateFormData(formData);
        setCurrentStep(currentStep + 1);
      } else {
        console.log("Form validation failed");
      }
    });
  };

  return (
    <>
      <h1 className="text-3xl text-center font-bold">Description</h1>
      <p className="text-lg text-center text-slate-600">
        What makes this deal so good?
      </p>

      <FormProvider {...form}>
        <div className="space-y-8 mt-8 h-auto">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deal Descirption</FormLabel>
                <FormControl>
                  <Editor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Button type="button" variant="ghost">
              Back
            </Button>
            <Button onClick={handleSubmit} type="submit">
              Continue
            </Button>
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default DealDescriptionForm;
