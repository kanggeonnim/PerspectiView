import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { GradientPicker } from "./GradientPicker";

export default function PlotList({ plotName, stories }) {
  const [background, setBackground] = useState(
    "linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)"
  );
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={plotName}>
        <AccordionTrigger className="flex flex-row-reverse justify-end py-3">
          <div className="flex justify-around w-full">
            <div className="w-1/2 font-bold text-left truncate text-nowrap">{plotName}</div>
            <GradientPicker className="" background={background} setBackground={setBackground} />
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
