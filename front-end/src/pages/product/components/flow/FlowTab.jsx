import useNodeStore from "@/store/useNodeStore";
import FlowCard from "./FlowCard";
import { useProductStore } from "@/store/useProductStore";
import { useEffect } from "react";

export default function FlowTab() {
  const { product } = useProductStore();
  const { setNodes, addStory } = useNodeStore();

  return (
    <div className="flex items-center justify-center w-full h-full p-2 mt-2 border rounded shadow-md">
      <FlowCard />
    </div>
  );
}
