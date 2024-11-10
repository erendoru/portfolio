export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-6">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
