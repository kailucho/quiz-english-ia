// src/services/apiService.js
import OpenAI from "openai";
import QuestionModel from "../models/QuestionModel";
import JSON5 from "json5";
console.log({ apiKey: process.env["REACT_APP_OPENAI_API_KEY"] });
const client = new OpenAI({
  apiKey: process.env["REACT_APP_OPENAI_API_KEY"],
  dangerouslyAllowBrowser: true,
});

export const getQuestions = async (selectedUnit) => {
  const systemMessage = {
    role: "system",
    content: `You are an assistant that generates practical English exam questions to help users practice grammar and vocabulary.`,
  };

  const userMessage = {
    role: "user",
    content: `
    Based on the following **topics, vocabulary, and grammatical structures**, generate 10 multiple-choice fill-in-the-blank questions in English for an English exam. The questions should help practice language skills related to these topics.
    
    **Topics, Vocabulary, and Grammatical Structures:**
    
    ${selectedUnit.content}
    
    **Requirements:**
    - The questions should relate only to the provided topics and structures.
    - **Both the questions and options must be written in English.**
    - Each question should be a sentence with a blank space that the student needs to fill in.
    - Provide four answer options for each question, one of which is correct.
    - Incorrect options should be plausible and contextually related to the question.
    - **Do not include questions that discuss the content of the unit in a theoretical way.**
    - **Format:** Strict JSON.
    - **Structure:**
    
      [
        {
          "questionText": "She ____ a teacher at the local school.",
          "options": ["is", "are", "am", "be"],
          "correctAnswer": "is"
        },
        ...
      ]
    
    - Do not include explanations, additional text, or code block markers like \`\`\`.
    - Return only the JSON, unformatted, in a single line, without line breaks or unnecessary spaces.
    - Do not wrap the JSON in quotes.
        `,
  };

  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [systemMessage, userMessage],
      max_tokens: 1500,
      temperature: 0.7,
    });

    let textResponse = response.choices[0].message.content.trim();

    // Remover marcas de bloque de código y etiquetas de lenguaje
    textResponse = textResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Intentar parsear el JSON directamente
    let questionsData;
    try {
      questionsData = JSON5.parse(textResponse);
      console.log("Preguntas generadas:", questionsData);
    } catch (error) {
      // Si falla, verificar si es una cadena JSON escapada
      console.error("Error al parsear el JSON directamente:", error);

      // Intentar deserializar si es una cadena JSON escapada
      if (textResponse.startsWith('"') && textResponse.endsWith('"')) {
        // Remover las comillas iniciales y finales
        textResponse = textResponse.substring(1, textResponse.length - 1);

        // Reemplazar caracteres de escape
        textResponse = textResponse.replace(/\\"/g, '"');

        // Intentar parsear nuevamente
        try {
          questionsData = JSON5.parse(textResponse);
        } catch (parseError) {
          console.error(
            "Error al parsear la cadena JSON escapada:",
            parseError
          );
          return [];
        }
      } else {
        // Si no es una cadena JSON escapada, intentar extraer el JSON entre corchetes
        const jsonMatch = textResponse.match(/\[.*\]/s);
        if (jsonMatch) {
          const jsonString = jsonMatch[0];
          try {
            questionsData = JSON5.parse(jsonString);
          } catch (parseError) {
            console.error("Error al parsear el JSON extraído:", parseError);
            return [];
          }
        } else {
          console.error("No se encontró JSON válido en la respuesta.");
          return [];
        }
      }
    }

    // Validar y mapear las preguntas
    const isValidQuestion = (q) => {
      return (
        q.questionText &&
        Array.isArray(q.options) &&
        q.options.length > 0 &&
        q.correctAnswer
      );
    };

    const questions = questionsData
      .filter(isValidQuestion)
      .map(
        (q) => new QuestionModel(q.questionText, q.options, q.correctAnswer)
      );

    return questions;
  } catch (error) {
    console.error("Error al obtener preguntas del API de OpenAI:", error);
    return [];
  }
};
