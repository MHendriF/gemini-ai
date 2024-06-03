"use client";

import React, { createContext, useState } from "react";

export const Context = createContext();
const ContextProvider = ({ children }: any) => {
  const [theme, setTheme] = useState("dark");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [recentPrompts, setRecentPrompts] = useState("");
  const [displayResult, setDisplayResult] = useState(false);
  const [prevPrompts, setPrevPrompts] = useState([]);

  const paragraphDelay = (index, newWord) => {
    setTimeout(() => {
      setResult((prev) => prev + newWord);
    }, 70 * index);
  };

  const submit = async (prompt) => {
    setLoading(true);
    setResult("");
    setDisplayResult(true);
    setRecentPrompts(input);

    if (input && prompt) {
      setPrevPrompts((prev) => [...prev, input]);
    }
    const response = input ? await runChat(input) : await runChat(prompt);
    const boldResponse = response.split("**");
    let newArray = "";
    for (let i = 0; i < boldResponse.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newArray += boldResponse[i];
      } else {
        newArray += "<b>" + boldResponse[i] + "</b>";
      }
    }
    let newRes = newArray.split("*").join("</br>");
    let newRes2 = newRes.split(" ");

    for (let i = 0; i < newRes2.length; i++) {
      const newWord = newRes2[i];
      paragraphDelay(i, newWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  const toggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const contextValue = {
    theme,
    toggle,
    submit,
    setInput,
    input,
    result,
    loading,
    displayResult,
    recentPrompts,
    setRecentPrompts,
    setPrevPrompts,
    prevPrompts,
    setDisplayResult,
  };

  return (
    <Context.Provider value={contextValue}>
      <div className={theme}>{children}</div>
    </Context.Provider>
  );
};

export default ContextProvider;
