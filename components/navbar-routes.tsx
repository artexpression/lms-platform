"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"

import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

export const NavbarRoutes = () =>{

    /**se utiliza la ruta actual, para determinar si el usuario esta en la pagina de tipo profesor */
    const pathname = usePathname();
    


     

// Check if the user is on a teacher page or a player page
 const isTeacherPage = pathname?.startsWith("/teacher");
 const isPLayerPage = pathname?.includes("/chapter");


    return (
        <div className="flex gap-x-2 ml-auto">
         {/**aqui pregunta si el suaurio esta en una pagina de profesor o normal si es asi mostrara el boton salir de lo contrario el boton modo profesor */}
            {isTeacherPage || isPLayerPage ? (
                 <Link href="/">
                <Button  size="sm" variant="ghost">
                   <LogOut className="h-4 w-4 mr-2" />
                   Exit
                </Button>
                </Link>
            ) : (
                <Link href="/teacher/courses">
                <Button size="sm" variant="ghost">Teacher Mode</Button>
                </Link>
              
            )}

            <UserButton 
            afterSignOutUrl="/"/>

        </div>
    )
}