import FeaturedEbooksSection from "@/Components/FeaturedEbooksSection";
import GenresSection from "@/Components/GenresSection";
import Hero from "@/Components/Hero";
import TopWritersSection from "@/Components/TopWritersSection";


export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedEbooksSection />
      <GenresSection />
      <TopWritersSection />
    </div>
  );
}