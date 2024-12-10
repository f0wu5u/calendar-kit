import { useState } from "react";

export const useViewAsToggle = () => {
  const [viewAs, setViewAs] = useState<"month" | "week">("month");

  const onPress = () =>
    setViewAs((prevState) => (prevState === "month" ? "week" : "month"));

  return { viewAs, onPress };
};
