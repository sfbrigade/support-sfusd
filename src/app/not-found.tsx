import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-600">
          School Not Found
        </h1>
        <p className="text-gray-500">
          The requested school could not be found.
        </p>
        <Link
          href="/map"
          className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Browse Schools
        </Link>
      </div>
    </div>
  );
}