"use server";

import { prisma } from "../../../prisma/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function getSnippets() {
    try {
        const result = await prisma.snippet.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return result;
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
}

