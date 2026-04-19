import { useRef } from "react";

export function useViewPassword() {
  const fieldRef = useRef<HTMLInputElement>(null);

  const toggleViewPassword = () => {
    if (fieldRef.current) {
      fieldRef.current.type = fieldRef.current.type === "password" ? "text" : "password";
    }
  };

  return {
    fieldRef,
    toggleViewPassword,
  };
}