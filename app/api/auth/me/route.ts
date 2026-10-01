import { NextResponse } from "next/server";
import { getSessionClaims } from "@/lib/server-auth";
export async function GET(){const claims=await getSessionClaims();if(!claims)return NextResponse.json({isAuthenticated:false,isAdmin:false},{status:401});const adminEmail=process.env.ADMIN_EMAIL?.trim().toLowerCase();const isAdmin=Boolean(claims.admin||adminEmail&&claims.email?.toLowerCase()===adminEmail);return NextResponse.json({isAuthenticated:true,isAdmin,email:claims.email||null,name:claims.name||null})}
