import PusherServer from "pusher";

declare global {
    var pusherServer: PusherServer | undefined;
}

// Singleton on server (global exists only in Node.js)
const pusherServer = global.pusherServer ?? new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_APP_KEY!,
    secret: process.env.PUSHER_APP_SECRET!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    useTLS: true,
});

if (typeof global !== "undefined") global.pusherServer = pusherServer;

export { pusherServer };

