export function StarRating({ rating }: { rating: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < rating;
        return (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className={[
              "h-[1.125rem] w-[1.125rem]",
              filled ? "text-[rgba(var(--rose),1)]" : "text-[rgb(var(--stroke))]",
            ].join(" ")}
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 17.3l-5.4 3.2 1.5-6.1-4.7-4 6.2-.5L12 4l2.4 5.9 6.2.5-4.7 4 1.5 6.1z" />
          </svg>
        );
      })}
    </div>
  );
}
