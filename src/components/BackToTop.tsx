import { useEffect, useState } from "react";

const BackToTop: React.FC<{}> = ({}) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="border-round fixed bottom-2 h-8 w-8 self-center rounded-full bg-[#8338EC] text-3xl font-bold text-white opacity-80 hover:opacity-100 md:bottom-4 md:right-4 md:h-10 md:w-10 md:pt-1.5 md:text-4xl pt-1"
        >
          ^
        </button>
      )}
    </>
  );
};

export default BackToTop;
