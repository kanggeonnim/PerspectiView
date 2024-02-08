import useFshadowQueryModule from "@/hook/useFshadowQueryModule";
import { useFshadow } from "@/store/useFshadow";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// {
//   teamId, productId;
// }
function TestPage() {
  let { teamId, productId } = useParams();
  console.log(teamId, productId);
  const { fshadowData, getFshadowIsSuccess } = useFshadowQueryModule(
    teamId,
    productId
  );
  console.log(fshadowData, getFshadowIsSuccess);
  const { fshadows, setFshadows } = useFshadow((state) => ({
    fshadows: state.fshadows,
    setFshadows: state.setFshadows,
  }));

  useEffect(() => {
    if (getFshadowIsSuccess) {
      setFshadows(fshadowData);
    }
  }, [fshadowData, getFshadowIsSuccess, setFshadows]);
  // console.log(fshadows);
  return <div></div>;
}

export default TestPage;
