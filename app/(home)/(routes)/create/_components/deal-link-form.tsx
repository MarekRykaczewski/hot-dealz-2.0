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

interface DealLinkFormProps {
  currentStep: number;
  setCurrentStep: (index: number) => void;
  form: any;
}

const DealLinkForm = ({
  currentStep,
  setCurrentStep,
  form,
}: DealLinkFormProps) => {
  const handleSubmit = () => {
    if (!form.formState.errors.link) {
      setCurrentStep(currentStep + 1);
    }
  };

  console.log("[FORM]", form.formState.errors);

  return (
    <>
      <h1 className="text-3xl text-center font-bold">Share your deal</h1>
      <p className="text-lg text-center text-slate-600">
        Paste link with a deal below
      </p>
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className="space-y-8 mt-8 w-full max-w-xl"
        >
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
            <Button type="submit" disabled={!form.formState.errors.link}>
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default DealLinkForm;
