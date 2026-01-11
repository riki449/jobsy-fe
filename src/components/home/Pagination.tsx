import Button from "../common/Button";

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  const getPages = () => {
    const pages: (number | string)[] = [];

    // Always show first page
    pages.push(1);

    // Show left ellipsis if needed
    if (page > 3) {
      pages.push("...");
    }

    // Show current page neighbors
    for (
      let p = Math.max(2, page - 1);
      p <= Math.min(totalPages - 1, page + 1);
      p++
    ) {
      pages.push(p);
    }

    // Show right ellipsis if needed
    if (page < totalPages - 2) {
      pages.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

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
        {getPages().map((p, i) =>
          typeof p === "number" ? (
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
          ) : (
            <span key={`ellipsis-${i}`} className="px-2 text-zinc-400">
              …
            </span>
          )
        )}
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
