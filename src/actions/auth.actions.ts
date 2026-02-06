'use server';
import { redis } from "@/db/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function checkAuthStatus() {
   const {getUser} = await getKindeServerSession();
   const user = await getUser();

   // If user is not authenticated by kinde, return false
   if(!user){
    return {success:false};
   }

// Namespace to store data in redis is user:123:{....}
   const userId = `user:${user.id}`;

   const existingUser = await redis.hgetall(userId);

   // If user does not exist in redis, create a new user (Sign Up case)
   if(!existingUser || Object.keys(existingUser).length === 0){
    const imgIsNull = user.picture?.includes('gravatar');
    const image = imgIsNull? "" : user.picture;
    await redis.hset(userId,{
        id:user.id,
        email:user.email,
        name:`${user.given_name} ${user.family_name}`,
        image: image || '',
       
    });
   }
   
   return {success:true,user:existingUser};
}