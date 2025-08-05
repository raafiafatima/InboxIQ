import React from "react";
import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <section className="h-screen grid place-content-center gap-2 bg-[#156874] px-8 py-24 text-[#EDE6E6]">
    {/* <p className='relative block overflow-hidden whitespace-nowrap text-9xl font-bold line-clamp-1 '>INBOXIQ</p> */}
        <FlipText line={1.2} sizeClass="text-9xl">INBOXIQ</FlipText>
        <div className="grid place-content-center mt-1">
          <p className="text-2xl text-[#EDE6E6] font-semibold ">
            {" "}
            Smarter Replies, Faster Decisions
          </p>
        </div>
        <div className="grid place-content-center">
          <button
            className="mt-12 hover: cursor-pointer text-[#156874] font-medium text-xl group relative w-full flex justify-center py-2 px-5 border border-transparent rounded-full bg-[#EDE6E6] hover:bg-[#dad3d3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EDE6E6]"
            onClick={() => {
              navigate("login");
            }}
          >
            <FlipText line={1.2} sizeClass="text-xl">CONTINUE</FlipText>
          </button>
        </div>
      </section>
    </>
  );
}
export default Home;

const DURATION = 0.25;
const STAGGER = 0.025;
const FlipText = ({ children , sizeClass, line}) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={`relative block overflow-hidden whitespace-nowrap ${sizeClass} font-bold  `}
      style={{
        lineHeight: line,
      }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.span>
  );
};

const NeumorphismButton = ({ click }) => {
  return (
    <button
      className={`
        px-4 py-2 rounded-full 
        flex items-center gap-2 
        text-white
        shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.5),_5px_5px_10px_rgba(0,_0,_0,_0.2)]
        
        transition-all

        hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
        hover:text-white
    `}
      onClick={click}
    >
      <span>Get Started</span>
    </button>
  );
};
