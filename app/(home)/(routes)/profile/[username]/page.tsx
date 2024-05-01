import DealsList from "@/components/deals-list";
import { db } from "@/lib/db";

const ProfilePage = async ({ params }) => {
  const { username } = params;

  console.log(username);

  const user = await db.user.findUnique({
    where: { username },
    include: {
      deals: true,
      comments: true,
    },
  });

  const userDeals = await db.deal.findMany({
    where: { userId: user.id },
    include: {
      user: true,
    },
  });

  const memberSince = user.createdAt.toDateString();
  const numDeals = user.deals.length;
  const numComments = user.comments.length;

  if (!username) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full px-4 mt-20">
      <div className="relative flex flex-col items-center p-10 bg-stone-100 rounded-xl w-full">
        <div className="bg-gray-300 absolute top-[-25%] text-3xl flex items-center justify-center rounded-full h-20 w-20">
          <span>{username.charAt(0).toUpperCase()}</span>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <span className="text-center text-xl">{username}</span>
          <span>Member since {memberSince}</span>
          <div className="flex gap-2 w-full justify-around">
            <span>{numDeals} deals </span>
            <span>{numComments} comments</span>
          </div>
        </div>
      </div>
      <div className="flex justify-around bg-stone-100 rounded-xl mt-4 pb-2 w-full">
        <div>
          <DealsList deals={userDeals} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
