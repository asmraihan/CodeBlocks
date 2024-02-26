"use server";

import { prisma } from "../../../prisma/db"; 
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

let sessionCache: any = null;


export async function addSnippet(formData: FormData) {
  // const session = []

  const title = String(formData.get("title"));
  const code = String(formData.get("code"));
  const language = String(formData.get("language"));
  console.log(title, code, language)
  // const authorId = session?.user.id;
  // const authorName = session?.user.name;

  try {
      await prisma.snippet.create({
          data: {
              title,
              code,
              language,
              authorId : "1111",
          },
      });
  } catch (error: any) {
      return {
          error: error.message,
      };
  }
  revalidatePath("/profile");
  // redirect(`/profile/${authorName}`);
}

