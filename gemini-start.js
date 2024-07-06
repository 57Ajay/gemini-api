
import { GoogleGenerativeAI, GoogleGenerativeAIFetchError } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // Explicitly load from .env.local


const genAI = new GoogleGenerativeAI(process.env.API_KEY);
console.log(process.env.API_KEY);
const run = async () => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = "Write a rhythmic sonnet about Alexander the great on his victory over Persian Empire";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

  } catch (error) {
    if (error instanceof GoogleGenerativeAIFetchError) {
      console.error(`[GoogleGenerativeAI Error]: ${error.message}`);
      if (error.errorDetails && error.errorDetails.length > 0) {
        console.error("Error Details:", error.errorDetails);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
};

run();
