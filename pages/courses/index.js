import React from "react";
import Link from "next/link";

function Index() {
  const x = [
    { id: 1, title: "React", shortname: "react" },
    { id: 2, title: "Node", shortname: "node" },
    { id: 3, title: "Nextjs", shortname: "next-js" },
    { id: 4, title: "Ex. Js", shortname: "ex-js" },
    { id: 5, title: "Pwa", shortname: "pwa" },
    { id: 6, title: "Canvas", shortname: "canvas" },
  ];

  return (
    <>
      <h1>All Courses Page</h1>
      <hr />

      <ul>
        {x.map((y) => (
          <li>
            <Link href={`/courses/${y.shortname}`}>{y.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Index;
