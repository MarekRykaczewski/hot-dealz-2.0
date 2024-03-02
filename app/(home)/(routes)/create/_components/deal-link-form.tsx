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
import { FormProvider, UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

interface FormData {
  link: string;
}

const dealLinkFormSchema = z.object({
  link: z.string().url({ message: "Invalid URL" }).min(1, {
    message: "Link is required",
  }),
});

interface DealLinkFormProps {
  handleFormStep: (form: UseFormReturn<FormData>) => void;
}

const DealLinkForm = ({ handleFormStep }: DealLinkFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(dealLinkFormSchema),
    defaultValues: {
      link: "",
    },
  });

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
            <Button type="button" onClick={() => handleFormStep(form)}>
              Continue
            </Button>
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default DealLinkForm;
