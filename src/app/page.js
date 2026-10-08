import Hero from "@/components/home/Hero";
import ToolCards from "@/components/home/ToolCards";
import FeatureStrip from "@/components/home/FeatureStrip";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      <Hero />
      <ToolCards />
      <FeatureStrip />
    </div>
  );
}