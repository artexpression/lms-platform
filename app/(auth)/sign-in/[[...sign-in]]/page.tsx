import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function Page() {
  return  (
      // Un div que ocupa toda la altura y tiene una cuadrícula de una columna
    <div className="h-full min-h-screen grid grid-cols-1  w-full lg:w-auto mx-auto">
      {/**
       * Un div que ocupa toda la altura y tiene una cuadrícula de dos columnas
       */}
      <div className="h-full lg:flex  flex-col items-center justify-center bg-gray-100 px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome Back!</h1>
          <p className="text-base text-[#7E8CA0]">Log in or create account to get back to your dashbpard!</p>
        </div>

        <div className="flex items-center justify-center mt-2 mb-6">
          {  /* El componente SignIn se muestra cuando Clerk ha terminado de cargar*/}
          <ClerkLoaded>
          <SignIn path="/sign-in"/>;
          </ClerkLoaded>
          {/**El componente Loader2 se muestra mientras Clerk está cargando */}
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground"/>
         
          </ClerkLoading>
       
        </div>
     
      </div>
      
    </div>
   
  )  
}