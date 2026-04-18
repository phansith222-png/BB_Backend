import bcrypt from 'bcrypt';
import { prisma } from '../src/lib/prisma.js';
import { cardData } from './cardData.js';

const hashedpassword = () => bcrypt.hashSync('123456', 10)

const userData = [
    {
        username: 'nadetchna',
        password: hashedpassword(),
        email: 'nadetch@eiei.com',
        role: 'USER',
        userInfo: {
            create: {
                firstName: 'nadetch',
                lastName: 'kikumiya',
                zodiac: 'aries',
                dateOfBirth: '23/01/2530'
            }
        }
    }, {
        username: 'yayana',
        password: hashedpassword(),
        email: 'yaya@eiei.com',
        role: 'USER',
        userInfo: {
            create: {
                firstName: 'yaya',
                lastName: 'kikumiya',
                zodiac: 'leo',
                dateOfBirth: '23/01/2534'
            }
        }
    }, {
        username: 'johncena',
        password: hashedpassword(),
        mobile: '1231234412',
        role: 'ADMIN',
        userInfo: {
            create: {
                firstName: 'John',
                lastName: 'Cena',
                zodiac: 'Gemini',
                dateOfBirth: '2/01/2520'
            }
        }
    }
]

const standardSpreadType = [
    // ---------------- GENERAL (ทั่วไป) ----------------
    {
        name: "Daily Insight (ไพ่ประจำวัน)",
        cardCount: 1,
        isCustom: false,
        spreadType: {
            create: {
                typeName: "SINGLE_CARD",
                category: "GENERAL",
                description: "การเปิดไพ่ใบเดียวเพื่อตรวจเช็กพลังงาน แนวโน้มประจำวัน หรือรับข้อความแนะนำสั้นๆ จากจักรวาลที่ตรงไปตรงมาที่สุด",
                icon: "https://api.iconify.design/lucide/sparkles.svg"
            }
        }
    },
    {
        name: "The Thread of Time (อดีต, ปัจจุบัน, อนาคต)",
        cardCount: 3,
        isCustom: false,
        spreadType: {
            create: {
                typeName: "PAST_PRESENT_FUTURE",
                category: "GENERAL",
                description: "วิเคราะห์เส้นเวลาของชีวิต เชื่อมโยงรากฐานจากอดีต เข้าใจสถานการณ์ที่กำลังเผชิญ และเตรียมรับมือกับแนวโน้มที่จะเกิดขึ้นในอนาคต",
                icon: "https://api.iconify.design/lucide/hourglass.svg"
            }
        }
    },
    {
        name: "Action & Outcome (ปัญหา, ทางออก, บทสรุป)",
        cardCount: 3,
        isCustom: false,
        spreadType: {
            create: {
                typeName: "SITUATION_ACTION_OUTCOME",
                category: "GENERAL",
                description: "เจาะลึกปัญหาเฉพาะหน้า ช่วยวิเคราะห์สถานการณ์ เสนอแนะวิธีรับมืออย่างมีสติ และคาดการณ์ผลลัพธ์เพื่อประกอบการตัดสินใจ",
                icon: "https://api.iconify.design/lucide/compass.svg"
            }
        }
    },
    {
        name: "Overcoming Obstacles (ก้าวผ่านอุปสรรค)",
        cardCount: 4,
        isCustom: false,
        spreadType: {
            create: {
                typeName: "OVERCOMING_OBSTACLES",
                category: "GENERAL",
                description: "เมื่อเจอทางตัน! ไพ่ชุดนี้จะช่วยเปิดเผยสิ่งที่ฉุดรั้งคุณไว้ ปัจจัยที่ควบคุมไม่ได้ และข้อแนะนำในการทะลวงผ่านจุดติดขัด",
                icon: "https://api.iconify.design/lucide/mountain.svg"
            }
        }
    },
    {
        name: "The Horseshoe (เกือกม้าไขชะตา)",
        cardCount: 7,
        isCustom: false,
        spreadType: {
            create: {
                typeName: "HORSESHOE_SPREAD",
                category: "GENERAL",
                description: "การวางไพ่รูปเกือกม้า 7 ใบ เพื่อดูอดีต ปัจจุบัน อนาคตที่ซ่อนเร้น อุปสรรค อิทธิพลจากคนรอบข้าง วิธีแก้ไข และผลลัพธ์ที่ชัดเจน",
                icon: "https://api.iconify.design/lucide/moon.svg"
            }
        }
    },
    {
        name: "The Celtic Cross (เซลติกครอส)",
        cardCount: 10,
        isCustom: false,
        spreadType: {
            create: {
                typeName: "CELTIC_CROSS",
                category: "GENERAL",
                description: "รูปแบบการวางไพ่ระดับมาสเตอร์พีซ มาตรฐานสากลเพื่อวิเคราะห์ปัญหาอย่างรอบด้าน เจาะลึกถึงจิตใต้สำนึก สภาพแวดล้อม และบทสรุปสุดท้าย",
                icon: "https://api.iconify.design/lucide/star.svg"
            }
        }
    },

    // ---------------- LOVE (ความรัก) ----------------
    {
        name: "Relationship Dynamics (ความสัมพันธ์ของเราสองคน)",
        cardCount: 4,
        isCustom: false,
        spreadType: {
            create: {
                typeName: "RELATIONSHIP_CROSS",
                category: "LOVE",
                description: "ส่องกระจกดูความสัมพันธ์แบบเจาะลึก สำรวจความรู้สึกของคุณ ความรู้สึกของเขา ปัญหาหรืออุปสรรคที่ซ่อนอยู่ และแนวโน้มบทสรุป",
                icon: "https://api.iconify.design/lucide/heart-handshake.svg"
            }
        }
    },
    {
        name: "New Love Potential (รักใหม่จะมาไหม)",
        cardCount: 3,
        isCustom: false,
        spreadType: {
            create: {
                typeName: "NEW_LOVE_POTENTIAL",
                category: "LOVE",
                description: "สำหรับคนโสดที่รอคอยความรัก เช็กความพร้อมของตัวคุณเอง ลักษณะของคนที่กำลังจะเข้ามา และแนวโน้มความสัมพันธ์ในอนาคตอันใกล้",
                icon: "https://api.iconify.design/lucide/heart.svg"
            }
        }
    },
    {
        name: "Healing a Broken Heart (เยียวยาแผลใจ)",
        cardCount: 4,
        isCustom: false,
        spreadType: {
            create: {
                typeName: "HEALING_HEART",
                category: "LOVE",
                description: "ไพ่แห่งการมูฟออน สำรวจความเจ็บปวดที่ยังตกค้าง สิ่งที่ควรปล่อยวาง บทเรียนที่ได้รับ และก้าวต่อไปเพื่อเยียวยาตัวเอง",
                icon: "https://api.iconify.design/lucide/heart-crack.svg"
            }
        }
    },
    {
        name: "The Soulmate Spread (ตามหารักแท้)",
        cardCount: 5,
        isCustom: false,
        spreadType: {
            create: {
                typeName: "SOULMATE_SPREAD",
                category: "LOVE",
                description: "เช็กสเปกและพลังงานดึงดูด! คุณพร้อมเจอรักแท้หรือยัง? เขาคนนั้นคือใคร? และอะไรคือสะพานเชื่อมให้คุณสองคนมาพบกัน?",
                icon: "https://api.iconify.design/lucide/infinity.svg"
            }
        }
    },

    // ---------------- CAREER (การงานและการเงิน) ----------------
    {
        name: "Career Path Readiness (เช็กความพร้อมเรื่องงาน)",
        cardCount: 3,
        isCustom: false,
        spreadType: {
            create: {
                typeName: "CAREER_PATH",
                category: "CAREER",
                description: "เหมาะสำหรับคนที่กำลังหางานใหม่หรือทบทวนงานปัจจุบัน เช็กจุดแข็งของคุณ อุปสรรคในสายอาชีพ และก้าวต่อไปที่ควรเดิน",
                icon: "https://api.iconify.design/lucide/briefcase.svg"
            }
        }
    },
    {
        name: "The Two Paths (ทางแยกแห่งการตัดสินใจ)",
        cardCount: 5,
        isCustom: false,
        spreadType: {
            create: {
                typeName: "TWO_CHOICES",
                category: "CAREER",
                description: "ลังเลระหว่าง 2 ทางเลือก? (เช่น ย้ายงาน vs อยู่ต่อ) วิเคราะห์ภาพรวม ผลลัพธ์ของทางเลือกที่ A และทางเลือกที่ B เพื่อหาทางที่ดีที่สุด",
                icon: "https://api.iconify.design/lucide/signpost.svg"
            }
        }
    },
    {
        name: "Career Advancement (หนทางสู่ความก้าวหน้า)",
        cardCount: 4,
        isCustom: false,
        spreadType: {
            create: {
                typeName: "CAREER_ADVANCEMENT",
                category: "CAREER",
                description: "อยากเลื่อนขั้นหรือเพิ่มเงินเดือน? ดูว่าหัวหน้ามองคุณอย่างไร สิ่งที่คุณต้องพัฒนา ข้อควรระวัง และศักยภาพในการเติบโตของคุณ",
                icon: "https://api.iconify.design/lucide/trending-up.svg"
            }
        }
    },

    // ---------------- HEALTH (สุขภาพกายและใจ) ----------------
    {
        name: "Mind, Body, Spirit (เช็กสมดุลกายใจ)",
        cardCount: 3,
        isCustom: false,
        spreadType: {
            create: {
                typeName: "MIND_BODY_SPIRIT",
                category: "HEALTH",
                description: "การอ่านไพ่เพื่อการเยียวยาตนเอง (Self-Healing) ตรวจสอบสภาวะความสมดุลระหว่างความคิด ร่างกาย และความต้องการลึกๆ ของจิตวิญญาณ",
                icon: "https://api.iconify.design/lucide/leaf.svg"
            }
        }
    },
    {
        name: "Mental Health Check-in (เช็กสุขภาพจิตใจ)",
        cardCount: 3,
        isCustom: false,
        spreadType: {
            create: {
                typeName: "MENTAL_HEALTH_CHECK",
                category: "HEALTH",
                description: "ดึงความกังวลที่ซ่อนอยู่ออกมาทำความเข้าใจ อะไรที่ทำให้คุณเครียดในช่วงนี้? สิ่งใดที่จะช่วยปลอบประโลมใจ? และคำแนะนำเพื่อสร้างพลังบวก",
                icon: "https://api.iconify.design/lucide/brain.svg"
            }
        }
    },
    {
        name: "Stress Relief (ปลดล็อกความเครียด)",
        cardCount: 4,
        isCustom: false,
        spreadType: {
            create: {
                typeName: "STRESS_RELIEF",
                category: "HEALTH",
                description: "วิเคราะห์ต้นตอของความเหนื่อยล้า สิ่งที่คุณแบกรับไว้มากเกินไป วิธีตัดความรุงรังออกจากชีวิต และทิศทางสู่ความสงบสุข",
                icon: "https://api.iconify.design/lucide/wind.svg"
            }
        }
    }
];

async function main() {
    console.log("Cleaning Table in process please wait....")
    await prisma.$transaction([
        prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `User` ;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `UserInfo` ;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Spread` ;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Card` ;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Reading` ;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `ReadCard` ;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `AiInterpretation` ;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `SavedReading` ;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `SpreadType` ;'),
        prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1;'),
    ])
    console.log('Start seeding process ...')
    for (const user of userData) {
        await prisma.user.create({
            data: user
        })
    }
    const createTarotCards = await prisma.card.createMany({
        data: cardData,
        skipDuplicates: true
    })
    for (const spread of standardSpreadType) {
        await prisma.spread.create({
            data: spread
        })
    }
    console.log('-----------------------------------');
    console.log('📊 Database Seeding Completed:');
    console.log(`   - Users        : ${userData.length}`);
    console.log(`   - Tarot Cards  : ${createTarotCards.count}`);
    console.log(`   - Spread Types : ${standardSpreadType.length}`);
    console.log('-----------------------------------');
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit(1)
})