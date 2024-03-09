"use client";

import React from "react";
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

export default function Home() {
  let generateZeros = (n: number) => Array(n).fill(0);
  let [keys, setKeys] = React.useState(generateZeros(20));

  let variants = [
    {
      name: "Rotate Between Words",
      preview: <RotateText key={keys[7]} />,
      code: ROTATE_WORDS_CODE,
    },

  ];

  function restartAnimation(index: number) {
    setKeys((prevKeys) => {
      const newKeys = [...prevKeys]; // copy the previous keys
      newKeys[index] += 1; // increment the key at the given index
      return newKeys;
    });
  }

  let [query, setQuery] = React.useState("");

  let filteredVariants =
    query === ""
      ? variants
      : variants.filter((variant) => {
        return variant.name.toLowerCase().includes(query.toLowerCase());
      });

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
      <div className="w-full">
        <div className="flex flex-col items-center min-h-screen py-2 space-y-12">
          <div className="mb-6 w-full">
            <Spotlight filteredVariants={filteredVariants} />
          </div>
          {filteredVariants.length > 0 ? (
            filteredVariants.map((variant, index) => (
              <Tabs defaultValue="preview" className="w-full" key={index}>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                  <div className="flex justify-between w-full mb-2 lg:mb-0">
                    <h1
                      id={variant.name.toLowerCase().replace(" ", "-")}
                      className="text-xl"
                    >
                      {variant.name}
                    </h1>

                    <Button
                      variant="ghost"
                      className="lg:hidden"
                      size="icon"
                      onClick={() => restartAnimation(index)}
                    >
                      <ReloadIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 space-x-0 lg:space-x-6">
                    <TabsList className="grid w-[355px] lg:w-[400px] grid-cols-2">
                      <TabsTrigger value="preview">
                        Preview
                      </TabsTrigger>
                      <TabsTrigger value="code">
                        Code
                      </TabsTrigger>
                    </TabsList>

                    <div className="hidden lg:flex space-x-6">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => restartAnimation(index)}
                            >
                              <ReloadIcon className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="mr-12">
                            <p>Restart Animation</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>

                <TabsContent value="preview">
                  <Card className="bg-background">
                    <CardContent className="bg-background text-primary space-y-2 mt-4 overflow-hidden">
                      {variant.preview}
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
                            {variant.code}
                          </SyntaxHighlighter>
                        </ScrollArea>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ))
          ) : (
            <div>
              <h1 className="text-center font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]">
                No variants found.
              </h1>
              <p className="text-center">
                {" "}
                If you want to see a variant added, please message me on{" "}
                <Link
                  className="text-primary underline"
                  href="https://twitter.com/abdo_eth"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </Link>
                &nbsp;@asmraihan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}