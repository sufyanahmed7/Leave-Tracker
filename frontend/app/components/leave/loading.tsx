export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-pulse space-y-8">
      {/* ====== Summary Card Skeleton ====== */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
        <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto mb-3"></div>
        <div className="h-10 bg-gray-300 rounded w-2/4 mx-auto mb-4"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
        <div className="flex justify-center mt-2">
          <div className="h-9 bg-gray-300 rounded w-28"></div>
        </div>
      </div>

      {/* ====== Leave Cards Skeleton Grid ====== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((_, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <div className="h-5 bg-gray-300 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6 mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
            <div className="flex gap-3 mt-4">
              <div className="h-9 bg-gray-300 rounded w-1/2"></div>
              <div className="h-9 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
