import { Separator } from "@/components/ui/separator"
import { Metadata } from "next"
import Image from "next/image"
import { SidebarNav } from "./sidebar-nav"
import { getSession } from "@/lib/action/authActions"



export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}



interface SettingsLayoutProps {
  children: React.ReactNode
}

export default async function SettingsLayout({ children }: SettingsLayoutProps) {
  const session = await getSession();

  const sidebarNavItems = [
    {
      title: "Profile",
      href: `/profile/${session?.user?.id}`
    },
    {
      title: "Account",
      href: `/profile/${session?.user?.id}/account`
    },
    {
      title: "Notifications",
      href: `/profile/${session?.user?.id}/notifications`
    },
    {
      title: "Your Blocks",
      href: `/profile/${session?.user?.id}/code`
    }

  ]

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}