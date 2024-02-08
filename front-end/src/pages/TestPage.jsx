import useFshadowQueryModule from "@/hook/useFshadowQueryModule";
import { useFshadow } from "@/store/useFshadow";
import React, { useEffect } from "react";

function TestPage({ teamId, productId }) {
  const { fshadowData, getFshadowIsSuccess } = useFshadowQueryModule(
    teamId,
    productId
  );
  const { fshadows, setFshadows } = useFshadow((state) => ({
    fshadows: state.fshadows,
    setFshadows: state.setFshadows,
  }));

  useEffect(() => {
    if (getFshadowIsSuccess) {
      setFshadows(fshadowData);
    }
  }, [fshadowData, getFshadowIsSuccess, setFshadows]);
  console.log(fshadows);
  return <div></div>;
}

export default TestPage;
