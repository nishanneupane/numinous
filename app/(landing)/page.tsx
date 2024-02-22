import Image from "next/image";
import React from "react";
import { checkSubscription } from "@/lib/subscription";
import NavItem from "./_components/nav-item";

function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      <main>
        <Hero />
      </main>
    </div>
  );
}

export default LandingPage;

const Hero = async () => {
  const isPro = await checkSubscription()
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-3 px-5 ">
      <div className="mx-4 mb-14 mt-6 flex flex-1 flex-col items-center text-start sm:mb-12 md:mb-32 md:mt-20">
        <h1 className="max-w-5xl text-2xl font-bold sm:text-4xl md:text-6xl">
          Create your personalized {" "}
          <span className="bg-gradient-to-t from-teal-400 to-blue-600 bg-clip-text text-transparent">
            {" "}
            AI Assistance{" "}
          </span>
        </h1>

        <p className="sm:text-md mt-5 max-w-2xl text-sm text-gray-500  md:text-base">
          Numinous is cutting-edge software that crafts personalized AI companions. These companions mimic human interaction, offering a
          conversational experience akin to chatting with the world&apos;s most popular and affluent individuals.
        </p>
        <NavItem isPro={isPro} />

      </div>

      <div className="flex items-center justify-center -mt-10 md:-mt-20">
        <Image
          src={"/demo.png"}
          width={600}
          height={500}
          alt="demo"
          className="object-contain dark:hidden"
        />
        <Image
          src={"/demo_black.png"}
          width={600}
          height={500}
          alt="demo"
          className="object-contain hidden dark:block"
        />
      </div>
    </div>
  );
};
