import { Menu } from "lucide-react"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Sidebar from "./sidebar"
  
export const MobileSidebar = () =>{

    return(
        <Sheet>
            <SheetTrigger className="md:hidden  hover:opacity-75 transition">
            <Menu/>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 bg-red-500">
                <Sidebar/>
            </SheetContent>
         
        </Sheet>
       
    )
}
