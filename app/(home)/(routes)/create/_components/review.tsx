import { Button } from "@/components/ui/button";

interface ReviewProps {
  onSubmit: () => void;
  formData: {};
}

const Review = ({ onSubmit }: ReviewProps) => {
  return (
    <div>
      <h1 className="text-3xl text-center font-bold">Review</h1>
      <p className="text-lg text-center text-slate-600">Ready to submit?</p>
      <div>TODO</div>
      <Button onClick={() => onSubmit()} type="button">
        Submit
      </Button>
    </div>
  );
};

export default Review;
