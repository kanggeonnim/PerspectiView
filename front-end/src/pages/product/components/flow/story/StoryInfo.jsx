import { ArrowLeft } from "lucide-react";
import RefContents from "./RefContents";
import StoryDetail from "./StoryDetail";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function StoryInfo() {
  const navigate = useNavigate();

  const { setIsHeaderVisible } = useOutletContext();
  const params = useParams();
  useEffect(() => {
    setIsHeaderVisible(false);

    return () => setIsHeaderVisible(true);
  }, [setIsHeaderVisible]);

  return (
    <div className="flex flex-col items-center justify-between w-full h-full border rounded shadow-md">
      <div className="w-full h-[5%]">
        <ArrowLeft className="mt-5 ml-5 " onClick={() => navigate(-1)} />
      </div>
      <div className="flex items-center justify-center w-full h-[90%] p-4 ">
        <StoryDetail />
        <RefContents />
      </div>
    </div>
  );
}
