import { GoogleGenAI } from "@google/genai";


export async function askGemini(spreadType, question, targetCard) {
  const cardInfo = Array.isArray(targetCard)
    ? targetCard.map(c =>
      `- ${c.name} | สถานะ: ${c.isReversed ? 'หัวกลับ (Reversed)' : 'หัวตั้ง (Upright)'} | ความหมายพื้นฐาน: ${c.meaning}`
    ).join("\n")
    : `- ${targetCard.name} | สถานะ: ${targetCard.isReversed ? 'หัวกลับ (Reversed)' : 'หัวตั้ง (Upright)'} | ความหมายพื้นฐาน: ${targetCard.meaning}`
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `บทบาทของคุณ: 
         คุณคือ "Bigben" พ่อบ้านประจำคฤหาสน์แห่งคำทำนาย ผู้สุขุม นอบน้อม และมีความเชี่ยวชาญด้านไพ่ทาโรต์อย่างลึกซึ้ง 
         

         คำถามของผู้ใช้งาน: ${question || "ขอคำแนะนำทั่วไปสำหรับวันนี้"}

         งานของคุณ:
         จงวิเคราะห์ข้อมูลการจั่วไพ่ทาโรต์ต่อไปนี้
         ข้อมูลหน้าไพ่ที่สุ่มได้ :
         ${cardInfo}
         - ประเภท: ${spreadType}
         เงื่อนไขการตีความ:
         1. วิเคราะห์ไพ่ใบนี้ให้เชื่อมโยงกับ "คำถามของผู้ใช้งาน" อย่างสมเหตุสมผล
         2. หากไพ่เป็น isReversed: true ให้ตีความว่าเป็นอุปสรรคหรือสิ่งที่ต้องระวังเป็นพิเศษ
         3. เชื่อมโยงความหมายของไพ่เข้ากับคำถาม: "${question}"

         ตอบกลับในรูปแบบ JSON เท่านั้น:
         {
    "summary": "...",
    "detail": "...",
    "mood_score": ...
  }
     `,
    });
    let text = response.text;
    text = text.replace(/```json|```/g, "").trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      summary: "ขออภัยนายท่าน ข้าพเจ้าเกิดข้อผิดพลาดในการพยากรณ์",
      detail: "ดูเหมือนกระแสพลังงานจะติดขัด โปรดลองใหม่อีกครั้งในภายหลังนะขอรับ",
      mood_score: 50
    };
  }






  //  try {
  //   const result = await model.generateContent(prompt);
  //   console.error(error)
  //   const response = await result.response;
  //   const text = response.text();
  //   return JSON.parse(text);
  //  } catch (error) {
  //   if (error.status === 429) {
  //     return {
  //       summary: "ขออภัยขอรับ พ่อบ้านกำลังเรียบเรียงนิมิต",
  //       detail: "ดูเหมือนช่วงนี้ดวงดาวจะหนาแน่นเกินไปเล็กน้อย โปรดรอสักครู่แล้วลองใหม่อีกครั้งนะขอรับ",
  //       mood_score: 50
  //     };
  //   }
  //   throw error;

  // const prompt = `What is AI`
  // try {
  //     const result = await model.generateContent(prompt);
  //     console.log(result)
  //     return
  // } catch (error) {
  //     console.log(error)
  // }
}