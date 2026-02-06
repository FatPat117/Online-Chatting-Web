'use server';

import { redis } from "@/db/db";
import { User } from "@/db/dummy";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getUser():Promise<User[]> {
    const userKeys:string[] = [];
    let cursor = "0";
  
    // Scan the redis database for all user keys
    do {
        const [nextCursor,keys] = await redis.scan(cursor,{
            match: "user:*",
            type:"hash",
            count:1000
        });
        cursor = nextCursor.toString();
        userKeys.push(...keys);
    } while (cursor!='0');

    // Get all the user data from the redis database
    const pipeline = redis.pipeline();

    userKeys.forEach(ket => {
        pipeline.hgetall(ket);
    });

    const results = (await pipeline.exec()) as User[];

    // Avoid getting currentUser from the database
    const { getUser: getKindeUser } = await getKindeServerSession();
    const currentUser = await getKindeUser();

    const users:User[] = [];

    for(const user of results){
        if(user.id === currentUser?.id) continue;
        users.push(user as User);
    }

    return users;


}