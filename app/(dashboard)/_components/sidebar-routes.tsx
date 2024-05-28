"use client"

import { BarChart, Compass, Layout, List } from "lucide-react"
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

/**las de aqui abajo son definiciones de ruta */
/**definicion de rutas para usuarios invitados "" averiguar mas sobre esto */

const guestRoutes = [
    {
        icon: Layout,
        label: "dashboard",
        href: "/",
    },
    {
        icon: Compass,
        label: "Browser",
        href: "/search",
    }
];

/**esto de abajo hace parte del capitulo dynamic layout */
/**definicion de rutas para usuarios de rol profesor"" averiguar mas sobre esto */
const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics",
    }
];




export const SidebarRoutes = () =>{
    /**obtiene la ruta actual */
    const pathname = usePathname();
    /**determina si la apg actual es de profesor */
    const isTeacherPage = pathname?.includes("/teacher");
    /**selecciona las rutas correctas */
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;
   
    return (
        <div className="flex flex-col w-full">

            {routes.map((route) => (
                <SidebarItem 
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
          

        </div>
    )
}