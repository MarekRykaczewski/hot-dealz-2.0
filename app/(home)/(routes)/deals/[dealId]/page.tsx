import CategoryCrumbs from "@/components/category-crumbs";
import CommentSection from "@/components/comment-section";
import NotFound from "@/components/not-found";
import { db } from "@/lib/db";
import { DealBase } from "@/types";
import { auth } from "@clerk/nextjs";
import DealMain from "./_components/deal-main";

const DealPage = async ({ params }: { params: { dealId: string } }) => {
  const deal = await db.deal.findUnique({
    where: {
      id: params.dealId,
    },
    include: {
      comments: {
        include: {
          user: true,
          reactions: true,
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

  const commentCount = await db.comment.count({
    where: {
      dealId: deal.id,
    },
  });

  const { userId } = auth();
  const isDealOwner = deal?.userId === userId;

  return (
    <div className="w-full bg-gray-100">
      <div className="bg-stone-600 py-3 px-6">
        <CategoryCrumbs categoryId={deal.categoryId} />
      </div>
      <div className="flex flex-col gap-3 mx-auto py-2 sm:px-2 sm:w-full lg:w-[45vw]">
        <DealMain isDealOwner={isDealOwner} deal={deal as DealBase} />

        <CommentSection
          commentCount={commentCount}
          dealId={deal.id}
          dealComments={deal.comments}
        />
      </div>
    </div>
  );
};

export default DealPage;
