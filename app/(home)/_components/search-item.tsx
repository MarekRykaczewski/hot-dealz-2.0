import { Deal } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const SearchItem = ({ deal }: { deal: Deal }) => {
  const percentOff = Math.round(
    ((deal.nextBestPrice! - deal.price!) / deal.nextBestPrice!) * 100
  );

  return (
    <div className="p-3 w-full hover:bg-slate-200">
      <Link href={`/deals/${deal.id}`} className="flex justify-start">
        <div className="relative bg-gray-100 border mr-3 w-16 h-16 p-1 rounded-lg flex items-center justify-center gap-3">
          {deal.imageUrls[0] && (
            <Image
              src={deal.imageUrls[0]}
              fill
              objectFit="contain"
              alt="Deal Image"
            />
          )}
        </div>
        <div className="flex flex-col w-full gap-2 justify-between">
          <div className="flex gap-1 text-sm font-semibold text-slate-800 text-ellipsis">
            <span className="text-center text-orange-500">{deal.score}</span>
            <span>{deal.title}</span>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold text-sm text-orange-500">
              {deal.price}zł
            </p>
            <p className="line-through text-sm text-gray-500">
              {deal.nextBestPrice}zł
            </p>
            {deal.price && deal.nextBestPrice && (
              <p className="text-sm text-black">-{percentOff}%</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchItem;
