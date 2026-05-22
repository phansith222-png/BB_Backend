import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendPasswordResetEmail(to, token) {
    const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`
    await resend.emails.send({
        from: process.env.RESEND_FROM || 'onboarding@resend.dev',
        to,
        subject: 'รีเซ็ตรหัสผ่าน BigBode',
        html: `
            <div style="font-family:sans-serif;max-width:480px;margin:auto">
                <h2>รีเซ็ตรหัสผ่าน BigBode</h2>
                <p>คลิกลิงก์ด้านล่างเพื่อรีเซ็ตรหัสผ่านของคุณ (ลิงก์หมดอายุใน 1 ชั่วโมง)</p>
                <a href="${link}" style="display:inline-block;padding:12px 24px;background:#DFC6AD;color:#6C4620;text-decoration:none;border-radius:8px;font-weight:bold">
                    รีเซ็ตรหัสผ่าน
                </a>
                <p style="margin-top:16px;color:#888;font-size:12px">หากคุณไม่ได้ขอรีเซ็ตรหัสผ่าน ให้เพิกเฉยต่ออีเมลนี้</p>
            </div>
        `,
    })
}
