"use client"
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReloadIcon, EyeOpenIcon, CodeIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Spotlight } from "./spotlight";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vividBlack } from "@/styles/vivid-black"
import { ROTATE_WORDS_CODE } from "./code-snippets";
import { RotateText } from "./variant-previews";

import { getSnippets } from "@/lib/fetchers/getSnippets";
import PreviewComp from "./PreviewComp";
import { Heart } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { addBookmark, removeBookmark } from "@/lib/action/bookmark";
import { getSession } from "@/lib/action/authActions";
import { toast } from "sonner";

interface CodeBlockProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  title: string;
  code: string;
  language: string;
  authorId: string;
  bookmarked?: boolean;
};

export default function Home() {
  let generateZeros = (n: number) => Array(n).fill(0);
  let [keys, setKeys] = React.useState(generateZeros(20));


  const [isLoading, setIsLoading] = React.useState(true);
  const [codeBlocks, setCodeBlocks] = React.useState<CodeBlockProps[] | { error: any }[]>([]);


  useEffect(() => {
    const data = async () => {
      setIsLoading(true);
      const user = await getSession();
      const data = await getSnippets(user?.user.id as string);
      console.log(data, "data")
      setCodeBlocks(data as CodeBlockProps[]);
      setIsLoading(false);
    };
    data();
  }
    , []);


  let [query, setQuery] = React.useState("");

  let filteredBlocks =
    query === ""
      ? codeBlocks
      : codeBlocks.filter((block): block is CodeBlockProps => {
        if ('error' in block) {
          return false;
        }
        return block.title.toLowerCase().includes(query.toLowerCase());
      });


  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center mt-[40vh]">
        <LoadingSpinner size={80} />
      </div>
    );
  }

  const handleBookMark = async (block: CodeBlockProps) => {
    const user = await getSession();
    if (block.bookmarked) {
      const result = await removeBookmark(user?.user?.id as string, block.id as string);
      if ('id' in result) {
        toast.success("Bookmark removed successfully.");
        // Update the state to reflect the change
        //@ts-ignore
        setCodeBlocks(codeBlocks.map(block => block.id === block.id ? { ...block, bookmarked: false } : block));
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } else {
      const result = await addBookmark(user?.user?.id as string, block?.id as string);
      if ('id' in result) {
        toast.success("Bookmark added successfully.");
        //@ts-ignore
        setCodeBlocks(codeBlocks.map(block => block.id === block.id ? { ...block, bookmarked: true } : block));
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
      <div className="w-full">
        <div className="flex flex-col items-center min-h-screen py-2 space-y-12">
          {/* <div className="mb-6 w-full">
            <Spotlight filteredBlocks={filteredBlocks} />
          </div> */}
          {filteredBlocks && filteredBlocks.length > 0 ? (
            filteredBlocks.map((block: CodeBlockProps | { error: any; }, index) => {
              if ('error' in block) {
                return <div>Error: {block.error}</div>;
              } else {
                return (
                  <Tabs defaultValue="preview" className="w-full" key={index}>
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                      <div className="flex justify-between w-full mb-2 lg:mb-0">
                        <h1
                          id={block.title.toLowerCase().replace(" ", "-")}
                          className="text-xl"
                        >
                          {block.title}
                        </h1>
                        <Button
                          variant="ghost"
                          className="lg:hidden"
                          size="icon"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 space-x-0 lg:space-x-6">
                        <TabsList className="grid w-[355px] lg:w-[400px] grid-cols-2">
                          <TabsTrigger value="preview">Preview</TabsTrigger>
                          <TabsTrigger value="code">Code</TabsTrigger>
                        </TabsList>
                        <div className="hidden lg:flex space-x-6">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleBookMark(block)}
                                >
                                  <Heart className={`w-4 h-4 ${block.bookmarked ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="mr-12">
                                <p>Mark as favorite</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                    <TabsContent value="preview">
                      <Card className="bg-background">
                        <CardContent className="bg-background text-primary space-y-2 mt-4 overflow-hidden">
                          <PreviewComp {...block} />
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="code">
                      <Card className="bg-background">
                        <CardContent className="space-y-2">
                          <div className="rounded-md bg-primary-foreground dark:bg-primary-foreground p-6 mt-6">
                            <ScrollArea className="h-96">
                              <SyntaxHighlighter showLineNumbers customStyle={{ background: 'transparent' }}
                                //@ts-ignore
                                language="jsx" style={vividBlack}>
                                {block.code}
                              </SyntaxHighlighter>
                            </ScrollArea>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                );
              }
            })
          ) : (
            <div>
              <h1 className="text-center font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem] mt-16">
                No Code found.
              </h1>
              <p className="text-center">
                {" "} If you want to see a Code added, please message me on{" "}
                <Link
                  className="text-primary underline"
                  href="https://www.facebook.com/asmraihanbh"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </Link>
                &nbsp;@asmraihanbh.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}