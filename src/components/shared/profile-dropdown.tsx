
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

export default function ProfileDropdown() {
    //   const { data: session } = useSession();

    const router = useRouter();
    
    const session = {
        user: {
            name: "John Doe",
        }
    }

    const signOut = async () => {
        console.log("Signing out");
        await logout();
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <Image
                        className="w-6 h-6 transition-opacity duration-300 rounded-full select-none ring-1 ring-zinc-100/10 hover:opacity-80"
                        src={session?.user?.image}
                        alt="avatar"
                        height={48}
                        width={48}
                    />

                    <span className="ml-2">{session?.user.name}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="flex justify-between">
                    <div className="text-xs font-medium">{session?.user.name}</div>
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