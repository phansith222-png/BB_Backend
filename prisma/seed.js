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
    {
        name: "Daily Insight (ไพ่ประจำวัน)",
        cardCount: 1,
        isCustom: false,
        spreadType: {
            create: {
                typeName: "SINGLE_CARD",
                description: "การเปิดไพ่ใบเดียวเพื่อตรวจเช็กพลังงาน แนวโน้มประจำวัน หรือรับข้อความแนะนำสั้นๆ จากจักรวาลที่ตรงไปตรงมาที่สุด"
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
                description: "วิเคราะห์เส้นเวลาของชีวิต เชื่อมโยงรากฐานจากอดีต เข้าใจสถานการณ์ที่กำลังเผชิญ และเตรียมรับมือกับแนวโน้มที่จะเกิดขึ้นในอนาคต"
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
                description: "เจาะลึกปัญหาเฉพาะหน้า ช่วยวิเคราะห์สถานการณ์ เสนอแนะวิธีรับมือ (Action) และคาดการณ์ผลลัพธ์ (Outcome) เพื่อประกอบการตัดสินใจ"
            }
        }
    },
    {
        name: "Mind, Body, Spirit (เช็กสมดุลกายใจ)",
        cardCount: 3,
        isCustom: false,
        spreadType: {
            create: {
                typeName: "MIND_BODY_SPIRIT",
                description: "การอ่านไพ่เพื่อการเยียวยาตนเอง (Self-Healing) ตรวจสอบสภาวะความสมดุลระหว่างความคิด ร่างกาย และความต้องการลึกๆ ของจิตวิญญาณ"
            }
        }
    },
    {
        name: "Relationship Dynamics (ความสัมพันธ์ของเราสองคน)",
        cardCount: 4,
        isCustom: false,
        spreadType: {
            create: {
                typeName: "RELATIONSHIP_CROSS",
                description: "ส่องกระจกดูความสัมพันธ์แบบเจาะลึก สำรวจความรู้สึกของคุณ ความรู้สึกของเขา ปัญหาหรืออุปสรรคที่ซ่อนอยู่ และแนวโน้มบทสรุปของความรัก"
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
                description: "เหมาะสำหรับสถานการณ์ที่ต้องเลือก วิเคราะห์ภาพรวมของปัญหา ผลลัพธ์ของทางเลือกที่ A และผลลัพธ์ของทางเลือกที่ B เพื่อหาทางที่ดีที่สุด"
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
                description: "การวางไพ่รูปเกือกม้า 7 ใบ เพื่อดูอดีต ปัจจุบัน อนาคตที่ซ่อนเร้น อุปสรรค อิทธิพลจากคนรอบข้าง วิธีแก้ไข และผลลัพธ์ที่ชัดเจน"
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
                description: "รูปแบบการวางไพ่ 10 ใบ ระดับมาสเตอร์พีซ มาตรฐานสากลเพื่อวิเคราะห์ปัญหาอย่างรอบด้าน เจาะลึกถึงจิตใต้สำนึก สภาพแวดล้อม และบทสรุปสุดท้าย"
            }
        }
    }
]

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