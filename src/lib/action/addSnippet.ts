"use server";

import { prisma } from "../../../prisma/db"; 
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "./authActions";



export async function addSnippet(formData: FormData) {
    const session = await getSession();

    console.log(session)

  const title = String(formData.get("title"));
  const code = String(formData.get("code"));
  const language = String(formData.get("language"));
  console.log(title, code, language)

  try {
      await prisma.snippet.create({
          data: {
              title,
              language,
              code,
              authorId : session.user.id,
          },
      });
    
  } catch (error: any) {
      return {
          error: error.message,
      };
  }
//   revalidatePath("/profile");
  // redirect(`/profile/${authorName}`);
}

