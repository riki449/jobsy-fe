function StarIcon({ muted }: { muted?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${muted ? "text-zinc-300" : "text-green-600"}`}
      fill="currentColor"
    >
      <path d="M12 17.3l6.18 3.7-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}
export default StarIcon;
