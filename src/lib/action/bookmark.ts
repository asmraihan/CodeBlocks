"use server";

import { prisma } from "../../../prisma/db";
import { getSession } from "./authActions";
import { revalidatePath } from "next/cache";

export async function addBookmark(userId: string, snippetId: string) {
    try {
        const result = await prisma.bookmark.create({
            data: {
              user: {
                connect: {
                  id: userId
                }
              },
              snippet: {
                connect: {
                  id: snippetId
                }
              }
            }
          });
        return result;

    } catch (error: any) {
        return {
            error: error.message,
        };
    }
    //   revalidatePath("/profile");

}

export async function removeBookmark(userId: string, snippetId: string) {
    try {
        const result = prisma.bookmark.delete({
            where: {
              userId_snippetId: {
                userId,
                snippetId
              },
            },
          });
        return result;
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
    //   revalidatePath("/profile");

}

