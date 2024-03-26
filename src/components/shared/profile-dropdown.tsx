
import React from "react";
import {
    DropdownMenu,
    DropdownMenuGroup,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
// import { useSession } from "next-auth/react";
// import { signOut } from "next-auth/react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/action/authActions";

export default function ProfileDropdown({ session }: any) {

    const router = useRouter();

    const signOut = async () => {
        await logout();
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <Image
                        className="w-6 h-6 transition-opacity duration-300 rounded-full select-none ring-1 ring-zinc-100/10 hover:opacity-80"
                        src={`/images/avatars/${session?.user?.avatar}`}
                        alt="avatar"
                        height={48}
                        width={48}
                    />

                    <span className="ml-2">{session?.user?.name ? session?.user?.name : "Update Profile"}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="flex justify-between">
                    <div className="text-xs font-medium">{session?.user?.name ? session?.user?.name : "User"}</div>
                    <Badge>Member</Badge>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span>Settings</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem onSelect={() => signOut()}>
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}