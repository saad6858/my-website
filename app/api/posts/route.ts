import { NextResponse } from "next/server";
import { getPosts } from "@/lib/actions";
export async function GET(req:Request){const {searchParams}=new URL(req.url);const limit=Math.min(100,Math.max(1,Number(searchParams.get("limit")||20)));const category=searchParams.get("category")||undefined;try{return NextResponse.json(await getPosts(limit,category),{headers:{"Cache-Control":"s-maxage=60, stale-while-revalidate=300"}})}catch{return NextResponse.json([], {status:200})}}
