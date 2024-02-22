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
import { HandCoins, Scissors, Truck } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const dealInfoSchema = z
  .object({
    title: z.string().min(1),
    price: z.coerce.number().positive(),
    nextBestPrice: z.coerce.number().positive(),
    promoCode: z.string().optional(),
    shippingCost: z.coerce.number(),
  })
  .refine((data) => data.price < data.nextBestPrice, {
    message: "Price must be smaller than next best price",
    path: ["price"],
  });

interface FormData {
  title: string;
  price: number;
  nextBestPrice: number;
  promoCode?: string;
  shippingCost: number;
}

interface DealInfoProps {
  updateFormData: (formData: FormData) => void;
  currentStep: number;
  setCurrentStep: (index: number) => void;
}

const DealInfo = ({
  currentStep,
  setCurrentStep,
  updateFormData,
}: DealInfoProps) => {
  const form = useForm({
    resolver: zodResolver(dealInfoSchema),
    defaultValues: {
      title: "",
      price: 0,
      nextBestPrice: 0,
      promoCode: "",
      shippingCost: 0,
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
      <h1 className="text-3xl text-center font-bold">Let&apos;s get started</h1>
      <p className="text-lg text-center text-slate-600">
        Tell us the essential information about the deal
      </p>

      <FormProvider {...form}>
        <div className="space-y-8 mt-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deal Title</FormLabel>
                <FormControl>
                  <Input placeholder="Great Deal" {...field} />
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
                      <Input
                        type="number"
                        className="pl-9"
                        placeholder="29.99"
                        {...field}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          field.onChange(value || undefined);
                        }}
                      />
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
                      <Input
                        type="number"
                        className="pl-9"
                        placeholder="59.99"
                        {...field}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          field.onChange(value || undefined);
                        }}
                      />
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
                    <Input
                      className="pl-9"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        field.onChange(value || undefined);
                      }}
                    />
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
            <Button onClick={handleSubmit} type="button">
              Continue
            </Button>
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default DealInfo;
