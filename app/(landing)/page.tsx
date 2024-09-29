import Image from "next/image";
import React from "react";
import { checkSubscription } from "@/lib/subscription";
import NavItem from "./_components/nav-item";
import { Bot, UserCircle2, MessageSquare, Zap, Shield, Globe } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900">
      <main className="container mx-auto px-4 py-16">
        <Hero />
      </main>
    </div>
  );
}

export default LandingPage;

const Hero = async () => {
  const isPro = await checkSubscription()
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
      <div className="flex-1 space-y-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
          AI Companion <br />
          <span className="text-indigo-600 dark:text-indigo-300">Reimagined</span>
        </h1>

        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl">
          Experience the future of conversation with Numinous AI. Dive into a world where AI companions bring your ideas to life.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <NavItem isPro={isPro} />
          <button className="px-4 py-1 bg-indigo-600 text-white dark:bg-white dark:text-indigo-600 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-100 transition duration-300 flex items-center justify-center gap-1 text-sm font-medium shadow-sm"><MessageSquare className="w-4 h-4" />Try Demo</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
          {[
            { icon: Bot, title: "AI-Powered", desc: "Advanced language models" },
            { icon: UserCircle2, title: "Personalized", desc: "Tailored to you" },
            { icon: Zap, title: "Lightning Fast", desc: "Instant responses" },
            { icon: Shield, title: "Fort Knox Secure", desc: "Your data, protected" },
            { icon: Globe, title: "Always On", desc: "24/7 availability" },
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-3 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md">
              <feature.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-300" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 mt-12 lg:mt-0">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-600 blur-3xl opacity-30"></div>
          <Image
            src="/demo.png"
            width={600}
            height={500}
            alt="Numinous AI Demo"
            className="relative rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};
