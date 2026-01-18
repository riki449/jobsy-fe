import StarIcon from "@/src/components/icons/StarIcon";

interface StarRatingProps {
  value: number; // 0–5, supports .5
}

export function StarRating({ value }: StarRatingProps) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <StarIcon key={`full-${i}`} />
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <span className="relative inline-block h-5 w-5">
          {/* background (muted) */}
          <StarIcon muted />

          {/* foreground (half filled) */}
          <span className="absolute inset-0 w-1/2 overflow-hidden">
            <StarIcon />
          </span>
        </span>
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <StarIcon key={`empty-${i}`} muted />
      ))}
    </div>
  );
}
