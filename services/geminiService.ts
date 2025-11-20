import { GoogleGenAI } from "@google/genai";

// Knowledge Base: Constitution Chapter 5 (Duties of the State) and Ombudsman Report 2024
const LEGAL_CONTEXT = `
**รัฐธรรมนูญแห่งราชอาณาจักรไทย พุทธศักราช ๒๕๖๐ หมวด ๕ หน้าที่ของรัฐ**

**มาตรา ๕๑** การใดที่รัฐธรรมนูญบัญญัติให้เป็นหน้าที่ของรัฐตามหมวดนี้ ถ้าการนั้น เป็นการทําเพื่อให้เกิดประโยชน์แก่ประชาชนโดยตรง ย่อมเป็นสิทธิของประชาชนและชุมชนที่จะติดตาม และเร่งรัดให้รัฐดําเนินการ รวมตลอดทั้งฟ้องร้องหน่วยงานของรัฐที่เก่ียวข้อง เพื่อจัดให้ประชาชน หรือชุมชนได้รับประโยชน์นั้นตามหลักเกณฑ์และวิธีการที่กฎหมายบัญญัติ

**มาตรา ๕๒** รัฐต้องพิทักษ์รักษาไว้ซึ่งสถาบันพระมหากษัตริย์ เอกราช อธิปไตย บูรณภาพ แห่งอาณาเขตและเขตที่ประเทศไทยมีสิทธิอธิปไตย เกียรติภูมิและผลประโยชน์ของชาติ ความมั่นคงของรัฐ และความสงบเรียบร้อยของประชาชน เพื่อประโยชน์แห่งการนี้ รัฐต้องจัดให้มีการทหาร การทูต และการข่าวกรองที่มีประสิทธิภาพ กำลังทหารให้ใช้เพื่อประโยชน์ในการพัฒนาประเทศด้วย

**มาตรา ๕๓** รัฐต้องดูแลให้มีการปฏิบัติตามและบังคับใช้กฎหมายอย่างเคร่งครัด

**มาตรา ๕๔** รัฐต้องดําเนินการให้เด็กทุกคนได้รับการศึกษาเป็นเวลาสิบสองปี ตั้งแต่ ก่อนวัยเรียนจนจบการศึกษาภาคบังคับอย่างมีคุณภาพโดยไม่เก็บค่าใช้จ่าย (รวมถึงการดูแลเด็กเล็กก่อนวัยเรียน)

**มาตรา ๕๕** รัฐต้องดําเนินการให้ประชาชนได้รับบริการสาธารณสุขที่มีประสิทธิภาพอย่างทั่วถึง เสริมสร้างให้ประชาชนมีความรู้พื้นฐานเกี่ยวกับการส่งเสริมสุขภาพและการป้องกันโรค

**มาตรา ๕๖** รัฐต้องจัดหรือดําเนินการให้มีสาธารณูปโภคขั้นพื้นฐานที่จําเป็นต่อการดํารงชีวิต ของประชาชนอย่างทั่วถึงตามหลักการพัฒนาอย่างย่ังยืน (รัฐต้องเป็นเจ้าของโครงข่ายหลักไม่น้อยกว่าร้อยละ 51)

**มาตรา ๕๗** รัฐต้องอนุรักษ์ ฟื้นฟู ศิลปะ วัฒนธรรม และทรัพยากรธรรมชาติ

**มาตรา ๕๘** การดําเนินการใดที่อาจมีผลกระทบต่อสิ่งแวดล้อม/สุขภาพ รัฐต้องให้มีการศึกษาผลกระทบ (EIA/EHIA) และรับฟังความคิดเห็นประชาชนก่อน

**มาตรา ๕๙** รัฐต้องเปิดเผยข้อมูลหรือข่าวสารสาธารณะในครอบครองของหน่วยงานของรัฐ ที่มิใช่ข้อมูลเกี่ยวกับความมั่นคงของรัฐหรือเป็นความลับของทางราชการ และต้องจัดให้ประชาชนเข้าถึงได้โดยสะดวก

**มาตรา ๖๐** รัฐต้องรักษาไว้ซึ่งคลื่นความถี่และสิทธิในการเข้าใช้วงโคจรดาวเทียมอันเป็นสมบัติของชาติ เพื่อใช้ให้เกิดประโยชน์สูงสุดแก่ประชาชน (ป้องกันการผูกขาดและเอาเปรียบผู้บริโภค)

**มาตรา ๖๑** รัฐต้องจัดให้มีมาตรการหรือกลไกที่มีประสิทธิภาพในการคุ้มครองและพิทักษ์สิทธิ ของผู้บริโภคด้านต่าง ๆ

**มาตรา ๖๒** รัฐต้องรักษาวินัยการเงินการคลังอย่างเคร่งครัด

**มาตรา ๖๓** รัฐต้องส่งเสริม สนับสนุน และให้ความรู้แก่ประชาชนถึงอันตรายที่เกิดจากการทุจริตและประพฤติมิชอบ และจัดให้มีกลไกป้องกันและขจัดการทุจริต

**ข้อมูลเพิ่มเติม: ผลงานเด่นผู้ตรวจการแผ่นดิน ปี 2567 (Ombudsman Report 2024)**
- **หนี้ กยศ.:** ปรับโครงสร้างหนี้ คำนวณยอดหนี้ใหม่ ปลดผู้ค้ำประกัน
- **โซลาร์รูฟท็อป:** ลดขั้นตอนขออนุญาต สนับสนุนพลังงานสะอาด
- **ที่ดิน:** คัดสำเนาโฉนดต่างสำนักงานได้ทั่วประเทศ
- **Ombudsman Care:** รถโมบายลงพื้นที่เชิงรุก
`;

export const askLegalAI = async (userQuestion: string): Promise<{ text: string, groundingMetadata?: any }> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { 
              text: `Knowledge Base:\n${LEGAL_CONTEXT}\n\nUser Question: ${userQuestion}` 
            }
          ]
        }
      ],
      config: {
        tools: [{ googleMaps: {} }],
        systemInstruction: `คุณคือ "AI Intake Officer" ของสำนักงานผู้ตรวจการแผ่นดิน หน้าที่คือช่วยประชาชนคัดกรองเรื่องร้องเรียนและให้ข้อมูล
        
        **แนวทางตอบคำถาม (Guidance):**
        1. **อ้างอิงกฎหมาย:** หากเกี่ยวข้องกับ "หน้าที่ของรัฐ" ให้ระบุ มาตรา (เช่น ม.54 การศึกษา, ม.56 สาธารณูปโภค) เพื่อให้ประชาชนทราบถึงสิทธิของตน
        2. **ตรวจสอบอำนาจ (Jurisdiction):** 
           - รับเรื่อง: หน่วยงานรัฐ, เจ้าหน้าที่รัฐ, รัฐวิสาหกิจ, ท้องถิ่น
           - ไม่รับเรื่อง: เอกชนขัดแย้งกันเอง, เรื่องในชั้นศาล
        3. **ใช้ข้อมูลปี 67:** หากถามเรื่อง กยศ., ที่ดิน, โซลาร์เซลล์ ให้ตอบด้วยผลงานเด่นปี 2567
        4. **น้ำเสียง:** สุภาพ กระตือรือร้น และเห็นอกเห็นใจ (Empathy)
        
        ถ้าเป็นคำถามเกี่ยวกับสถานที่ ให้ใช้ Google Maps grounding ตอบ`,
        temperature: 0.3,
      }
    });

    return {
        text: response.text || "ขออภัย ไม่สามารถประมวลผลข้อมูลได้ในขณะนี้",
        groundingMetadata: response.candidates?.[0]?.groundingMetadata
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "เกิดข้อผิดพลาดในการเชื่อมต่อกับระบบ AI" };
  }
};

export const analyzeSentiment = async (text: string): Promise<'positive' | 'negative' | 'neutral'> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the sentiment of the following Thai social media comment regarding government performance and state duties.
      
      **Critical Rules for Thai Context:**
      1. **Sarcasm (ประชด):** Phrases like "ทำงานดีตายแหละ" (Work good my foot), "รอชาติหน้า" (Wait until next life), "สำนักงานนี้มีไว้ทำไม" (What is this office for?) MUST be classified as 'negative'.
      2. **Corruption/Insults:** Words like "โกง" (Cheat), "แดก" (Eat/Corruption), "ทุจริต" (Corruption), "เช้าชามเย็นชาม" (Lazy), "ขี้เกียจ" (Lazy), "ภาษี" (Wasted taxes) MUST be classified as 'negative'.
      3. **Complaints:** Any expression of delay, inefficiency, or dissatisfaction with services is 'negative'.
      4. **Positive:** Only classifying genuine praise, thanks, or satisfaction as 'positive'.
      5. **Neutral:** General questions, news sharing, or statements without emotion.

      Comment: "${text}"
      
      Return ONLY one word lowercase: positive, negative, or neutral.`,
      config: {
        temperature: 0.1,
      }
    });
    
    const result = response.text?.trim().toLowerCase() as string;
    
    if (result.includes('positive')) return 'positive';
    if (result.includes('negative')) return 'negative';
    return 'neutral';
  } catch (error) {
    console.error("Sentiment Analysis Error:", error);
    return 'neutral';
  }
};