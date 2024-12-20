export function LoadingSkeleton() {
  return (
    <div className="py-12 flex mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-wrap">
      <div className="w-full md:w-2/3">
        <div className="h-12 w-full md:w-1/3 bg-slate-400 rounded mb-12 animate-pulse" />
        <div className="h-12 w-full md:w-2/3 bg-slate-400 rounded mb-12 animate-pulse" />
      </div>
      <div className="w-full md:w-1/3 flex justify-end">
        <div className="h-96 w-96 bg-slate-400 rounded animate-pulse" />
      </div>
    </div>
  );
}
