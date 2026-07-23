import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-start px-6 py-24 sm:py-32">
      <p className="num mb-6 font-mono text-6xl text-rule">404</p>
      <h1 className="display-lg mb-5">This page does not exist.</h1>
      <p className="mb-10 max-w-prose text-ash">
        The link is either out of date or was never right. The projects are all still where
        they should be.
      </p>
      <Link
        href="/"
        className="rounded-sm bg-iris px-5 py-2.5 font-mono text-sm text-void transition-opacity hover:opacity-85"
      >
        Back to the start
      </Link>
    </div>
  );
}
