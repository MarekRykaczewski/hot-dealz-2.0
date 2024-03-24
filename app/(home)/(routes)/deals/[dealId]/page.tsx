import Comment from "@/components/comment";
import CommentForm from "@/components/comment-form";
import NotFound from "@/components/not-found";
import { ShareDeal } from "@/components/share-deal";
import { db } from "@/lib/db";

interface CommentWithChildren extends Comment {
  childComments: CommentWithChildren[];
}

const DealPage = async ({ params }: { params: { dealId: string } }) => {
  const deal = await db.deal.findUnique({
    where: {
      id: params.dealId,
    },
    include: {
      comments: {
        include: {
          childComments: {
            include: {
              childComments: true,
            },
          },
        },
        where: {
          parentId: null,
        },
      },
    },
  });

  const renderComments = (
    comments: CommentWithChildren[],
    nestingLevel = 0
  ) => {
    return comments.map((comment: CommentWithChildren) => (
      <div key={comment.id} style={{ marginLeft: nestingLevel * 10 }}>
        <Comment comment={comment} />
        {comment.childComments &&
          comment.childComments.length > 0 &&
          renderComments(comment.childComments, nestingLevel + 1)}
      </div>
    ));
  };

  if (!deal) {
    return <NotFound />;
  }

  return (
    <div>
      <div className="border rounded-lg p-2 mt-4">
        <h1 className="text-bold text-3xl">{deal.title}</h1>
        <ShareDeal />
      </div>

      <CommentForm dealId={deal.id} />
      <h2>Comments:</h2>
      <div className="flex flex-col gap-2">{renderComments(deal.comments)}</div>
    </div>
  );
};

export default DealPage;
