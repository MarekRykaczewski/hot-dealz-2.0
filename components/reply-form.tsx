import axios from "axios";
import { useState } from "react";
import { Button } from "./ui/button";

interface ReplyFormProps {
  parentId: string;
  dealId: string;
}

const ReplyForm = ({ parentId, dealId }: ReplyFormProps) => {
  const [content, setContent] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `/api/deals/${dealId}/comment/${parentId}/replies`,
        {
          content: content,
        }
      );
      setContent("");
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Write your reply..."
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ReplyForm;
