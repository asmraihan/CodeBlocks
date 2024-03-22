// "use server";

// import { prisma } from "../../../prisma/db";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";


// export async function getBookMarks() {
//     try {
//         const snippets = await prisma.user.findUnique({
//             where: { id: 'user-id' },
//             include: { bookmarks: { include: { snippet: true } } },
//           }).bookmarks.map(bookmark => bookmark.snippet);
          
//         return snippets;
//     } catch (error: any) {
//         return {
//             error: error.message,
//         };
//     }
// }

