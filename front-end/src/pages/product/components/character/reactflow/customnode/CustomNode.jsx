import { useState } from "react";
import { Handle, Position } from "reactflow";
import { Button } from "@/components/ui/button";
import { MinusCircle, MoreHorizontal } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

export default function CustomNode({ id, data, isConnectable }) {

  // const navigate = useNavigate();

  const [labelInput, setLabelInput] = useState("");

  const { teamId, productId } = useParams();

  const handleLabelInputChange = (event) => {
    setLabelInput(event.target.value);
  };

  // const [isHovered, setIsHovered] = useState(false);

  // const handleMouseEnter = () => {
  //   setIsHovered(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  // };

  // const onNodeClick = () => {
  //   console.log(id);
  //   // navigate(`/team/${teamId}/product/${productId}/story/${id}`);
  // };
  // console.log(data)
  return (
    <>
      <div
        className="flex flex-col w-28 h-28 border-2 items-center justify-center rounded-full z-20"
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        // onClick={() => onNodeClick()}
      >
        
        {/* <div
          className={`absolute m-1 top-0 right-0  ${
            isHovered ? "visible" : "hidden"
          }`}
        >
          <Button
            size="sm"
            className="h-full p-1 rounded-full bg-secondary-accent"
            onClick={() => {}}
          >
            <MinusCircle size={15} className="mx-auto text-foreground" />
          </Button>
        </div> */}
        <img src={data.image} alt="No Image" />

        <div className="flex justify-center">
          {/* 핸들 블록 */}
          <Handle
            type="target"
            position={Position.Bottom}
            id="a"
            isConnectable={isConnectable}
            className="!left-12 hover:!bg-red-500 !bg-transparent !border-0 !w-3 !h-3 z-10"
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="b"
            isConnectable={isConnectable}
            className=" !left-16 hover:!bg-blue-500 !bg-transparent !border-0 !w-3 !h-3 z-10"
          />
          <Handle
            type="target"
            position={Position.Right}
            id="c"
            isConnectable={isConnectable}
            className="!top-16 hover:!bg-red-500 !bg-transparent !border-0 !w-3 !h-3 z-10"
          />
          <Handle
            type="source"
            position={Position.Right}
            id="d"
            isConnectable={isConnectable}
            className="!top-12 hover:!bg-blue-500 !bg-transparent !border-0 !w-3 !h-3 z-10"
          />
          <Handle
            type="source"
            position={Position.Left}
            id="e"
            isConnectable={isConnectable}
            className="!top-16 hover:!bg-blue-500 !bg-transparent !border-0 !w-3 !h-3 z-10"
          />
          <Handle
            type="target"
            position={Position.Left}
            id="f"
            isConnectable={isConnectable}
            className="!top-12 hover:!bg-red-500 !bg-transparent !border-0 !w-3 !h-3 z-10"
          />
          <Handle
            type="source"
            position={Position.Top}
            id="g"
            isConnectable={isConnectable}
            className="!left-12 hover:!bg-blue-500 !bg-transparent !border-0 !w-3 !h-3 z-10"
          />
          <Handle
            type="target"
            position={Position.Top}
            id="h"
            isConnectable={isConnectable}
            className="!left-16 hover:!bg-red-500 !bg-transparent !border-0 !w-3 !h-3 z-10"
          />
        </div>
      </div>
      <div className=" text-sm text-center">
        {data.name}
      </div>
    </>
  );
}
