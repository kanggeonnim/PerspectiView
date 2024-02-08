import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";

export default function CharTagAdd() {
  const initialTags = ["YES", "NOPE"];

  const [tags, setTags] = useState(initialTags);
  const removeTags = (indexToRemove) => {
    const filter = tags.filter((el, index) => index !== indexToRemove);
    setTags(filter);
  };

  const addTags = (event) => {
    const inputVal = event.target.value;
    if (event.key === "Enter" && inputVal !== "" && !tags.includes(inputVal)) {
      setTags([...tags, inputVal]);
      event.target.value = "";
    }
  };

  return (
    <div className="flex min-h-12 w-max border border-green-400 justify-start rounded-md">
      <ul className="flex flex-wrap p-0 m-2">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <Badge variant="off" className="tag-title">
              {tag}
              <Cross1Icon
                className="tag-close-icon ml-1"
                onClick={() => removeTags(index)}
              />
            </Badge>
          </li>
        ))}
      </ul>
      <input
        className="flex-1 border-none h-12 text-sm px-2 focus:outline-none"
        type="text"
        onKeyUp={addTags}
        placeholder="태그를 추가 하시오."
      />
    </div>
  );
}
