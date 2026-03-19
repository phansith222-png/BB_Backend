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
        typeName: "SINGLE_CARD",
        description: "การเปิดไพ่ใบเดียวเพื่อดูแนวโน้มรายวัน หรือคำตอบที่ชัดเจนเพียงข้อเดียว"
    },
    {
        typeName: "PAST_PRESENT_FUTURE",
        description: "การวางไพ่ 3 ใบ เพื่อดูที่มาของปัญหา สถานการณ์ปัจจุบัน และแนวโน้มที่จะเกิดขึ้นในอนาคต"
    },
    {
        typeName: "CELTIC_CROSS",
        description: "การวางไพ่ 10 ใบ มาตรฐานสากลเพื่อวิเคราะห์สถานการณ์อย่างละเอียดในทุกมิติ"
    }
]

async function main() {
    console.log("Cleaning Table in process please wait....")
    await prisma.$transaction([
        prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `User` ;'),
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
    for(const user of userData) {
        await prisma.user.create({
            data: user
        })
    }
    const createTarotCards = await prisma.card.createMany({
        data: cardData,
        skipDuplicates: true
    })
    const createSpreadTypes = await prisma.spreadType.createMany({
        data: standardSpreadType,
        skipDuplicates: true
    })
    console.log('-----------------------------------');
    console.log('📊 Database Seeding Completed:');
    console.log(`   - Users        : ${userData.length}`);
    console.log(`   - Tarot Cards  : ${createTarotCards.count}`);
    console.log(`   - Spread Types : ${createSpreadTypes.count}`);
    console.log('-----------------------------------');
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit(1)
})