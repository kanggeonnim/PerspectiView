import React, { useRef } from "react";
import { Panel, useReactFlow, getNodesBounds, getViewportForBounds } from "reactflow";
import { toJpeg, toPng } from "html-to-image";
import { Button } from "@/components/ui/button";

// function downloadImage(dataUrl) {
//   const a = document.createElement("a");

//   // a.setAttribute("download", "reactflow.png");
//   a.setAttribute("href", dataUrl);
//   a.click();
// }

const imageWidth = 1024;
const imageHeight = 768;

const DownloadButton = () => {
  const { getNodes } = useReactFlow();

  const onClick = () => {
    // const nodesBounds = getNodesBounds(getNodes());
    // const transform = getViewportForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);

    // console.log(viewportRef.current);

    toJpeg(document.querySelector(".react-flow__viewport"), {
      backgroundColor: "#fff",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then(downloadImage);
  };

  return (
    <Panel position="">
      <Button className="font-bold download-btn" variant="destructive" onClick={onClick}>
        이미지로 저장
      </Button>
    </Panel>
  );
};

export default DownloadButton;
