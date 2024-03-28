import CategoryCrumbs from "@/components/category-crumbs";
import Comment from "@/components/comment";
import CommentForm from "@/components/comment-form";
import DealDetails from "@/components/deal-details";
import NotFound from "@/components/not-found";
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
    <div className="w-full bg-gray-100">
      <div className="bg-stone-700 py-3 px-6">
        <CategoryCrumbs categoryId={deal.categoryId} />
      </div>
      <div className="mx-auto py-2 sm:px-2 sm:w-full lg:w-[45vw]">
        <div className="flex bg-white rounded-lg p-6">
          <DealDetails deal={deal} />
        </div>

        <CommentForm dealId={deal.id} />
        <h2>Comments:</h2>
        <div className="flex flex-col gap-2">
          {renderComments(deal.comments)}
        </div>
      </div>
    </div>
  );
};

export default DealPage;
