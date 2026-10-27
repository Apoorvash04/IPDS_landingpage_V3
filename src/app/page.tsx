import Preloader from '@/components/layout/Preloader';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';
import WhyUs from '@/components/sections/WhyUs';
import Faq from '@/components/sections/Faq';
import Cta from '@/components/sections/Cta';
import Contact from '@/components/sections/Contact';
import { FaqJsonLd } from '@/components/seo/JsonLd';

export default function HomePage() {
  return (
    <>
      <Preloader />
      <FaqJsonLd />
      <Hero />
      <About />
      <Services />
      <Process />
      <WhyUs />
      <Faq />
      <Cta />
      <Contact />
    </>
  );
}
