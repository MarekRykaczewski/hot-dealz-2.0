import Comment from "@/components/comment";
import CommentForm from "@/components/comment-form";
import { db } from "@/lib/db";

const DealPage = async ({ params }: { params: { dealId: string } }) => {
  const deal = await db.deal.findUnique({
    where: {
      id: params.dealId,
    },
    include: {
      comments: true,
    },
  });

  return (
    <div>
      <h1>{deal?.title}</h1>
      <CommentForm dealId={deal.id} />
      <h2>Comments:</h2>
      <div className="flex flex-col gap-2">
        {deal?.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default DealPage;
