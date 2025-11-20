import { RAW_CSV_DATA } from '../constants';
import { SocialComment, ConstitutionSection } from '../types';

// Simple regex to parse CSV line avoiding comma split inside quotes
const parseCSVLine = (line: string): string[] => {
  const pattern = /(".*?"|[^",]+)(?=\s*,|\s*$)/g;
  const matches = line.match(pattern);
  return matches ? matches.map(m => m.replace(/^"|"$/g, '').trim()) : [];
};

// Simulated NLP Model for Mapping Text to Constitution Chapter 5
const mapToConstitution = (text: string, category: string): ConstitutionSection => {
    const textLower = text.toLowerCase();
    
    // S63: Anti-Corruption
    if (category === 'corruption' || textLower.includes('โกง') || textLower.includes('ทุจริต') || textLower.includes('ฮั้ว') || textLower.includes('สินบน')) {
        return 'S63';
    }

    // S61: Consumer Protection
    if (textLower.includes('ผู้บริโภค') || textLower.includes('เอาเปรียบ') || textLower.includes('ราคาแพง') || textLower.includes('ไม่เป็นธรรม') || textLower.includes('สัญญา')) {
        return 'S61';
    }

    // S60: Spectrum & Broadcasting
    if (textLower.includes('คลื่นความถี่') || textLower.includes('สัญญาณ') || textLower.includes('เน็ต') || textLower.includes('กสทช') || textLower.includes('โทรศัพท์')) {
        return 'S60';
    }

    // S59: Information Disclosure
    if (textLower.includes('เปิดเผยข้อมูล') || textLower.includes('ปกปิด') || textLower.includes('ข้อมูลข่าวสาร') || textLower.includes('ความลับ')) {
        return 'S59';
    }

    // S56: Basic Infrastructure
    if (category === 'infrastructure' || textLower.includes('ตึก') || textLower.includes('ถนน') || textLower.includes('น้ำ') || textLower.includes('ไฟ') || textLower.includes('ทาง')) {
        return 'S56';
    }

    // S55: Public Health
    if (textLower.includes('หมอ') || textLower.includes('พยาบาล') || textLower.includes('รักษา') || textLower.includes('ป่วย') || textLower.includes('โรงพยาบาล') || textLower.includes('สปสช')) {
        return 'S55';
    }
    
    // S54: Education
    if (textLower.includes('ครู') || textLower.includes('เรียน') || textLower.includes('เด็ก') || textLower.includes('โรงเรียน') || textLower.includes('การศึกษา') || textLower.includes('กยศ')) {
        return 'S54';
    }

    // S53: Law Enforcement & Administration
    if (category === 'law_enforcement' || textLower.includes('กฎหมาย') || textLower.includes('ตำรวจ') || textLower.includes('ศาล') || textLower.includes('จับ') || textLower.includes('ปฏิบัติหน้าที่')) {
        return 'S53';
    }

    return 'S51'; // Default to Section 51 (Right to follow up) if unclear
};

export const getSocialData = (): SocialComment[] => {
  const lines = RAW_CSV_DATA.trim().split('\n');
  // Skip header
  const dataLines = lines.slice(1);

  return dataLines.map((line, index) => {
    const cols = parseCSVLine(line);
    const commentText = cols[3] || "";
    
    // 1. Basic Sentiment Analysis (Simulated)
    let sentiment: SocialComment['sentiment'] = 'neutral';
    const textLower = commentText.toLowerCase();

    if (textLower.includes('ดี') || textLower.includes('ขอบคุณ') || textLower.includes('เยี่ยม') || textLower.includes('สาธุ') || textLower.includes('ชอบ')) {
        sentiment = 'positive';
    } else if (textLower.includes('เลว') || textLower.includes('ชั่ว') || textLower.includes('แย่') || textLower.includes('ห่วย') || textLower.includes('โกง') || textLower.includes('เบื่อ')) {
        sentiment = 'negative';
    }

    // 2. Topic Modeling / Categorization (Simulated)
    let category: SocialComment['category'] = 'general';
    if (textLower.includes('โกง') || textLower.includes('ทุจริต') || textLower.includes('แดก') || textLower.includes('เงิน') || textLower.includes('ใต้โต๊ะ')) {
        category = 'corruption';
        sentiment = 'negative'; // Override
    } else if (textLower.includes('ช้า') || textLower.includes('ไม่ทำ') || textLower.includes('เลี่ยงงาน') || textLower.includes('เช้าชาม')) {
        category = 'inefficiency';
        sentiment = 'negative';
    } else if (textLower.includes('ถนน') || textLower.includes('ตึก') || textLower.includes('น้ำ') || textLower.includes('ไฟ') || textLower.includes('ก่อสร้าง')) {
        category = 'infrastructure';
        sentiment = 'negative';
    } else if (textLower.includes('กฎหมาย') || textLower.includes('ตำรวจ') || textLower.includes('ศาล') || textLower.includes('จับ')) {
        category = 'law_enforcement';
    }

    // 3. Constitution Mapping (Linking to Chapter 5 Duties of State)
    const constitutionSection = mapToConstitution(commentText, category);

    return {
      id: cols[0] || `id-${index}`,
      authorName: cols[1] || "Anonymous",
      authorAvatar: cols[2] || "https://picsum.photos/50/50",
      commentText: commentText,
      postUrl: cols[4] || "#",
      reactionsCount: parseInt(cols[5] || "0", 10),
      timestamp: cols[6] || new Date().toISOString(),
      sentiment,
      category,
      constitutionSection
    };
  });
};

export const getSectionInfo = (code: string) => {
    switch(code) {
        case 'S51': return { label: 'ม.51 สิทธิติดตามรัฐ', desc: 'ประชาชนมีสิทธิติดตามและเร่งรัดให้รัฐดำเนินการ' };
        case 'S53': return { label: 'ม.53 การบริหารราชการ', desc: 'รัฐต้องดูแลให้มีการปฏิบัติกฎหมายอย่างเคร่งครัด' };
        case 'S54': return { label: 'ม.54 การศึกษา', desc: 'รัฐต้องดำเนินการให้เด็กทุกคนได้รับการศึกษาอย่างมีคุณภาพ' };
        case 'S55': return { label: 'ม.55 สาธารณสุข', desc: 'รัฐต้องดำเนินการให้ประชาชนได้รับบริการสาธารณสุข' };
        case 'S56': return { label: 'ม.56 สาธารณูปโภค', desc: 'รัฐต้องจัดหรือดูแลให้มีสาธารณูปโภคพื้นฐาน' };
        case 'S59': return { label: 'ม.59 เปิดเผยข้อมูล', desc: 'รัฐต้องเปิดเผยข้อมูลสาธารณะให้ประชาชนเข้าถึงสะดวก' };
        case 'S60': return { label: 'ม.60 คลื่นความถี่', desc: 'รัฐต้องรักษาคลื่นความถี่/วงโคจรเพื่อประโยชน์สาธารณะ' };
        case 'S61': return { label: 'ม.61 คุ้มครองผู้บริโภค', desc: 'รัฐต้องมีมาตรการคุ้มครองสิทธิของผู้บริโภค' };
        case 'S63': return { label: 'ม.63 ปราบปรามทุจริต', desc: 'รัฐต้องส่งเสริมสนับสนุนให้ประชาชนมีส่วนร่วมตรวจสอบ' };
        default: return { label: 'ทั่วไป', desc: 'หน้าที่รัฐทั่วไป' };
    }
}