import Link from "next/link";

function Home() {
  return (
    <>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/next">
            <a>Go to next page</a>
          </Link>
        </p>
        <img src="/images/422242.jpg" />
      </div>
    </>
  );
}

export default Home;
