import { StarRating } from "@/src/components/icons/StarRating";
import Image from "next/image";

function CompanyCard({
  name,
  category,
  rank,
  image,
  rating = 0,
}: {
  name: string;
  category: string;
  rank: string;
  image: string;
  rating: number;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white h-31 p-6 shadow-sm">
      <Image
        src={image}
        alt={name}
        width={80}
        height={80}
        className="rounded-full bg-[#ccc] object-cover overflow-hidden"
      />

      <div>
        <p className="font-semibold">{name}</p>

        <div className="mt-2 flex items-center gap-1">
          <StarRating value={rating} />
          <span className="ml-2 text-sm text-zinc-700">{rating}</span>
        </div>

        <p className="mt-2 text-sm text-zinc-600">
          {rank} i kategorien <span className="text-blue-600">{category}</span>
        </p>
      </div>
    </div>
  );
}

export default CompanyCard;
