import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GradientPicker } from "./GradientPicker";
import { XCircle } from "lucide-react";
import { useState } from "react";

export default function Plot({ plotId, plotName, stories, plotColor, setPlotColor }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    console.log("leave");
    setIsHovered(false);
  };
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={plotName}>
        <AccordionTrigger
          className="flex flex-row-reverse justify-end py-3"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center justify-around w-full">
            <div className="w-1/2 font-bold text-left truncate text-nowrap">{plotName}</div>
            <div className="flex items-center">
              <GradientPicker plotColor={plotColor} setPlotColor={setPlotColor} />
              {isHovered ? (
                <XCircle
                  size={15}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(plotId);
                  }}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div>
            {stories.map((story, index) => (
              <div
                key={index}
                className="px-3 py-1 my-1 text-xs font-bold transition-all rounded hover:bg-primary-light hover:text-accent-foreground focus:bg-primary-accent-light focus:text-accent-foreground focus:outline-none"
              >
                {story.storyTitle}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
