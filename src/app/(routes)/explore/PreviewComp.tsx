import React from 'react'

import { loadLanguage, langNames, langs } from '@uiw/codemirror-extensions-langs';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import HelperHeader from './HelperHeader';
import CodeEditor from './CodeEditor';
import RenderCode from './RenderCode';


const PreviewComp = ({ ...variant }) => {
  console.log(variant, "variant")

  const [code, setCode] = React.useState("");
  const [selectedLanguage, setSelectedLanguage] = React.useState("jsx");
  console.log(selectedLanguage)
  return (
    <div>
     <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        className="h-[calc(100dvh-60px)] min-w-[350px]"
        defaultSize={50}
      >
        <HelperHeader code={code} setCode={setCode}  selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
        <CodeEditor code={code} setCode={setCode}  selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        className="h-[calc(100dvh-60px)] min-w-[350px]"
        defaultSize={50}
      >
        <RenderCode code={code} setCode={setCode}  selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage}></RenderCode>
      </ResizablePanel>
    </ResizablePanelGroup>
    </div>
  )
}

export default PreviewComp