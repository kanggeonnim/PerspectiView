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
    <Accordion type="single" collapsible className="w-full border border-blue-500">
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex flex-row-reverse justify-end w-full border border-black-500">
          {/* 여기다 */}
          <div className="flex justify-between border border-green-500 ">
            <div className="w-1/5 text-left truncate border border-purple-500 text-nowrap">{plot}</div>
            <GradientPicker
              className="border border-red-500 "
              background={background}
              setBackground={setBackground}
            />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {/* <div>
            {stories.data.map((story, index) => (
              <div key={index}>{story.storyTitle}</div>
            ))}
          </div> */}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
