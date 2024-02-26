import Image from "next/image"
import Link from "next/link"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Icons } from "@/components/icons"
import Navbar from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"
import { getSession } from "@/lib/action/authActions"

export default async function GeneralLayout({ children }: React.PropsWithChildren) {

  const session = await getSession();
  console.log(session, "session")
  return (
    <div>
      <Navbar session={session}/>
      {children}
      <Footer />
    </div>
  )
}