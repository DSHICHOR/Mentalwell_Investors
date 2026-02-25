import { getStore } from '@netlify/blobs';

export default async (request) => {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return new Response(JSON.stringify({ error: 'Invalid email' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const apiKey = process.env.BREVO_API_KEY;
        const senderEmail = process.env.BREVO_SENDER_EMAIL;
        const senderName = process.env.BREVO_SENDER_NAME || 'Mentalwell';
        const ownerEmail = process.env.OWNER_EMAIL || 'daniel@mentalwell.co.uk';

        console.log('Config check:', {
            hasApiKey: !!apiKey,
            senderEmail,
            senderName,
            ownerEmail,
            visitorEmail: email
        });

        if (!apiKey || !senderEmail) {
            console.error('Missing BREVO_API_KEY or BREVO_SENDER_EMAIL env vars');
            return new Response(JSON.stringify({ error: 'Email service not configured' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Generate 6-digit code
        const code = String(Math.floor(100000 + Math.random() * 900000));
        const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        // Store in Netlify Blobs
        const store = getStore('verification-codes');
        await store.setJSON(email.toLowerCase(), {
            code,
            expiresAt,
            attempts: 0
        });

        console.log('Code stored for', email.toLowerCase());

        // Send verification email to visitor
        const verifyResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'api-key': apiKey,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                sender: { name: senderName, email: senderEmail },
                to: [{ email }],
                subject: 'Your Mentalwell Investor Deck Access Code',
                htmlContent: `
                    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h2 style="color: #030765; margin: 0;">Mentalwell</h2>
                            <p style="color: #5c5c5c; margin: 8px 0 0 0;">Investor Data Room</p>
                        </div>
                        <div style="background: #f5f5f9; border-radius: 12px; padding: 30px; text-align: center;">
                            <p style="color: #141414; margin: 0 0 20px 0; font-size: 16px;">Your verification code:</p>
                            <div style="font-size: 36px; font-weight: 600; letter-spacing: 8px; color: #030765; margin: 0 0 20px 0;">${code}</div>
                            <p style="color: #5c5c5c; margin: 0; font-size: 13px;">This code expires in 10 minutes.</p>
                        </div>
                        <p style="color: #5c5c5c; font-size: 12px; text-align: center; margin-top: 24px;">
                            If you did not request this code, please ignore this email.
                        </p>
                    </div>
                `
            })
        });

        const verifyBody = await verifyResponse.text();
        console.log('Brevo verification email response:', verifyResponse.status, verifyBody);

        if (!verifyResponse.ok) {
            return new Response(JSON.stringify({ error: 'Failed to send verification email: ' + verifyBody }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Send notification to site owner
        const notifyResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'api-key': apiKey,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                sender: { name: senderName, email: senderEmail },
                to: [{ email: ownerEmail }],
                subject: `Investor Deck Access: ${email}`,
                htmlContent: `
                    <div style="font-family: Arial, sans-serif; padding: 20px;">
                        <h3 style="color: #030765;">New Deck Viewer</h3>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Time:</strong> ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
                        <p><strong>Status:</strong> Verification code sent, awaiting confirmation</p>
                    </div>
                `
            })
        });

        console.log('Brevo notification email response:', notifyResponse.status);

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Verification request error:', error);
        return new Response(JSON.stringify({ error: 'Failed to send verification email' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
