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
          className="border-round fixed bottom-4 right-4 h-10 w-10 rounded-full bg-[#8338EC] pt-1.5 text-4xl font-bold text-white"
        >
          ^
        </button>
      )}
    </>
  );
};

export default BackToTop;
