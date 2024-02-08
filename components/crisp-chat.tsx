"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("15a4f3b1-c1ab-434b-b5f9-76876ccf37e6");
  }, []);

  return null;
};
