import Image from "next/image"
import Link from "next/link"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Icons } from "@/components/icons"
import Navbar from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"

export default function GeneralLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}