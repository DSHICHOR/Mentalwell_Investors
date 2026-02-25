import { getStore } from '@netlify/blobs';

export default async (request) => {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { email, code } = await request.json();

        if (!email || !code) {
            return new Response(JSON.stringify({ error: 'Email and code required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const store = getStore('verification-codes');
        const record = await store.get(email.toLowerCase(), { type: 'json' });

        if (!record) {
            return new Response(JSON.stringify({ error: 'No verification code found. Please request a new one.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (Date.now() > record.expiresAt) {
            await store.delete(email.toLowerCase());
            return new Response(JSON.stringify({ error: 'Code expired. Please request a new one.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (record.attempts >= 5) {
            await store.delete(email.toLowerCase());
            return new Response(JSON.stringify({ error: 'Too many attempts. Please request a new code.' }), {
                status: 429,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (record.code !== code.trim()) {
            await store.setJSON(email.toLowerCase(), {
                ...record,
                attempts: record.attempts + 1
            });
            return new Response(JSON.stringify({ error: 'Incorrect code. Please try again.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Success - delete used code
        await store.delete(email.toLowerCase());

        return new Response(JSON.stringify({ success: true, verified: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Verification error:', error);
        return new Response(JSON.stringify({ error: 'Verification failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
