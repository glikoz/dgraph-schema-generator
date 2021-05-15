import { stringify } from "postcss";
import { Repository } from "./repository";

export class Generator{
 constructor(rep:Repository) {
     
     const edges=rep.GetEdgeMetadatas();
     const nodes=rep.GetMetadatas();

     const typeDict=new Map();
     edges.forEach(edge => {
         
     });
 }   
}