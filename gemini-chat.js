import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
console.log(process.env.API_KEY);

import * as fs from 'fs'; // fs module is still needed for file operations (if you use them later)
import * as readline from 'readline'; // Import readline module separately
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const rl = readline.createInterface({ // Use readline directly
    input: process.stdin,
    output: process.stdout,
});


const run = async()=>{
    const model = genAI.getGenerativeModel({model: "gemini-pro"});
    const chat = model.startChat({
        history: [], // starts with empty chat
        generationConfig: {
            maxOutputTokens: 57,
        },
    });
    const askAndResponse = async()=>{
        rl.question('You: ', async (msg)=>{
            if (msg.toLowerCase() === 'exit'){
                rl.close;
            }else{
                const result = await chat.sendMessage(msg);
                const response = result.response;
                const text = response.text();
                console.log(`AI: ${text}`);
                askAndResponse();
            };
        });
    };
    askAndResponse(); // starts the conversation loop
};

run();