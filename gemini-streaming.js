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
let shouldExit = false; // Flag to indicate exit request

const run = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
        history: [],
        generationConfig: {
            maxOutputTokens: 57,
        },
    });

    const askAndResponse = () => {
        if (!isAwaitingResponse) {
            rl.question('You: ', async (msg) => {
                if (msg.toLowerCase() === "exit") {
                    shouldExit = true; // Set the exit flag
                    if (!isAwaitingResponse) { // Exit immediately if no response in progress
                        rl.close();
                    }
                } else {
                    isAwaitingResponse = true;

                    try {
                        const result = await chat.sendMessageStream(msg);
                        let text = "";
                        for await (const chunk of result.stream) {
                            const chunkText = await chunk.text(); 
                            console.log("AI: ", chunkText);
                            text += chunkText;
                        }
                        
                        isAwaitingResponse = false;

                        if (shouldExit) { // Exit if the flag was set during the response
                            rl.close();
                        } else {
                            askAndResponse();
                        }

                    } catch (e) {
                        console.error("Error: ", e);
                        isAwaitingResponse = false;
                    }
                }
            });
        } else {
            console.log('Please wait for the current response to complete.');
        }
    };

    askAndResponse(); // Start the conversation loop
};

run();
