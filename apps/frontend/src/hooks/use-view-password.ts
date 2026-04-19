import { useRef, useState } from "react";

export function useViewPassword() {
  const fieldRef = useRef<HTMLInputElement>(null);
  const [eyeOpen, setEyeOpen] = useState(false);

  const toggleViewPassword = () => {
    if (fieldRef.current) {
      fieldRef.current.type = fieldRef.current.type === "password" ? "text" : "password";
      setEyeOpen((old) => !old);
    }
  };

  return {
    fieldRef,
    eyeOpen,
    toggleViewPassword,
  };
}