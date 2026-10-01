import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "./firebase-admin";
const SESSION_COOKIE="my_platform_session";
export async function getSessionClaims(){const c=await cookies();const token=c.get(SESSION_COOKIE)?.value;if(!token)return null;try{return await adminAuth.verifySessionCookie(token,true)}catch{return null}}
export async function requireAdmin(){const claims=await getSessionClaims();const email=process.env.ADMIN_EMAIL?.trim().toLowerCase();const allowed=Boolean(claims&&(claims.admin||email&&claims.email?.toLowerCase()===email));if(!allowed)redirect("/login?reason=unauthorized");return claims!;}
export async function requireAdminApi(){const claims=await getSessionClaims();const email=process.env.ADMIN_EMAIL?.trim().toLowerCase();const allowed=Boolean(claims&&(claims.admin||email&&claims.email?.toLowerCase()===email));if(!allowed)throw new Response(JSON.stringify({error:"Unauthorized"}),{status:401,headers:{"Content-Type":"application/json"}});return claims!}
export { SESSION_COOKIE };
