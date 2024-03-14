"use server";

import { prisma } from "../../../prisma/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "./authActions";
import { uploadFile } from "./upLoadFile";
import { ProfileFormData } from "@/lib/types"



export async function updateProfile(formData: ProfileFormData) {
    const session = await getSession();
    const imageName = await uploadFile(formData.image, "avatars")
    if (!imageName) {
        return {
            error: "Failed to upload image",
        };
    }
    try {
        const result = await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                name: formData.username,
                bio: formData.bio,
                avatar: imageName,
                urls: {
                    create: formData.urls.map((url: { value: string }) => {
                        return {
                            value: url.value,
                        };
                    }),
                },
            },
        })
        return result

    } catch (error: any) {
        return {
            error: error.message,
        };
    }
}

