const { GoogleGenAI } = require("@google/genai");
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = {
  type: "object",
  properties: {
    matchScore: {
      type: "number",
      description: "A score between 0 and 100 indicating how well the candidate's profile matches the job description",
    },
    technicalQuestions: {
      type: "array",
      description: "Technical questions that can be asked in the interview along with their intention and how to answer them",
      items: {
        type: "object",
        properties: {
          question: { type: "string", description: "The technical question can be asked in the interview" },
          intention: { type: "string", description: "The intention of interviewer behind asking this question" },
          answer: { type: "string", description: "How to answer this question, what points to cover, what approach to take etc." },
        },
        required: ["question", "intention", "answer"],
      },
    },
    behavioralQuestions: {
      type: "array",
      description: "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
      items: {
        type: "object",
        properties: {
          question: { type: "string", description: "The behavioral question can be asked in the interview" },
          intention: { type: "string", description: "The intention of interviewer behind asking this question" },
          answer: { type: "string", description: "How to answer this question, what points to cover, what approach to take etc." },
        },
        required: ["question", "intention", "answer"],
      },
    },
    skillGaps: {
      type: "array",
      description: "List of skill gaps in the candidate's profile along with their severity",
      items: {
        type: "object",
        properties: {
          skill: { type: "string", description: "The skill which the candidate is lacking" },
          severity: { type: "string", enum: ["low", "medium", "high"], description: "The severity of this skill gap" },
        },
        required: ["skill", "severity"],
      },
    },
    preparationPlan: {
      type: "array",
      description: "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
      items: {
        type: "object",
        properties: {
          day: { type: "integer", description: "The day number in the preparation plan, starting from 1" },
          focus: { type: "string", description: "The main focus of this day in the preparation plan" },
          tasks: {
            type: "array",
            items: { type: "string" },
            description: "List of tasks to be done on this day to follow the preparation plan",
          },
        },
        required: ["day", "focus", "tasks"],
      },
    },
    title: {
      type: "string",
      description: "The title of the job for which the interview report is generated",
    },
  },
  required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan", "title"],
};

const resumePdfSchema = {
  type: "object",
  properties: {
    html: {
      type: "string",
      description: "The HTML content of the resume which can be converted to PDF using any library like puppeteer",
    },
  },
  required: ["html"],
};

async function generateInterviewReport({ resume, selfDescription, jobDescription }, retries = 3) {
  const prompt = `Generate an interview report for a candidate with the following details:
  Resume: ${resume}
  Self Description: ${selfDescription}
  Job Description: ${jobDescription}`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: interviewReportSchema,
        },
      });

      const data = JSON.parse(response.text);
      console.log(JSON.stringify(data, null, 2));
      return data;
    } catch (error) {
      if ((error.status === 503 || error.status === 429) && attempt < retries) {
        const delay = attempt * 2000;
        console.warn(`[Gemini API ${error.status}] High demand. Retrying (${attempt}/${retries}) in ${delay / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error("Gemini API Error:", error.message || error);
        throw error;
      }
    }
  }
}

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage"
    ]
  });

  try {
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    return await page.pdf({
      format: "A4",
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "15mm",
        right: "15mm",
      },
    });
  } finally {
    await browser.close();
  }
}

async function generateResumePdf({ resume, selfDescription, jobDescription }, retries = 3) {
  const prompt = `
You are an expert technical resume writer and visual designer. Generate a tailored, single-page resume based on the candidate details and target job description:

Candidate Resume: ${resume}
Candidate Self-Description: ${selfDescription}
Job Description: ${jobDescription}

STRICT SPECIFICATIONS:
1. HARD ONE-PAGE CONSTRAINT: The generated HTML document MUST fit perfectly onto a single A4 page with zero overflow and zero trailing blank space.
2. CSS RESET: The embedded <style> must include:
   * { box-sizing: border-box; }
   body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; color: #1e293b; line-height: 1.45; }
   Do NOT set margin or padding on the body tag; print margins are handled externally.
3. FIXED TYPOGRAPHIC HIERARCHY:
   - Candidate Name: 24px (bold, centered or left-aligned with contact line directly underneath)
   - Contact Info / Links: 10px (color: #475569)
   - Section Titles: 13px (bold, uppercase, letter-spacing: 0.5px, border-bottom: 1.5px solid #0f766e, margin-bottom: 8px)
   - Job Titles / Degrees: 12px (semi-bold, color: #0f172a)
   - Company / University / Dates: 10.5px (color: #475569)
   - Bullet Points & Body Copy: 10.5px (color: #1e293b, line-height: 1.45)
   Do NOT scale font sizes up or down beyond these values.
4. BALANCED VERTICAL FILLING:
   - To fill the A4 page harmoniously without altering font sizes, adjust content depth:
     * If candidate details are brief: Provide 3 to 4 detailed, impact-oriented bullet points per role/project (Google XYZ formula: Accomplished [X] as measured by [Y] by doing [Z]), and use 18px to 22px margin-bottom between major sections.
     * If candidate details are extensive: Provide 2 to 3 concise, high-impact bullet points and use 12px to 14px margin-bottom between major sections.
5. ATS OPTIMIZATION:
   - Use standard semantic sections: Summary, Technical Skills, Work Experience, Projects, Education.
   - Categorize skills clearly (e.g., Languages, Frameworks, Databases, Tools).
   - Integrate relevant keywords naturally from the Job Description.

OUTPUT FORMAT:
Return a valid JSON object matching the schema with a single "html" key containing the complete <!DOCTYPE html> string.`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: resumePdfSchema,
        },
      });

      const jsonContent = JSON.parse(response.text);
      const pdfBuffer = await generatePdfFromHtml(jsonContent.html);
      return pdfBuffer;
    } catch (error) {
      if ((error.status === 503 || error.status === 429) && attempt < retries) {
        const delay = attempt * 2000;
        console.warn(`[Gemini API ${error.status}] High demand. Retrying (${attempt}/${retries}) in ${delay / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error("Resume PDF generation failed:", error);
        throw error;
      }
    }
  }
}

module.exports = { generateInterviewReport, generateResumePdf };