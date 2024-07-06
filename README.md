# Gemini API Example Project

This repository provides a simple example of how to interact with the Gemini Pro API to create a conversational AI chatbot.

## Features

- **Text-Based Chat:** Engage in a conversation with the Gemini Pro model using a command-line interface.
- **Error Handling:** Robust error handling to manage potential issues like invalid API keys or network problems.
- **Environment Variables:**  Securely store your API key in a `.env.local` file for easy configuration.
- **Streaming Output:** Receive responses in a streaming format for a more interactive experience. (Example code provided, but not implemented in the current version of `gemini-chat.js`)
## Chat Models
### gemini-chat:
- used for simple chat purpose, Supports Back and forth conversation but slow
### gemini-streaming:
- Similer to gemini-chat but much faster
### gemini-pro-vision:
- can Analyse Images
### gemini-start:
- Simplest model does not Support Back & Forth chat, biut good for learning about Gemini API

## Getting Started

1. **Prerequisites:**
   - Node.js (version 18 or higher)
   - Google Cloud Project with the Gemini Pro API enabled
   - Gemini Pro API Key

2. **Installation:**
   ```bash
   git clone https://github.com/57Ajay/gemini-api
   npm install

### Create a file .env.local and assign => API_KEY = Your_Google_Genmini_API_KEY 
- example: API_KEY = AIzaSyB8tOPW2-e9zO27tVt0tZJJmPH3x3Hn01s
