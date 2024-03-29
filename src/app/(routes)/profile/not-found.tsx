import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-muted-foreground">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          Account not found
        </h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground">
          Sorry, we couldn&apos;t find the account you&apos;re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="#"
            className="rounded-md  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back
          </Link>
          <Link href="#" className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}