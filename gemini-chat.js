import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
// console.log(process.env.API_KEY);
import * as readline from 'readline'; 
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let isAwaitingResponse = false;
let shouldExit = false; 

const run = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
        history: [], 
        generationConfig: {
            maxOutputTokens: 57,
        },
    });
    
    const askAndResponse = async () => {
        if (!isAwaitingResponse) { // Prevent multiple questions
            rl.question('You: ', async (msg) => {
                if (msg.toLowerCase() === 'exit') {
                    shouldExit = true; 
                    if (!isAwaitingResponse) { 
                        rl.close(); 
                    } 
                } else {
                    isAwaitingResponse = true; 
                    try {
                        const result = await chat.sendMessage(msg);
                        const response = result.response;
                        const text = response.text();
                        console.log(`AI: ${text}`);
                        
                        isAwaitingResponse = false;
                        
                        if (shouldExit) { 
                            rl.close(); 
                        } else {
                            askAndResponse();
                        }

                    } catch (error) {
                        console.error("Error:", error);
                        isAwaitingResponse = false; // Reset flag in case of errors
                    }
                }
            });
        }
    };

    askAndResponse(); // Start the conversation loop
};

run();
