import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <hr />
      <ul>
        <li>
          {/* <a href="/courses">Courses</a> */}
          <Link href="/courses">Courses</Link>
        </li>
      </ul>
    </>
  );
}
