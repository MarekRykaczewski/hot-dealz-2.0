import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";

interface DealFinalFormProps {
  currentStep: number;
  setCurrentStep: (index: number) => void;
  form: any;
  options: {
    name: string;
    id: string;
  }[];
}

const DealFinalForm = ({
  currentStep,
  setCurrentStep,
  form,
  options,
}: DealFinalFormProps) => {
  return (
    <>
      <h1 className="text-3xl text-center font-bold">Wrapping up</h1>
      <p className="text-lg text-center text-slate-600">
        You&apos;re almost there
      </p>
      <Form {...form}>
        <form onSubmit={() => setCurrentStep(1)} className="space-y-8 mt-8">
          <div className="flex justify-between space-x-3">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <DatePicker />
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
                    <DatePicker />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="category"
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
            <Button type="submit" disabled={!z.isValid}>
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default DealFinalForm;
