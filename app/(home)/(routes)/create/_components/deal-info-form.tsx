import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { HandCoins, Scissors, Truck } from "lucide-react";
import { FormProvider, UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

const dealInfoSchema = z
  .object({
    title: z.string().min(1),
    price: z.coerce.number().positive(),
    nextBestPrice: z.coerce.number().positive(),
    promoCode: z.string().optional(),
    shippingPrice: z.coerce.number(),
  })
  .refine((data) => data.price < data.nextBestPrice, {
    message: "Price must be smaller than next best price",
    path: ["price"],
  });

interface DealInfoProps {
  handleFormStep: (form: UseFormReturn<FormData>) => void;
  formData: FormData;
}

const DealInfo = ({ handleFormStep, formData }: DealInfoProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(dealInfoSchema),
    defaultValues: {
      title: formData.title,
      price: formData.price,
      nextBestPrice: formData.nextBestPrice,
      promoCode: formData.promoCode,
      shippingPrice: formData.shippingPrice,
    },
  });

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
            name="shippingPrice"
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
            <Button onClick={() => handleFormStep(form)} type="button">
              Continue
            </Button>
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default DealInfo;
