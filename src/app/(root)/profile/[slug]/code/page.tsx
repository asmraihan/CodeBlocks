import React from "react";
// import { prisma } from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth-options";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ShareProfile } from "./share-profile";
import ProfileSnippets from "./display-profile-snippets";
import { Separator } from "@/components/ui/separator";

export default async function Page({ params }: { params: { slug: string } }) {
//   const user = await prisma.user.findFirst({
//     where: {
//       name: {
//         equals: params.slug,
//         mode: "insensitive",
//       },
//     },
//   });

//   if (!user) {
//     console.log("user not found");
//     notFound();
//   }

//   const snippets = await prisma.snippet.findMany({
//     where: {
//       author: {
//         name: params.slug,
//       },
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//     include: {
//       author: true,
//     },
//   });


const user = {
    name: "John Doe",
    id: "1234567890"
}

const snippets = [
    {
        id: "1234567890",
        title: "Snippet 1",
        code: "console.log('Hello World')",
        language: "javascript"
    },
    {
        id: "1234567891",
        title: "Snippet 2",
        code: "console.log('Hello World')",
        language: "javascript"
    },
    {
        id: "1234567892",
        title: "Snippet 3",
        code: "console.log('Hello World')",
        language: "javascript"
    },
    {
        id: "1234567893",
        title: "Snippet 4",
        code: "console.log('Hello World')",
        language: "javascript"
    },
    {
        id: "1234567894",
        title: "Snippet 5",
        code: "console.log('Hello World')",
        language: "javascript"
    },
    {
        id: "1234567895",
        title: "Snippet 6",
        code: "console.log('Hello World')",
        language: "javascript"
    },
    {
        id: "1234567896",
        title: "Snippet 7",
        code: "console.log('Hello World')",
        language: "javascript"
    },
    {
        id: "1234567897",
        title: "Snippet 8",
        code: "console.log('Hello World')",
        language: "javascript"
    },
    {
        id: "1234567898",
        title: "Snippet 9",
        code: "console.log('Hello World')",
        language: "javascript"
    },
    {
        id: "1234567899",
        title: "Snippet 10",
        code: "console.log('Hello World')",
        language: "javascript"
    }
]


  return (
    <div>
   <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Your Snippets</h3>
        <p className="text-sm text-muted-foreground">
          Share your profile with others to show off your snippets.
        </p>
      </div>
      <Separator />
      <ProfileSnippets
        snippets={snippets.map((snippet) => {
          return {
            id: snippet.id,
            title: snippet.title,
            code: snippet.code,
            language: snippet.language,
          };
        })}
      />
    </div>
    </div>
      
  );
}