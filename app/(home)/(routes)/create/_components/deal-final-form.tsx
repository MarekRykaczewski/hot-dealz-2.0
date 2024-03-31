import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/date-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";

const DealFinalFormSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  categoryId: z.string(),
});

interface FormData {
  startDate: Date;
  endDate: Date;
  categoryId: string;
}

interface DealFinalFormProps {
  handleFormStep: (form: UseFormReturn<FormData>) => void;
  options: {
    name: string;
    id: string;
  }[];
}

const DealFinalForm = ({
  handleFormStep,
  options,
  formData,
}: DealFinalFormProps) => {
  const form = useForm({
    resolver: zodResolver(DealFinalFormSchema),
    defaultValues: {
      startDate: formData.startDate,
      endDate: formData.endDate,
      categoryId: formData.categoryId,
    },
  });

  return (
    <>
      <h1 className="text-3xl text-center font-bold">Wrapping up</h1>
      <p className="text-lg text-center text-slate-600">
        You&apos;re almost there
      </p>

      <FormProvider {...form}>
        <div className="space-y-8 mt-8">
          <div className="flex justify-between space-x-3">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <DatePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <DatePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Combobox
                    options={options.map((option) => ({
                      label: option.name,
                      value: option.id,
                    }))}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-2">
            <Button type="button" variant="ghost">
              Cancel
            </Button>
            <Button type="submit" onClick={() => handleFormStep(form)}>
              Continue
            </Button>
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default DealFinalForm;
