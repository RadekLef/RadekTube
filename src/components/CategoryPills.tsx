import { ChevronLeft, ChevronRight } from "lucide-react";
import Buttons from "./Button";
import { useEffect, useRef, useState, useCallback } from "react";

type CategoryPillProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TRANSLATE_AMOUNT = 200;

export default function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillProps) {
  const [translate, setTranslate] = useState(0);
  const [isLeftChevronVisible, setIsLeftChevronVisible] = useState(false);
  const [isRightChevronVisible, setIsRightChevronVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateVisibility = useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      setIsLeftChevronVisible(translate > 0);
      setIsRightChevronVisible(translate + container.clientWidth < container.scrollWidth);
    }
  }, [translate]);

  useEffect(() => {
    if (containerRef.current == null) return;

    const observer = new ResizeObserver(updateVisibility);
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [categories, translate, updateVisibility]);

  const handleLeftClick = () => {
    setTranslate((prevTranslate) => {
      const newTranslate = prevTranslate - TRANSLATE_AMOUNT;
      return newTranslate <= 0 ? 0 : newTranslate;
    });
  };

  const handleRightClick = () => {
    setTranslate((prevTranslate) => {
      if (!containerRef.current) return prevTranslate;

      const newTranslate = prevTranslate + TRANSLATE_AMOUNT;
      const containerWidth = containerRef.current.clientWidth;
      const scrollWidth = containerRef.current.scrollWidth;

      return newTranslate + containerWidth >= scrollWidth
        ? scrollWidth - containerWidth
        : newTranslate;
    });
  };

  return (
    <div ref={containerRef} className="overflow-x-hidden relative">
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((category) => (
          <Buttons
            key={category}
            onClick={() => onSelect(category)}
            variant={selectedCategory === category ? "dark" : "default"}
            className="py-1 px-3 rounded-lg whitespace-nowrap"
          >
            {category}
          </Buttons>
        ))}
      </div>
      {isLeftChevronVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Buttons
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={handleLeftClick}
          >
            <ChevronLeft />
          </Buttons>
        </div>
      )}
      {isRightChevronVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Buttons
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={handleRightClick}
          >
            <ChevronRight />
          </Buttons>
        </div>
      )}
    </div>
  );
}
