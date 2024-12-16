import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Use your API key here (replace with environment variable in production)
const apiKey = "AIzaSyC2SfdSwMvrjgT_lKrZXDc9Fz8VjJezb3w";

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(apiKey);

// Configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

// Set up generation configurations
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Function to run chat and log the result
const runChat = async (prompt) => {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);

    if (result && result.response && typeof result.response.text === "function") {
      // Ensure text() is a function and call it
      const text = result.response.text();
      console.log("API Response Text:", text); // Log resolved text
      return text; // Return the text content
    } else {
      console.warn("Unexpected response structure:", result);
      return "Unexpected response format.";
    }
  } catch (error) {
    console.error("Error during API call:", error);
    throw error; // Throw the error to handle it upstream
  }
 
};

export default runChat;