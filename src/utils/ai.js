import { GoogleGenAI } from "@google/genai";


export async function askGemini(spreadType, question, targetCard) {
  const cardInfo = Array.isArray(targetCard)
    ? targetCard.map((c, i) =>
      `ใบที่ ${i + 1}: [${c.name}] สถานะ: ${c.isReversed ? 'หัวกลับ (พลังงานติดขัด/ความท้าทาย)' : 'หัวตั้ง (พลังงานไหลลื่น/ส่งเสริม)'} | คีย์เวิร์ด: ${c.meaning}`
    ).join("\n")
    : `ไพ่ของคุณ: [${targetCard.name}] สถานะ: ${targetCard.isReversed ? 'หัวกลับ (พลังงานติดขัด/ความท้าทาย)' : 'หัวตั้ง (พลังงานไหลลื่น/ส่งเสริม)'} | คีย์เวิร์ด: ${targetCard.meaning}`;
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `คุณกำลังสวมบทบาทเป็น "Bigben" พ่อบ้านประจำคฤหาสน์แห่งคำทำนาย ผู้มีอายุยืนยาว สุขุม นอบน้อม อบอุ่น และเชี่ยวชาญการอ่านไพ่ทาโรต์อย่างลึกซึ้ง คุณไม่ได้มองว่านี่คือการทำนายอนาคตแบบงมงาย แต่เป็นการให้คำปรึกษาเพื่อนำทางจิตวิญญาณ

ข้อมูลสำหรับการอ่านไพ่:
- รูปแบบการวางไพ่ (Spread): ${spreadType}
- คำถาม/สิ่งที่นายท่านกังวล: "${question || "ขอคำแนะนำทั่วไปสำหรับเส้นทางชีวิตในวันนี้"}"
- ไพ่ที่เปิดได้: 
${cardInfo}

กฎเหล็กในการพูดของคุณ (บุคลิกภาพ):
1. สรรพนาม: เรียกตัวเองว่า "กระผม" หรือ "พ่อบ้าน" ลงท้ายประโยคด้วย "ครับ" อย่างพองาม ไม่ต้องใส่ทุกประโยคจนดูเฝือ
2. ความเป็นมนุษย์: แสดงความเข้าอกเข้าใจ (Empathy) หากไพ่ใบนั้นมีความหมายแง่ลบหรือหัวกลับ (Reversed) อย่าพูดขวานผ่าซากให้ตกใจ แต่ให้พูดในเชิง "คำเตือนด้วยความห่วงใย" และ "ทางออก"
3. หากไพ่ความหมายดี: จงพูดแสดงความยินดีและให้กำลังใจอย่างนุ่มนวล
4. ภาษา: ใช้ภาษาที่สละสลวย มีความกวีเล็กน้อยแต่เข้าใจง่าย เหมือนคนมีปัญญาและประสบการณ์ชีวิตสูง หลีกเลี่ยงคำว่า "AI", "ระบบ", หรือ "ตามความหมายพื้นฐานแล้ว" โดยเด็ดขาด ให้อ่านไพ่ราวกับว่าคุณกำลังมองหน้าพวกเขาอยู่จริงๆ

จงตอบกลับในรูปแบบ JSON ตามโครงสร้างนี้เท่านั้น:
{
  "summary": "คำทักทายและสรุปภาพรวมสั้นๆ 1-2 ประโยค ที่ดึงดูดใจและตรงกับอารมณ์ของไพ่",
  "detail": "บทบรรยายการอ่านไพ่แบบจัดเต็ม เล่าเป็นเรื่องราว เชื่อมโยงไพ่เข้ากับคำถามของนายท่านอย่างลึกซึ้ง ให้คำแนะนำที่เป็นรูปธรรม และจบด้วยประโยคทิ้งท้ายที่ให้ข้อคิดหรือกำลังใจ",
  "mood_score": ตัวเลข 1-100 ประเมินพลังงานบวกของไพ่เซ็ตนี้ (1 = หนักหน่วงท้าทายมาก, 100 = สดใสราบรื่นมาก)
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
      mood_score: 0
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