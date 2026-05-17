import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export interface AnalysisResult {
  sentiment: "positive" | "negative" | "neutral";
  score: number;
  label: string;
  suggestions: string[];
}

export async function analyzeSentiment(text: string): Promise<AnalysisResult> {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    أنت خبير في تحليل المشاعر للنصوص العربية. 
    قم بتحليل النص المقدم وحدد ما إذا كان إيجابياً (positive)، سلبياً (negative)، أو محايداً (neutral).
    قم أيضاً بتقديم 3-5 اقتراحات لردود ذكية ومناسبة للموقف باللغة العربية.
    يجب أن تكون الردود طبيعية وودودة إذا كان النص إيجابياً، ومتعاطفة إذا كان سلبياً، وعملية إذا كان محايداً.
    أخرج النتيجة بتنسيق JSON حصراً.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [{ parts: [{ text: `حلل هذا النص: "${text}"` }] }],
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sentiment: {
            type: Type.STRING,
            enum: ["positive", "negative", "neutral"],
          },
          score: {
            type: Type.NUMBER,
            description: "صحة التحليل من 0 إلى 1",
          },
          label: {
            type: Type.STRING,
            description: "تسمية المشاعر بالعربية (إيجابي، سلبي، محايد)",
          },
          suggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "قائمة من الردود المقترحة",
          },
        },
        required: ["sentiment", "score", "label", "suggestions"],
      },
    },
  });

  const result = JSON.parse(response.text || "{}");
  return result as AnalysisResult;
}
