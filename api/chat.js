import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS 요청 처리 (CORS preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // POST 요청만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: '메시지가 필요합니다.' });
    }

    // 환경변수에서 API 키 가져오기 (서버 사이드에서만 접근 가능)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API 키가 설정되지 않았습니다.' });
    }

    // Gemini API 호출
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(message);
    const response = await result.response;
    const aiText = response.text();

    res.status(200).json({ response: aiText });
    
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    let errorMessage = '응답을 생성하는 중 오류가 발생했습니다.';
    
    if (error.status === 400) {
      errorMessage = '잘못된 요청입니다.';
    } else if (error.status === 403) {
      errorMessage = 'API 키가 유효하지 않습니다.';
    } else if (error.status === 429) {
      errorMessage = 'API 요청 한도를 초과했습니다.';
    }
    
    res.status(500).json({ error: errorMessage });
  }
} 