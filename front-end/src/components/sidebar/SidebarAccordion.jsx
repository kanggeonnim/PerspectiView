import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { GradientPicker } from "./GradientPicker";

export default function SidebarAccordion({ plot, stories }) {
  const [background, setBackground] = useState(
    "linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)"
  );
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="w-full">
        <AccordionTrigger className="flex flex-row-reverse justify-end w-full ">
          <div className="flex justify-around w-full">
            <div className="w-1/2 text-left truncate text-nowrap">{plot}</div>
            <GradientPicker
              className=""
              background={background}
              setBackground={setBackground}
            />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div>
            {stories.data.map((story, index) => (
              <div key={index}>{story.storyTitle}</div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
