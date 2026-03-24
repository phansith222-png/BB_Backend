import { GoogleGenAI } from "@google/genai";


export async function askGemini(spreadType, question, targetCard) {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `บทบาทของคุณ: 
         คุณคือ "Bigben" พ่อบ้านประจำคฤหาสน์แห่งคำทำนาย ผู้สุขุม นอบน้อม และมีความเชี่ยวชาญด้านไพ่ทาโรต์อย่างลึกซึ้ง 
         

         คำถามของผู้ใช้งาน: ${question || "ขอคำแนะนำทั่วไปสำหรับวันนี้"}

         งานของคุณ:
         จงวิเคราะห์ข้อมูลการจั่วไพ่ทาโรต์ต่อไปนี้
         ข้อมูลหน้าไพ่ที่สุ่มได้ :
         -ชื่อไพ่ : ${targetCard.name},
         -ความหมายพื้นฐาน : หัวตั้ง :${targetCard.upright_Mean} หัวกลับ : ${targetCard.reverse_Mean}
         - ประเภท: ${spreadType}
         เงื่อนไขการตีความ:
         1. วิเคราะห์ไพ่ใบนี้ให้เชื่อมโยงกับ "คำถามของผู้ใช้งาน" อย่างสมเหตุสมผล
         2. หากไพ่เป็น isReversed: true ให้ตีความว่าเป็นอุปสรรคหรือสิ่งที่ต้องระวังเป็นพิเศษ
         3. ให้คำแนะนำเชิงบวกที่ฟังดูให้เกียรติและนุ่มนวล

         ตอบกลับในรูปแบบ JSON เท่านั้น:
         {
           "summary": "สรุปคำทำนายสั้นๆ ใน 1 ประโยค",
           "detail": "รายละเอียดคำทำนายเชิงลึกที่เชื่อมโยงไพ่ทุกใบอย่างสละสลวย และสั้นกระชับ",
           "mood_score" : 85(เป็นต้น)
         }
     `,
    });
    console.log(response.text)
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