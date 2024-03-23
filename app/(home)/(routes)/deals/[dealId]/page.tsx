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
      <ul>
        {deal?.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default DealPage;
