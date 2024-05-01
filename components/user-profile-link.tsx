"use client";

import Link from "next/link";

const UserProfileLink = ({ username }: { username: string }) => {
  return (
    <Link className="flex items-center gap-2" href={`profile/${username}`}>
      <div className="bg-gray-300 flex items-center justify-center rounded-full h-10 w-10">
        <span>{username.charAt(0).toUpperCase()}</span>
      </div>
      <span>{username}</span>
    </Link>
  );
};

export default UserProfileLink;
