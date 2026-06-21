import Banner from "@/components/home/Banner";
import Stats from "@/components/home/Stats";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TopLocations from "@/components/home/TopLocations";
import Reviews from "@/components/home/Reviews";

export default function Home() {
  return (
    <>
      <Banner />
      <Stats />
      <FeaturedProperties />
      <WhyChooseUs />
      <TopLocations />
      <Reviews />
    </>
  );
}