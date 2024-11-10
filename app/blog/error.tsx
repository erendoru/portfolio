"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto py-10 text-center">
      <h2 className="text-2xl font-bold mb-4">Bir şeyler yanlış gitti!</h2>
      <button
        onClick={() => reset()}
        className="bg-[#d1d2d5] hover:text-white text-white px-4 py-2 rounded"
      >
        Tekrar Dene
      </button>
    </div>
  );
}
