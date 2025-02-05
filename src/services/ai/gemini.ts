import { ScrapedContent } from '../scraper/types';

const GEMINI_API_KEY = 'AIzaSyDA26mjaud_hxBV58i24-Y6RgFK_yEciUw';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: {
        text?: string;
      }[];
    };
  }[];
}

async function callGeminiAPI(prompt: string): Promise<string> {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data: GeminiResponse = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      throw new Error('No content generated by Gemini API');
    }

    return text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

export async function enhanceWithGemini(content: ScrapedContent): Promise<ScrapedContent> {
  try {
    // Generate an enhanced title
    const titlePrompt = `
      Enhance this title for an AI/tech article while maintaining its core meaning:
      "${content.title}"
      Requirements:
      - Keep it under 60 characters
      - Make it engaging and SEO-friendly
      - Focus on clarity and impact
      Return only the enhanced title without quotes or additional text.
    `;
    const enhancedTitle = await callGeminiAPI(titlePrompt);

    // Generate an enhanced description
    const descriptionPrompt = `
      Create a compelling meta description for this content:
      "${content.content.slice(0, 500)}..."
      Requirements:
      - Length: 150-160 characters
      - Include key points and value proposition
      - Use active voice and clear language
      Return only the description without quotes or additional text.
    `;
    const enhancedDescription = await callGeminiAPI(descriptionPrompt);

    // Generate relevant tags
    const tagsPrompt = `
      Generate relevant tags for this content:
      "${content.content.slice(0, 1000)}..."
      Requirements:
      - 5-8 tags
      - Focus on AI, technology, and industry terms
      - Include specific technologies or methodologies mentioned
      Return only the tags separated by commas, without additional text.
    `;
    const tagsResponse = await callGeminiAPI(tagsPrompt);
    const enhancedTags = tagsResponse
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    // Structure the content
    const contentPrompt = `
      Restructure this content into a well-organized article:
      "${content.content}"
      Required sections:
      1. Overview
      2. Key Points (as bullet points)
      3. Detailed Analysis
      4. Implications and Applications
      5. Conclusion
      
      Requirements:
      - Use Markdown formatting
      - Keep the original information and facts
      - Add clear section headers
      - Ensure logical flow between sections
      Return the formatted content using Markdown.
    `;
    const enhancedContent = await callGeminiAPI(contentPrompt);

    return {
      ...content,
      title: enhancedTitle.trim() || content.title,
      description: enhancedDescription.trim() || content.description,
      content: enhancedContent.trim() || content.content,
      tags: [...new Set([...content.tags, ...enhancedTags])].slice(0, 10)
    };
  } catch (error) {
    console.error('Error enhancing content with Gemini:', error);
    // Fallback to original content if enhancement fails
    return content;
  }
}