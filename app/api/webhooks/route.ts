export async function POST(request: Request) {
    try {
        const secret = process.env.CLERK_WEBHOOK_SECRET_KEY;
    } catch (error) {
        console.error("Error verifying webhook:", error);
        return new Response("Error verifying webhook", { status: 400 });
    }
}