
import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Gemini API features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateProductDescription = async (product: Product): Promise<string> => {
    if (!process.env.API_KEY) {
        return Promise.resolve("The AI description generator is currently unavailable. Please check the API key configuration.");
    }

    const prompt = `Generate a captivating, marketing-focused product description for an e-commerce store. Be creative and enthusiastic. The product is:
    - Name: ${product.name}
    - Category: ${product.category}
    - Price: $${product.price.toFixed(2)}
    - Base Description: ${product.description}
    
    Write a single paragraph, around 50-70 words long. Highlight its key features in a way that excites the customer. Do not use markdown or headings.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating description with Gemini:", error);
        return "We couldn't generate an AI description at this time. Please try again later.";
    }
};
