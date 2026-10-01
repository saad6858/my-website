import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/server-auth";
import { seedDatabase } from "@/lib/seed";
export const runtime="nodejs";
export async function POST(){try{await requireAdminApi();const report=await seedDatabase();return NextResponse.json({success:true,report})}catch(e){if(e instanceof Response)return e;return NextResponse.json({error:e instanceof Error?e.message:"Unauthorized"},{status:401})}}
