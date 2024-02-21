import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const dealLinkFormSchema = z.object({
  link: z.string().url({ message: "Invalid URL" }).min(1, {
    message: "Link is required",
  }),
});

interface DealLinkFormProps {
  updateFormData: (formData: { link: string }) => void;
  currentStep: number;
  setCurrentStep: (index: number) => void;
}

const DealLinkForm = ({
  updateFormData,
  currentStep,
  setCurrentStep,
}: DealLinkFormProps) => {
  const form = useForm({
    resolver: zodResolver(dealLinkFormSchema),
    defaultValues: {
      link: "",
    },
  });

  const handleSubmit = () => {
    form.trigger().then((isValid: boolean) => {
      if (isValid) {
        const formData = form.getValues();
        updateFormData(formData);
        setCurrentStep(currentStep + 1);
      } else {
        console.log("Form validation failed");
      }
    });
  };

  return (
    <>
      <h1 className="text-3xl text-center font-bold">Share your deal</h1>
      <p className="text-lg text-center text-slate-600">
        Paste link with a deal below
      </p>

      <FormProvider {...form}>
        <div className="space-y-8 mt-8 w-full max-w-xl">
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deal Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://www.example.com/greatdeal..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Button type="button" onClick={handleSubmit}>
              Continue
            </Button>
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default DealLinkForm;
