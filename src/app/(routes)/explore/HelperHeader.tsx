import { Code, Copy, Download, PencilLine, Save, Share2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export default function HelperHeader({code, setCode, selectedLanguage, setSelectedLanguage}) {


    console.log(code, "code")

  return (
    <div className="__helper_header h-[50px] bg-black/50 rounded-md text-white p-2 flex justify-between items-center">
      <div className="__btn_container flex gap-1">
        <Dialog>
          <DialogTrigger asChild>
          
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex gap-1 justify-center items-center">
                <Code />
                Save your Code!
              </DialogTitle>
              <div className="__url flex justify-center items-center gap-1">
                <Input
                  className="bg-slate-700 focus-visible:ring-0"
                  placeholder="Type your Post title"
                />
           
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
     

      
      </div>
      <div className="__tab_switcher flex justify-center items-center gap-1">
        <small>Current Language: </small>
        <Select
          defaultValue="jsx"
        //     onValueChange={(value) => {
        //         if (value === "html") {
        //             setSelectedLanguage("html");
        //         } else if (value === "css") {
        //             setSelectedLanguage("css");
        //         } else if (value === "javascript") {
        //             setSelectedLanguage("javascript");
        //     }
        //     }
        // }
        >
          <SelectTrigger className="w-[120px] outline-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jsx">jsx</SelectItem>
            {/* <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem> */}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}