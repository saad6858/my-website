"use client";
import { useCallback, useState } from "react";
import type { ToastType } from "@/components/ui/Toast";
export function useToast(){ const [toasts,setToasts]=useState<Array<{id:string;message:string;type:ToastType}>>([]); const addToast=useCallback((message:string,type:ToastType="info")=>{const id=crypto.randomUUID();setToasts(t=>[...t,{id,message,type}]);return id},[]); const removeToast=useCallback((id:string)=>setToasts(t=>t.filter(x=>x.id!==id)),[]); return {toasts,addToast,removeToast}; }
