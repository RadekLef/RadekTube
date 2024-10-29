import {
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from "react";
import { SidebarContext } from "./useSidebarContext";

type SidebarProviderProps = {
  children: ReactNode;
};

const isScreenSmall = () => window.innerWidth < 1024;

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isLargeSidebarOpen, setIsLargeSidebarOpen] = useState(true);
  const [isSmallSidebarOpen, setIsSmallSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (!isScreenSmall()) setIsSmallSidebarOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggle = useCallback(() => {
    if (isScreenSmall()) {
      setIsSmallSidebarOpen((prev) => !prev);
    } else {
      setIsLargeSidebarOpen((prev) => !prev);
    }
  }, []);

  const close = useCallback(() => {
    if (isScreenSmall()) {
      setIsSmallSidebarOpen(false);
    } else {
      setIsLargeSidebarOpen(false);
    }
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isLargeOpen: isLargeSidebarOpen,
        isSmallOpen: isSmallSidebarOpen,
        toggle,
        close,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
