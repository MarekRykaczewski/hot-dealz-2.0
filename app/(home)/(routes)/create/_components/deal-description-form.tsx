import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";

interface DealDescriptionFormProps {
  currentStep: number;
  setCurrentStep: (index: number) => void;
  form: any;
}

const DealDescriptionForm = ({
  currentStep,
  setCurrentStep,
  form,
}: DealDescriptionFormProps) => {
  return (
    <>
      <h1 className="text-3xl text-center font-bold">Description</h1>
      <p className="text-lg text-center text-slate-600">
        What makes this deal so good?
      </p>
      <Form {...form}>
        <form onSubmit={() => setCurrentStep(1)} className="space-y-8 mt-8">
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
            <Button type="submit" disabled={!z.isValid}>
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default DealDescriptionForm;
