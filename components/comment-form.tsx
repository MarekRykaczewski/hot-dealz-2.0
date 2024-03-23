"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  FieldValues,
  Form,
  FormProvider,
  FormSubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <textarea
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
        <button type="submit">Submit</button>
      </Form>
    </FormProvider>
  );
};

export default CommentForm;
