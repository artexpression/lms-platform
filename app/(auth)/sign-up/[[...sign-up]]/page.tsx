import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function Page() {
  return (
    <div className="h-full min-h-screen grid grid-cols-1  w-full lg:w-auto mx-auto">
    <div className="h-full lg:flex  flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-center space-y-4 pt-16">
        <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome!</h1>
        <p className="text-base text-[#7E8CA0]">Log in or create account to get back to your dashboard!</p>
      </div>

      <div className="flex items-center justify-center mt-2 mb-6">
        <ClerkLoaded>
        <SignUp path="/sign-up"/ >;
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className="animate-spin text-muted-foreground"/>
       
        </ClerkLoading>
     
      </div>
   
    </div>
    
  </div>
  )
}