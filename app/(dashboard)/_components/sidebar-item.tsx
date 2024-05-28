"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
/**interfaz define la estructura de las props que el componente sidebar esperar recibir */
interface SidebarItem {
    icon: LucideIcon;
    label: string;
    href: string;
}
/**desestructura las props recibidas y asigna el alias icon a icon */
export const SidebarItem = ({
    icon: Icon,
    label,
    href,
}: /*toma la interfaz como modelo */SidebarItem) => {
    /**obtiene la ruta actual del navegador */
    const pathname = usePathname();
    /**permite la navegacion programatica */
    const router = useRouter();
    /**resalta el item en este caso el boton donde se encuentra ubicado el usuario dentro de la pag, es decir si estoy en dashboard resaltara el boton dashbard con el color correspondiente de la pagina */
    const isActive = (pathname === "/" && href === "/") || pathname === href || pathname?.startsWith(`${href}/`);
  /**manejador de click */
    const onClick = () => {
        router.push(href);
    };

    return (
        /**el usurio da click en el boton y este  */
        <button
        /**cuando el susuario haga click cambiara la ruta por la asignada al boton mostrando dicha ruta  */
            onClick={onClick}
            /**especifica que el boton es solo un boton nada mas  */
            type="button"
            className={cn(
                "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon size={22} className={cn("text-slate-500", isActive && "text-sky-700")} />
                {label}
            </div>
            <div className={cn("ml-auto opacity-0 border-x-2 border-sky-700  h-14 transition-all", isActive && "opacity-100")} />
        </button>
    );
}
