import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import usePlotQueryModule from "@/hook/usePlotQueryModule";
import { Paintbrush } from "lucide-react";

export function GradientPicker({ plotColor, setPlotColor, type }) {
  const solids = [
    "#E2E2E2",
    "#ff75c3",
    "#ffa647",
    "#ffe83f",
    "#9fff5b",
    "#70e2ff",
    "#cd93ff",
    "#09203f",
    "#D1180B",
  ];
  // const { updatePlot } = usePlotQueryModule(teamId, productId, plotId);
  return (
    <Popover>
      <PopoverTrigger onClick={(e) => e.stopPropagation()} asChild>
        <div className="flex items-center mx-2">
          {plotColor ? (
            <div
              className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
              style={{ background: plotColor }}
            ></div>
          ) : (
            <Paintbrush className="w-4 h-4" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-32 h-32 p-1">
        <Tabs defaultValue="solid" className="w-full ">
          <TabsContent value="solid" className="flex flex-wrap justify-between mt-0">
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="w-6 h-6 rounded-md cursor-pointer active:scale-105 m-0.5"
                onClick={(e) => {
                  e.stopPropagation();
                  type === "add" ? setPlotColor(s) : console.log("teamId, productId, plotId");
                  // updatePlot();
                }}
              />
            ))}
          </TabsContent>
        </Tabs>

        <Input
          id="custom"
          value={plotColor}
          className="h-8 col-span-2 my-1"
          onChange={(e) => setPlotColor(e.currentTarget.value)}
          onClick={(e) => e.stopPropagation()}
        />
      </PopoverContent>
    </Popover>
  );
}
