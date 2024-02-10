import useNodeStore from "@/store/useNodeStore";
import FlowCard from "./FlowCard";
import { useProductStore } from "@/store/useProductStore";
import { useEffect } from "react";

export default function FlowTab() {
  const { product } = useProductStore();
  console.log(product);
  const { addStory } = useNodeStore();

  useEffect(() => {
    if (product && product.plots) {
      product.plots.map((plot, plotIndex) => {
        plot.stories.map((story, storyIndex) => {
          console.log(story, plotIndex, storyIndex, plot.plotColor);
          addStory(story, plotIndex, storyIndex, plot.plotColor);
        });
      });
    }
  }, [product, addStory]);
  return (
    <div className="flex items-center justify-center w-full h-full p-2 mt-2 border rounded shadow-md">
      <FlowCard />
    </div>
  );
}
