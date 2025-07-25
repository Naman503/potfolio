"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the 3D background to avoid SSR issues
const Global3DBackground = dynamic(() => import("./Global3DBackground"), {
  ssr: false,
});

interface Global3DBackgroundWrapperProps {
  children?: React.ReactNode;
}

const Global3DBackgroundWrapper: React.FC<Global3DBackgroundWrapperProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  // Only render the 3D background on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Global3DBackground />
      {children}
    </>
  );
};

export default Global3DBackgroundWrapper;
