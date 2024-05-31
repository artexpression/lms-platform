"use client"
//componente cliente
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
Form,
FormControl,
FormField,
FormItem,
FormMessage
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";


//importacion de de modulos y tecnologias



interface ImageFormProps
 {
    initialData: Course;
    courseId: string;
}

/**
 * define una interfaz de typescript para las props del componente
 */
const formSchema = z.object ({
    //se utiliza la biblioteca zod para  definir un esquema de validacion

    ImageUrl: z.string().min(1,{
        message: "Image is required"
    })
})
/**
 * definicion de un esquema de validacion usando zod
 */

// define un componente funcional que recibe iniitial.. y course.. como props
export const ImageForm = ({
    initialData,
    courseId,
}: ImageFormProps //sigue el modelo de la interfaz
) =>{
   // aqui se crea un estado local llamado isEdi.. con la funcion de actualizacion setIsEdi..
   const [isEditing, setIsEditing] = useState(false); //maneja el estado de edicion con useState
   const toggleEdit = () => setIsEditing((current) => !current) // fucnion para alternal el estado de la edicion entre true y false
  
const form = useForm<z.infer<typeof formSchema>>({
    //inicializa el formulario usando React hook y zod para la validacion
    resolver: zodResolver(formSchema),
    defaultValues: {
        
     ImageUrl: initialData?.imageUrl || "",
        
    }
   });


   //extracion de los datos de envio y validez del formulario 
   const {isSubmitting, isValid} = form.formState;
   const router = useRouter(); //inicializa el enrutador de next
   const onSubmit = async (values: z.infer<typeof formSchema>) =>{
    /**
     * definicion de envio del formulario 
     */
    console.log(values);
    try {
        await axios.patch(`/api/courses/${courseId}`, values);
        toast.success("Course updated successfully");
        router.refresh();
    } catch (error) {
        toast.error("Something went wrong");
        
    }
   }

   return (
    <div className="mt-6 border bg-slate-100 roundedmd p-4">
        <div className="font-medium flex items-center justify-between">
            CourseImage
                <Button onClick={toggleEdit} variant="ghost">
                    {/**boton para alternar entre los modos de edicion y vista */}
                    {isEditing && (
                        <>Cancel</>
                    ) }
                    {!isEditing && !initialData.imageUrl &&(
                        <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Add an image
                        </>
                    )}
                    {!isEditing  && initialData.imageUrl &&(
                            <>
                                  <Pencil  className="h-4 w-4 mr-2"/>
                            Edit image</>
                      
                        )
                    }
                  
                </Button>
        </div>
        {/**muestra el titulo del cursor cuando no esta en modo edicion */}
        {!isEditing && (
          !initialData.imageUrl ? (
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                <ImageIcon className="h-10 w-10 text-slate-500"/>
            </div>
          ): (
            <div className="relative aspect-video mt-2">
                
                <Image
                src={initialData.imageUrl}
                alt="upload"
                className="absolute inset-0 object-cover rounded-md"
                fill
                />
            </div>
          )
           
        )}
      {/**Muestra el formulario cuando esta en modo de edicion */}
        {isEditing && (
           <div>
            <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
                if(url) {
                    onSubmit(
                        {
                            ImageUrl: url
                        }
                    )
                }
            }}/>
           <div className="text-xs text-mueted-foreground mt-4">
            16;9 aspect ratio recommended
           </div>
            
           </div>
        )}
        
    </div>
   )
}

