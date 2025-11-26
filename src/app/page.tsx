"use client";

import ClientOnly from "./components/ClientOnly";
import Home from "./Home";


export default function HomePage() {
  return (
    <ClientOnly>
      <Home />
    </ClientOnly>
  );
}



