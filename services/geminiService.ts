import { GoogleGenAI, Type } from "@google/genai";

// The vite.config.ts file ensures process.env.API_KEY is populated during the build
const apiKey = process.env.API_KEY;

// Fallback logic in case the key is missing (prevents app crash)
const ai = new GoogleGenAI({ apiKey: apiKey || "dummy-key" });
const modelId = "gemini-2.5-flash";

export const generateRiddle = async (): Promise<{ riddle: string; hint: string }> => {
  if (!apiKey) {
    console.warn("API Key is missing. Using fallback content.");
    return { 
      riddle: "I have icing but no snow. I have candles but no light bulb. What am I?", 
      hint: "Yummy!" 
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: "Generate a cute, rhyming riddle where the answer is related to 'Sister', 'Birthday', or 'Cake'. Keep it short (4 lines max) and playful. Output JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riddle: { type: Type.STRING },
            hint: { type: Type.STRING }
          },
          required: ["riddle", "hint"]
        }
      }
    });
    
    // Clean up potential markdown formatting (e.g. ```json ... ```)
    const text = response.text?.replace(/```json|```/g, '').trim();
    
    if (!text) return { riddle: "I have icing but no snow. I have candles but no light bulb. What am I?", hint: "Yummy!" };
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return { 
      riddle: "We grew up together, we fight and we play. I'm the one annoying you on your special day. Who am I?", 
      hint: "Your Sibling!" 
    };
  }
};

export const generateBirthdayWish = async (sisterName: string = "Sis"): Promise<string> => {
  if (!apiKey) return "Happy Birthday! You are the best sister anyone could ask for. (API Key missing, but my love is real!)";

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Write a short, heartwarming, and slightly funny birthday poem for my sister named ${sisterName}. Mention shared memories, being the better sibling, and love. Max 60 words.`,
    });
    return response.text || "Happy Birthday to the best sister in the world! (Even though I'm the favorite child).";
  } catch (error) {
    return "Happy Birthday! You are the best sister anyone could ask for. Here is to another year of laughing at our own jokes and keeping each other sane!";
  }
};

export const verifyEmojiSelection = async (emojis: string[]): Promise<string> => {
   if (!apiKey) return "Wow, really? That's how you see me? Okay, fair enough.";

   try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `My sister described me with these emojis: ${emojis.join(' ')}. Give a sassy, funny 1-sentence reaction to her choice.`,
    });
    return response.text || "Wow, really? That's how you see me? Okay, fair enough.";
  } catch (error) {
    return "Interesting choice of emojis... I'll allow it.";
  }
}
