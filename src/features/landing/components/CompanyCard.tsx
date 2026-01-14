import StarIcon from "@/src/components/icons/StarIcon";
import Image from "next/image";

function CompanyCard({
  name,
  category,
  rank,
  image,
}: {
  name: string;
  category: string;
  rank: string;
  image: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white h-31 p-6 shadow-sm">
      <Image
        src={image}
        alt={name}
        width={80}
        height={80}
        className="rounded-full bg-[#ccc] object-cover"
      />

      <div>
        <p className="font-semibold">{name}</p>

        <div className="mt-2 flex items-center gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <StarIcon key={i} />
          ))}
          <StarIcon muted />
          <span className="ml-2 text-sm text-zinc-700">8.0</span>
        </div>

        <p className="mt-2 text-sm text-zinc-600">
          {rank} i kategorien <span className="text-blue-600">{category}</span>
        </p>
      </div>
    </div>
  );
}

export default CompanyCard;
