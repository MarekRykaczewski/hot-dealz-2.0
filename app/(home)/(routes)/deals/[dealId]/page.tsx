import CategoryCrumbs from "@/components/category-crumbs";
import CommentCard from "@/components/comment-card";
import CommentForm from "@/components/comment-form";
import CommentSort from "@/components/comment-sort";
import DealDetails from "@/components/deal-details";
import DealOwnerBanner from "@/components/deal-owner-banner";
import DealStatusBanner from "@/components/deal-status-banner";
import NotFound from "@/components/not-found";
import Preview from "@/components/preview";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

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
          user: true,
          childComments: {
            include: {
              user: true,
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
        <CommentCard comment={comment} />
        {comment.childComments &&
          comment.childComments.length > 0 &&
          renderComments(comment.childComments, nestingLevel + 1)}
      </div>
    ));
  };

  const { userId } = auth();

  const isDealOwner = deal.userId === userId;

  if (!deal) {
    return <NotFound />;
  }

  return (
    <div className="w-full bg-gray-100">
      <div className="bg-stone-700 py-3 px-6">
        <CategoryCrumbs categoryId={deal.categoryId} />
      </div>
      <div className="flex flex-col gap-3 mx-auto py-2 sm:px-2 sm:w-full lg:w-[45vw]">
        {isDealOwner && <DealOwnerBanner isPublished={deal.isPublished} />}

        {/* {!deal.isPublished && (
          <div className="rounded-lg flex items-center justify-center gap-2 bg-red-100 p-4 text-red-700 text-lg ">
            <AlertCircle />
            <span>Unfortunately this deal has expired</span>
          </div>
        )} */}
        {<DealStatusBanner deal={deal} />}
        <div className="flex bg-white rounded-lg p-6">
          <DealDetails deal={deal} />
        </div>

        <div className="bg-white p-6 rounded-md">
          <h2 className="text-xl font-bold">About this deal</h2>
          <Preview value={deal.description} />
        </div>

        <div className="bg-white p-6 rounded-md">
          <div className="flex gap-4 mb-2">
            <h2 className="text-xl font-bold">
              {deal.comments.length} Comments
            </h2>
            <span>
              Sorting: <CommentSort />
            </span>
          </div>

          <CommentForm dealId={deal.id} />
        </div>

        <div className="flex flex-col gap-2">
          {renderComments(deal.comments)}
        </div>
      </div>
    </div>
  );
};

export default DealPage;
