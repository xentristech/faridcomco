import { AudienceProvider } from "@/components/audience-context";
import { Nav } from "@/components/nav";
import { HeroFarid } from "@/components/hero-farid";
import { VCard } from "@/components/vcard";
import { WhatIDo } from "@/components/what-i-do";
import { Aida } from "@/components/aida";
import { Projects } from "@/components/projects";
import { IdeaDemo } from "@/components/idea-demo";
import { Credentials } from "@/components/credentials";
import { Trajectory } from "@/components/trajectory";
import { Contact } from "@/components/contact";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { AskAI } from "@/components/ask-ai";

export default function Home() {
  return (
    <AudienceProvider>
      <Nav />
      <main id="main">
        <HeroFarid />
        <VCard />
        <WhatIDo />
        <Aida />
        <Projects />
        <IdeaDemo />
        <Credentials />
        <Trajectory />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <AskAI />
    </AudienceProvider>
  );
}
