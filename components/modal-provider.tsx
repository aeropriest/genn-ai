"use client";

import { useEffect, useState } from "react";

import { WaitModal } from "@/components/waiting-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <WaitModal />
    </>
  );
};
