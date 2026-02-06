'use server'

import { redis } from "@/db/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type sendMessageActionProps={
    content:string,
    receiverId:string,
    messageType:"text" | "image",
}

export async function sendMessasgeAction({content,messageType,receiverId}:sendMessageActionProps){
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) return {success:false,message:"User not found"};

    const senderId = user.id;

    // Make sure to make the conversation 2 users the same : conversation:123:456 is the same conversation:456:123 (sort)
    const conversationId = `conversation:${[senderId,receiverId].sort().join(':')}`;

    const existingConversation = await redis.hgetall(conversationId);

    // If the conversation does not exist, create it
    if(!existingConversation || Object.keys(existingConversation).length === 0){
        await redis.hset(conversationId,{
         participant1:senderId,
         participant2:receiverId,
        });

        // Add the conversation to the user's conversations set
        await redis.sadd(`user:${senderId}:conversations`,conversationId);
        await redis.sadd(`user:${receiverId}:conversations`,conversationId);
    }

    // Create a unique message id
    const messageId = `message:${Date.now()}:${Math.random().toString(36).substring(2,9)}`

    const timestamp = Date.now();

    // Create the message hash
    await redis.hset(messageId,{
        senderId,
        content,
        timestamp,
        messageType
    })

    // Add the message into the conversation hash
    await redis.zadd(`${conversationId}:messages`,{score:timestamp,member:JSON.stringify(messageId)});

    return {success:true,conversationId,messageId}

}