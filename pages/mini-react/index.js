import Head from "next/head";
import MiniReactApp from "../../components/mini-react/MiniReactApp";

export default function MiniReactPage() {
  return (
    <>
      <Head>
        <title>Mini React App</title>
      </Head>
      <main style={{ maxWidth: 840, margin: "40px auto", padding: "0 16px" }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>Mini React App</h1>
        <p style={{ marginTop: 8, color: "#555" }}>
          یک پروژه کوچیک React داخل مسیر <code>/mini-react</code>
        </p>
        <MiniReactApp />
      </main>
    </>
  );
}

