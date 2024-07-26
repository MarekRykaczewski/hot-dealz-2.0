import CategoryCrumbs from "@/components/category-crumbs";
import CommentSection from "@/components/comment-section";
import DealDetails from "@/components/deal-details";
import DealOwnerBanner from "@/components/deal-owner-banner";
import DealStatusBanner from "@/components/deal-status-banner";
import NotFound from "@/components/not-found";
import Preview from "@/components/preview";
import SavedDealButton from "@/components/saved-deal-button";
import { db } from "@/lib/db";
import { DealBase } from "@/types";
import { auth } from "@clerk/nextjs";

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
      user: true,
    },
  });

  if (!deal) {
    return <NotFound />;
  }

  if (!deal.user.username) {
    throw new Error("Deal owner does not have a username");
  }

  const { userId } = auth();
  const isDealOwner = deal?.userId === userId;

  return (
    <div className="w-full bg-gray-100">
      <div className="bg-stone-700 py-3 px-6">
        <CategoryCrumbs categoryId={deal.categoryId} />
      </div>
      <div className="flex flex-col gap-3 mx-auto py-2 sm:px-2 sm:w-full lg:w-[45vw]">
        {isDealOwner && <DealOwnerBanner isPublished={deal.isPublished} />}

        {<DealStatusBanner deal={deal} />}
        <div className="flex bg-white rounded-lg p-6">
          <DealDetails deal={deal as DealBase} />
        </div>

        <div className="flex flex-col gap-2 bg-white p-6 rounded-md">
          <h2 className="text-xl font-bold">About this deal</h2>
          <Preview value={deal.description} />
          <SavedDealButton dealId={deal.id} />
        </div>

        <CommentSection
          commentCount={deal.comments.length}
          dealId={deal.id}
          dealComments={deal.comments}
        />
      </div>
    </div>
  );
};

export default DealPage;
