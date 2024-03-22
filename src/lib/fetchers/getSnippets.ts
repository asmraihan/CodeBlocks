"use server";

import { prisma } from "../../../prisma/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function getSnippets(userId: string) {
    try {
        const snippets = await prisma.snippet.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                bookmarks: {
                    where: { userId: userId },
                    select: { id: true }, // Select only the id field
                },
            },
        });

        // Map over the snippets to add a 'bookmarked' property
        const result = snippets.map(snippet => ({
            ...snippet,
            bookmarked: snippet.bookmarks.length > 0,
        }));

        return result;
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
}

