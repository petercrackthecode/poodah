import { ReactNode } from "react";
import Head from "next/head";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Head>
        <title>Poodah</title>
        <link rel="icon" href="/poodah.ico" />
        <meta
          name="description"
          content="Poodah is a multi-channel chat application."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </div>
  );
}
