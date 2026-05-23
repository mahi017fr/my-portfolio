import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

export function TypingCodeBlock() {
  const [charCount, setCharCount] = useState(0);

  // Define total characters to type
  const totalChars = 142;

  useEffect(() => {
    const interval = setInterval(() => {
      setCharCount((prev) => {
        if (prev >= totalChars) {
          // Restart typing loop after a brief pause of 3 seconds
          clearInterval(interval);
          setTimeout(() => {
            setCharCount(0);
          }, 3000);
          return totalChars;
        }
        return prev + 1;
      });
    }, 45); // highly realistic speed

    return () => clearInterval(interval);
  }, [charCount]);

  // Helper to slice text for a given line based on overall current character budget
  const getLineProgress = (lineText: string, lineStartIdx: number) => {
    if (charCount < lineStartIdx) {
      return { typed: "", isTypingHere: false };
    }
    const lineCharBudget = charCount - lineStartIdx;
    if (lineCharBudget >= lineText.length) {
      return { typed: lineText, isTypingHere: false };
    }
    return { typed: lineText.slice(0, lineCharBudget), isTypingHere: true };
  };

  // Line Text definitions
  const l1Text = 'const developer = {';
  const l2Text = '  name: "MAHE",';
  const l3Text = '  focus: ["Web3", "DeFi", "Privacy"],';
  const l4Text = '  stack: ["React", "TypeScript", "Node"],';
  const l5Text = '  goal: "Make trust visible"';
  const l6Text = '}';

  // Cumulative sums of characters
  const l1Start = 0;
  const l2Start = l1Text.length; // 19
  const l3Start = l2Start + l2Text.length; // 19 + 15 = 34
  const l4Start = l3Start + l3Text.length; // 34 + 37 = 71
  const l5Start = l4Start + l4Text.length; // 71 + 41 = 112
  const l6Start = l5Start + l5Text.length; // 112 + 28 = 140

  const l1 = getLineProgress(l1Text, l1Start);
  const l2 = getLineProgress(l2Text, l2Start);
  const l3 = getLineProgress(l3Text, l3Start);
  const l4 = getLineProgress(l4Text, l4Start);
  const l5 = getLineProgress(l5Text, l5Start);
  const l6 = getLineProgress(l6Text, l6Start);

  // Helper function to render a syntax-highlighted line based on currently typed slice
  const renderLine1 = (text: string, isActive: boolean) => {
    // 'const developer = {'
    // const: text--[#c586c0]
    // developer: text--[#4fc1ff]
    // =: text-neutral-400
    // {: text-neutral-300
    let renderedParts = [];
    let currentIdx = 0;

    if (text.startsWith("const")) {
      const sliced = text.slice(0, 5);
      renderedParts.push(<span key="const" className="text-[#c586c0]">{sliced}</span>);
      currentIdx += sliced.length;
    }
    
    if (text.length > 5 && text.slice(5).startsWith(" ")) {
      renderedParts.push(<span key="s1"> </span>);
      currentIdx += 1;
    }

    if (text.length > 6) {
      const slicedDev = text.slice(6, 15);
      renderedParts.push(<span key="dev" className="text-[#4fc1ff]">{slicedDev}</span>);
      currentIdx += slicedDev.length;
    }

    if (text.length > 15 && text.slice(15).startsWith(" = {")) {
      const slicedEq = text.slice(15);
      renderedParts.push(
        <span key="eq">
          <span className="text-neutral-400">{slicedEq[0]}</span>
          <span className="text-neutral-400">{slicedEq[1]}</span>
          <span className="text-neutral-300">{slicedEq[2]}</span>
        </span>
      );
    } else if (text.length > 15) {
      const slicedEq = text.slice(15);
      renderedParts.push(<span key="eq" className="text-neutral-400">{slicedEq}</span>);
    }

    return (
      <div className="min-h-[1.5rem] flex items-center">
        {renderedParts}
        {isActive && <span className="w-1.5 h-4 bg-brand-amber animate-pulse ml-0.5 inline-block" />}
      </div>
    );
  };

  const renderLine2 = (text: string, isActive: boolean) => {
    // '  name: "MAHE",'
    // spaces: whitespace
    // name: text-[#9cdcfe]
    // : : text-neutral-400
    // "MAHE": text-[#ce9178]
    // ,: text-neutral-400
    let renderedParts = [];
    
    if (text.startsWith("  ")) {
      renderedParts.push(<span key="sp" className="inline-block w-4" />);
    }

    const contentText = text.slice(2);
    if (contentText.length > 0) {
      if (contentText.startsWith("name")) {
        const sliced = contentText.slice(0, 4);
        renderedParts.push(<span key="name" className="text-[#9cdcfe]">{sliced}</span>);
      }
    }

    if (contentText.length > 4) {
      const rawAfterName = contentText.slice(4);
      if (rawAfterName.startsWith(": ")) {
        renderedParts.push(<span key="colon" className="text-neutral-400">: </span>);
      } else if (rawAfterName.startsWith(":")) {
        renderedParts.push(<span key="colon" className="text-neutral-400">:</span>);
      }
    }

    if (contentText.length > 6) {
      const rawValChar = contentText.slice(6);
      renderedParts.push(<span key="val" className="text-[#ce9178]">{rawValChar}</span>);
    }

    return (
      <div className="min-h-[1.5rem] flex items-center">
        {renderedParts}
        {isActive && <span className="w-1.5 h-4 bg-brand-amber animate-pulse ml-0.5 inline-block" />}
      </div>
    );
  };

  const renderLine3 = (text: string, isActive: boolean) => {
    // '  focus: ["Web3", "DeFi", "Privacy"],'
    let renderedParts = [];
    
    if (text.startsWith("  ")) {
      renderedParts.push(<span key="sp" className="inline-block w-4" />);
    }

    const contentText = text.slice(2);
    if (contentText.length > 0) {
      if (contentText.startsWith("focus")) {
        const sliced = contentText.slice(0, 5);
        renderedParts.push(<span key="focus" className="text-[#9cdcfe]">{sliced}</span>);
      }
    }

    if (contentText.length > 5) {
      const rawAfterFocus = contentText.slice(5);
      if (rawAfterFocus.startsWith(": ")) {
        renderedParts.push(<span key="colon" className="text-neutral-400">: </span>);
      } else if (rawAfterFocus.startsWith(":")) {
        renderedParts.push(<span key="colon" className="text-neutral-400">:</span>);
      }
    }

    if (contentText.length > 7) {
      const rawArray = contentText.slice(7);
      if (rawArray.startsWith("[")) {
        renderedParts.push(<span key="bracket1" className="text-neutral-300">[</span>);
        const arrayItems = rawArray.slice(1);
        renderedParts.push(<span key="arr-content" className="text-[#ce9178]">{arrayItems}</span>);
      } else {
        renderedParts.push(<span key="arr-fallback" className="text-[#ce9178]">{rawArray}</span>);
      }
    }

    return (
      <div className="min-h-[1.5rem] flex items-center">
        {renderedParts}
        {isActive && <span className="w-1.5 h-4 bg-brand-amber animate-pulse ml-0.5 inline-block" />}
      </div>
    );
  };

  const renderLine4 = (text: string, isActive: boolean) => {
    // '  stack: ["React", "TypeScript", "Node"],'
    let renderedParts = [];
    
    if (text.startsWith("  ")) {
      renderedParts.push(<span key="sp" className="inline-block w-4" />);
    }

    const contentText = text.slice(2);
    if (contentText.length > 0) {
      if (contentText.startsWith("stack")) {
        const sliced = contentText.slice(0, 5);
        renderedParts.push(<span key="stack" className="text-[#9cdcfe]">{sliced}</span>);
      }
    }

    if (contentText.length > 5) {
      const rawAfterStack = contentText.slice(5);
      if (rawAfterStack.startsWith(": ")) {
        renderedParts.push(<span key="colon" className="text-neutral-400">: </span>);
      } else if (rawAfterStack.startsWith(":")) {
        renderedParts.push(<span key="colon" className="text-neutral-400">:</span>);
      }
    }

    if (contentText.length > 7) {
      const rawArray = contentText.slice(7);
      if (rawArray.startsWith("[")) {
        renderedParts.push(<span key="bracket1" className="text-neutral-300">[</span>);
        const arrayItems = rawArray.slice(1);
        renderedParts.push(<span key="arr-content" className="text-[#ce9178]">{arrayItems}</span>);
      } else {
        renderedParts.push(<span key="arr-fallback" className="text-[#ce9178]">{rawArray}</span>);
      }
    }

    return (
      <div className="min-h-[1.5rem] flex items-center">
        {renderedParts}
        {isActive && <span className="w-1.5 h-4 bg-brand-amber animate-pulse ml-0.5 inline-block" />}
      </div>
    );
  };

  const renderLine5 = (text: string, isActive: boolean) => {
    // '  goal: "Make trust visible"'
    let renderedParts = [];
    
    if (text.startsWith("  ")) {
      renderedParts.push(<span key="sp" className="inline-block w-4" />);
    }

    const contentText = text.slice(2);
    if (contentText.length > 0) {
      if (contentText.startsWith("goal")) {
        const sliced = contentText.slice(0, 4);
        renderedParts.push(<span key="goal" className="text-[#9cdcfe]">{sliced}</span>);
      }
    }

    if (contentText.length > 4) {
      const rawAfterGoal = contentText.slice(4);
      if (rawAfterGoal.startsWith(": ")) {
        renderedParts.push(<span key="colon" className="text-neutral-400">: </span>);
      } else if (rawAfterGoal.startsWith(":")) {
        renderedParts.push(<span key="colon" className="text-neutral-400">:</span>);
      }
    }

    if (contentText.length > 6) {
      const rawVal = contentText.slice(6);
      renderedParts.push(<span key="val" className="text-[#ce9178]">{rawVal}</span>);
    }

    return (
      <div className="min-h-[1.5rem] flex items-center">
        {renderedParts}
        {isActive && <span className="w-1.5 h-4 bg-brand-amber animate-pulse ml-0.5 inline-block" />}
      </div>
    );
  };

  const renderLine6 = (text: string, isActive: boolean) => {
    // '}'
    return (
      <div className="min-h-[1.5rem] flex items-center">
        <span className="text-neutral-300">{text}</span>
        {isActive && <span className="w-1.5 h-4 bg-brand-amber animate-pulse ml-0.5 inline-block" />}
      </div>
    );
  };

  return (
    <div className="font-mono text-xs md:text-sm leading-relaxed text-neutral-300 overflow-x-auto whitespace-pre rounded-2xl bg-neutral-950/50 p-6 md:p-8 border border-white/5">
      <div className="flex gap-4 md:gap-6">
        {/* Line Numbers */}
        <div className="text-neutral-600 select-none text-right pr-4 border-r border-white/5 flex flex-col gap-0.5 font-medium">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
        </div>
        
        {/* Code Output */}
        <div className="flex-1 flex flex-col gap-0.5 tracking-wide">
          {l1.typed !== "" && renderLine1(l1.typed, l1.isTypingHere)}
          {l2.typed !== "" && renderLine2(l2.typed, l2.isTypingHere)}
          {l3.typed !== "" && renderLine3(l3.typed, l3.isTypingHere)}
          {l4.typed !== "" && renderLine4(l4.typed, l4.isTypingHere)}
          {l5.typed !== "" && renderLine5(l5.typed, l5.isTypingHere)}
          {l6.typed !== "" && renderLine6(l6.typed, l6.isTypingHere)}
        </div>
      </div>
    </div>
  );
}
