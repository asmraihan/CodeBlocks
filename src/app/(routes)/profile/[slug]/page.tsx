import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";
import { getSession } from "@/lib/action/authActions";
import { redirect } from "next/navigation";

export default async function SettingsProfilePage() {
  const session = await getSession();
  console.log(session, "session")
  if (!session?.user) {
    redirect("/signup");
  }
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm session={session} />
    </div>
  )
}