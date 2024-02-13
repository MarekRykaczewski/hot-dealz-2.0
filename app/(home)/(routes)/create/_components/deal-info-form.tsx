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
import { HandCoins, Scissors, Truck } from "lucide-react";

interface DealInfoProps {
  currentStep: number;
  setCurrentStep: (index: number) => void;
  form: any;
}

const DealInfo = ({ currentStep, setCurrentStep, form }: DealInfoProps) => {
  const handleSubmit = () => {
    if (form.formState.isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <>
      <h1 className="text-3xl text-center font-bold">Let&apos;s get started</h1>
      <p className="text-lg text-center text-slate-600">
        Tell us the essential information about the deal
      </p>
      <Form {...form}>
        <form onSubmit={() => setCurrentStep(1)} className="space-y-8 mt-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deal Title</FormLabel>
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
          <div className="flex justify-between space-x-3">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deal Price</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input className="pl-9" placeholder="29.99" {...field} />
                      <HandCoins
                        size={20}
                        className="absolute top-2.5 left-2.5 text-slate-500 font-bold"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nextBestPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Next Best Price</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input className="pl-9" placeholder="59.99" {...field} />
                      <HandCoins
                        size={20}
                        className="absolute top-2.5 left-2.5 text-slate-500 font-bold"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="promoCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Promo code</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="pl-9"
                      placeholder="Code needed to achieve this price"
                      {...field}
                    />
                    <Scissors
                      size={20}
                      className="absolute top-2.5 left-2.5 text-slate-500 font-bold"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shippingCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shipping Cost</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input className="pl-9" placeholder="0.00" {...field} />
                    <Truck
                      size={20}
                      className="absolute top-2.5 left-2.5 text-slate-500 font-bold"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-x-2">
            <Button type="button" variant="ghost">
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              type="button"
              disabled={!form.formState.isValid}
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default DealInfo;
