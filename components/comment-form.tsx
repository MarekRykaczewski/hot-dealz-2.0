"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { SendHorizontal } from "lucide-react";
import {
  FieldValues,
  Form,
  FormProvider,
  FormSubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "./ui/form";

interface CommentFormProps {
  dealId: string;
}

const CommentForm = ({ dealId }: CommentFormProps) => {
  const CommentFormSchema = z.object({
    content: z.string().min(1, {
      message: "Comment cannot be empty!",
    }),
  });

  const form = useForm({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit: FormSubmitHandler<FieldValues> = async () => {
    try {
      await axios.post(`/api/deals/${dealId}/comment`, form.getValues());
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <FormProvider {...form}>
      <Form onSubmit={handleSubmit}>
        <FormField
          name="content"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormControl>
                <textarea
                  className="border rounded-lg p-2"
                  placeholder="Write your comment here..."
                  rows={4}
                  cols={50}
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="outline" className="flex gap-2" type="submit">
          <SendHorizontal size={18} />
          Submit
        </Button>
      </Form>
    </FormProvider>
  );
};

export default CommentForm;
