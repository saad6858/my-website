import { notFound } from "next/navigation";
import { getPost } from "@/lib/actions";
import { PostEditor } from "../../new/page";
export default async function EditPostPage({params}:{params:Promise<{id:string}>}){const {id}=await params;const post=await getPost(id);if(!post)notFound();return <PostEditor mode="edit" post={post}/>;}
