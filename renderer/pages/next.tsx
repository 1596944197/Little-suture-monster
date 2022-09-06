import Link from "next/link";

function Next() {
  return (
    <>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/home">
            <a>Go to home page</a>
          </Link>
        </p>
      </div>
    </>
  );
}

export default Next;
