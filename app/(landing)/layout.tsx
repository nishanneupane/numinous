import React from "react";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import { checkSubscription } from "@/lib/subscription";


async function LandingLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const isPro=await checkSubscription();
  return (
    <section className="flex h-full flex-col overflow-x-clip">
      <Navbar isPro={isPro} />

      <div className="flex-grow">{children}</div>

      <Footer />
    </section>
  );
}

export default LandingLayout;
