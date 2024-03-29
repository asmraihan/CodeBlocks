import Image from "next/image"
import Link from "next/link"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Icons } from "@/components/icons"
import Navbar from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"
import { getSession } from "@/lib/action/authActions"
import { Container } from "@/components/shared/container"

export default async function GeneralLayout({ children }: React.PropsWithChildren) {

  const session = await getSession();
  return (
    <div>
      <Container>
        <Navbar session={session} />
        <div className="min-h-[calc(100vh-64px)]">
          {children}
        </div>
        <Footer />
      </Container>
    </div>
  )
}