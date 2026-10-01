"use client";
import { Pie,PieChart,Cell,Legend,ResponsiveContainer,Tooltip } from "recharts";
const cells=["#10b981","#60a5fa","#f472b6","#f59e0b","#818cf8","#38bdf8","#64748b"];
export function ChartSources({data}:{data:Array<{source:string;count:number}>}){return <ResponsiveContainer width="100%" height={300}><PieChart><Pie data={data} dataKey="count" nameKey="source" innerRadius={70} outerRadius={105} paddingAngle={2}>{data.map((_,i)=><Cell key={i} fill={cells[i%cells.length]}/>)}</Pie><Tooltip contentStyle={{background:"#0f172a",border:"1px solid #334155",borderRadius:12,color:"#f8fafc"}}/><Legend/></PieChart></ResponsiveContainer>}
