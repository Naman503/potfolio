"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the 3D background to avoid SSR issues
const Global3DBackground = dynamic(() => import("./Global3DBackground"), {
  ssr: false,
});

const Global3DBackgroundWrapper = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Only render the 3D background on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <Global3DBackground />;
};

export default Global3DBackgroundWrapper;
