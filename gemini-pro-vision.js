import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
console.log(process.env.API_KEY);
import * as fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const fileToGeneratePart = (path, mimeType)=>{
    return{
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString('base64'),
            mimeType,
        },
    };
};

const run = async()=>{
    const model = genAI.getGenerativeModel({model: "gemini-pro-vision"});
    const prompt = "What image is it?";
    const imageParts =[fileToGeneratePart('baked_goods_1.jpg', 'image/jpeg')] 
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
};

run();

