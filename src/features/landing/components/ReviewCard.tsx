import StarIcon from "@/src/components/icons/StarIcon";

function ReviewCard({
  name,
  company,
  task,
  text,
}: {
  name: string;
  company: string;
  task: string;
  text: string;
}) {
  return (
    <div className="rounded-xl bg-white h-31 p-6 shadow-sm">
      <p className="text-sm text-zinc-800">
        <span className="font-semibold">{name}</span> skrev en bedømmelse af{" "}
        <span className="font-semibold">{company}</span>
      </p>

      <p className="mt-1 text-sm text-zinc-600">
        for opgaven <span className="font-semibold">{task}</span>
      </p>

      <div className="flex flex-row gap-4 items-center">
        <div className="mt-3 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>

        <p className="mt-2 text-sm text-zinc-600 italic">{text}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
