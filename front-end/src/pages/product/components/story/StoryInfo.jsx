import RefTab from "./RefTab";
import StoryDetail from "./StoryDetail";

export default function StoryInfo() {
  return (
    <div className="flex items-center justify-center w-full h-full p-4 ">
      <RefTab />
      <StoryDetail />
    </div>
  );
}
