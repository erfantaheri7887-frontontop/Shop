import { useRouter } from "next/router";
import React from "react";

function SingleCourse() {
  const route = useRouter();

  return <h1>errf: {route.query.x}</h1>;
}

export default SingleCourse;
