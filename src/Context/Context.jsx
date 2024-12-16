import React, { createContext, useState } from "react";
import runChat from "../Configuration/Gemini";

// Create and export the context
export const Context = createContext();

// Context Provider Component
const ContextProvider = (props) => {
  const [input, setInput] = useState(""); // User input state
  const [recentPrompt, setRecentPrompt] = useState(""); // Most recent prompt
  const [prevPrompts, setPrevPrompts] = useState([]); // List of previous prompts
  const [showResult, setShowResult] = useState(false); // Control result display
  const [loading, setLoading] = useState(false); // Loading state
  const [resultData, setResultData] = useState(""); // Response data

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
        setResultData(prev=>prev+nextWord);
    },75*index)
  }

  const newChat = () => {
    setLoading(false)
    setShowResult(false)
  }

  // API call function
const onSent = async (prompt) => {
    console.log('Sending prompt:', prompt);
    if (!prompt.trim()) return; // Skip empty input

    setLoading(true); // Show loading spinner
    // setShowResult(false); // Hide the result initially
    setPrevPrompts((prev) => [...prev, input]); // Save current prompt in history

    // Clear previous resultData before sending new request
    setResultData("");

    try {
      const response = await runChat(prompt);
      let responseArray = response.split("**");
      let newResponse = "";

      // Process response to wrap parts with <b> tags
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }

      let newResponse2 = newResponse.split("*").join("</br>"); // Replace "*" with line breaks
      console.log("Response from API:", response);

      // Split the response into words and simulate typing
      let newResponseArray = newResponse2.split(" ");
      let finalResponse = "";
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        finalResponse += nextWord + " ";
        delayPara(i, nextWord + " ", finalResponse); // Call delay function to update text
      }

      // Save the most recent prompt
      setRecentPrompt(prompt);
      setShowResult(true); // Show the result after finishing
    } catch (error) {
      console.error("Error while calling API:", error);
    } finally {
      setTimeout(()=>setLoading(false),1000); // Hide loading spinner after response
    }
};


  return (
    <Context.Provider
      value={{
        input,
        setInput,
        recentPrompt,
        prevPrompts,
        showResult,
        loading,
        resultData,
        onSent,
        newChat,
        setRecentPrompt,
        setPrevPrompts,
        setShowResult,
        setLoading,
        setResultData
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
