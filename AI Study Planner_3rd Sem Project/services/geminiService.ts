
import { GoogleGenAI } from "@google/genai";
import type { CieData, LabSubmission, Skill } from '../types';

// Data structure for the personalized study plan prompt
interface StudentAcademicData {
  targetCGPA: string;
  skills: Skill[];
  cieData: CieData;
  deadlines: LabSubmission[];
}

export const generateResponse = async (prompt: string, studentData?: StudentAcademicData): Promise<string> => {
  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    console.error("API_KEY environment variable not set.");
    return "The application is not configured correctly. Missing API Key.";
  }
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  let finalPrompt = `You are an AI study planner for a student. Be helpful, concise, and academic in your tone. If relevant to the user's query, suggest 1-2 high-quality online resources (articles, videos, documentation) and format them as markdown links like [Resource Title](URL). User prompt: "${prompt}"`;
  
  if (studentData) {
    // A more detailed prompt for generating a study plan
    finalPrompt = `You are an expert academic advisor AI. A student has requested a personalized study plan. Here is their data:

**Academic Profile:**
- Target CGPA: ${studentData.targetCGPA}
- Current Skills (Proficiency out of 100): ${studentData.skills.map(s => `\n  - ${s.subject}: ${s.A}`).join('')}
- Recent Performance (CIE Marks for ${studentData.cieData.semester}): ${studentData.cieData.subjects.map(s => `\n  - ${s.name}: ${Object.entries(s.marks).map(([k, v]) => `${k}: ${v}`).join(', ')}`).join('')}
- Upcoming Deadlines: ${studentData.deadlines.map(d => `\n  - ${d.name} (${d.deadline})`).join('')}

**Task:**
Based on the data provided, create a concise, actionable, and personalized 7-day study plan for the user.
1.  Identify weak subjects based on lower skill proficiency (e.g., AI/ML, Web Dev) and CIE marks.
2.  Prioritize subjects with upcoming deadlines.
3.  Allocate study time realistically across the 7 days (e.g., Day 1, Day 2...).
4.  Suggest specific topics or tasks for each study session (e.g., "Review React Hooks", "Practice SQL Joins").
5.  Format the output in clear, easy-to-read markdown. Use headings (e.g., "**Day 1: Focus on Web Dev**"), bullet points, and bold text for emphasis.
6.  Start with a brief, encouraging summary of their current standing and what they should focus on.
7.  The user's original prompt was: "${prompt}". Use this for additional context if needed.
8.  At the end of the plan, include a "Suggested Resources" section. Provide 2-3 relevant online resources (links to high-quality articles, tutorials, or videos) for the identified weak subjects. Format them as markdown links: [Resource Title](URL).`;
  }

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: finalPrompt,
        config: {
            temperature: 0.7,
            topP: 1,
            topK: 1,
        }
    });
    // FIX: Handled potential undefined response from the API to match the function's return type.
    return response.text ?? "An error occurred while communicating with the AI. Please try again.";
  } catch (error) {
    console.error("Gemini API error:", error);
    if (error instanceof Error && error.message.toLowerCase().includes('quota')) {
        return "It looks like the API quota has been exceeded. This can happen with free-tier keys. Please check your Google AI Studio account for more details or try again later.";
    }
    return "An error occurred while communicating with the AI. Please try again.";
  }
};
