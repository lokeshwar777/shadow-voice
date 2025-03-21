import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export const getAIOpinion = async (req, res) => {
    const { prompt } = req.body;
    const result = await model.generateContent(prompt);
    // console.log(result);
    // const data = result?.response?.candidates[0]?.content?.parts[0]?.text;
    let data = `AI thinks your post is great!`;

    if (!result?.response?.candidates?.length) {
        console.log('Candidates array is missing or empty');
    } else if (result.response.candidates[0]?.content?.parts?.[0]?.text) {
        data = result.response.candidates[0]?.content?.parts?.[0]?.text;
    }
    res.status(200).json(data);
};
