"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("2ff36f4f-0057-4f5f-a761-2b16dc93fbfd");
  }, []);

  return null;
};
