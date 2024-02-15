import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GradientPicker } from "./GradientPicker";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { ConfirmModal } from "./ConfirmModal";

export default function Plot({ plotId = undefined, plotName, stories, plotColor, setPlotColor }) {
  const [isHovered, setIsHovered] = useState(false);
  const { teamId, productId } = useParams();

  const handleMouseEnter = (event) => {
    event.stopPropagation();
    setIsHovered(true);
  };

  const handleMouseLeave = (event) => {
    event.stopPropagation();
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
          <div className="relative flex items-center justify-around w-[75%] ">
            <div className="w-1/2 font-bold text-left truncate text-nowrap">{plotName}</div>
            <div className="flex items-center">
              <GradientPicker plotId={plotId} plotColor={plotColor} setPlotColor={setPlotColor} />
              {isHovered ? (
                <ConfirmModal teamId={teamId} productId={productId} plotId={plotId} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div>
            {stories?.map((story, index) => (
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
