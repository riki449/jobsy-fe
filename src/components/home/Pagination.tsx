import Button from "../common/Button";

// components/Pagination.tsx
interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <Button
        variant="secondary"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        ← Forrige
      </Button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          return (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={`h-8 w-8 rounded-md cursor-pointer text-sm ${
                p === page
                  ? "bg-green-100 text-green-700"
                  : "text-zinc-600 hover:bg-zinc-100"
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>

      <Button
        variant="secondary"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Næste →
      </Button>
    </div>
  );
}
