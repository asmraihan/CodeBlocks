"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

export default function ProfileSnippets({ snippets }: { snippets: any[] }) {
  const router = useRouter();
  return (
    <Table>
      <TableCaption>Recently created snippets.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Language</TableHead>
          <TableHead className="text-right">ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {snippets.map((snippet) => {
          return (
            <TableRow
              key={snippet.id}
              onClick={() => {
                router.push(`/snippet/${snippet.id}`);
              }}
              className="cursor-pointer"
            >
              <TableCell>{snippet.title}</TableCell>
              <TableCell>{snippet.language}</TableCell>
              <TableCell className="text-right">
                {snippet.id.slice(0, 4)}...
                {snippet.id.slice(-4)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}