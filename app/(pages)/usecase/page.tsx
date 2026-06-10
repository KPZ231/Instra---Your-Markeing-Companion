


import type { Metadata } from "next";
import { buildMetadata, pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata(pageMetadata.usecases);

export default function UseCasesPage(){
    return(
        <>
        
        </>
    );

}