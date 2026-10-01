import { NextResponse } from "next/server";
import { adminList,serializeAdmin } from "@/lib/admin-db";
import type { PortfolioItem } from "@/types";
export async function GET(){try{const items=await adminList<PortfolioItem>("portfolio");return NextResponse.json(serializeAdmin(items),{headers:{"Cache-Control":"s-maxage=60, stale-while-revalidate=300"}})}catch{return NextResponse.json([])}}
