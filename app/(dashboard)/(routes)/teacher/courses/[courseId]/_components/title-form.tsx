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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


//importacion de de modulos y tecnologias



interface TitleFormProps
 {
    initialData: {
        title: string;
      
    };
    courseId: string;
}

/**
 * define una interfaz de typescript para las props del componente
 */
const formSchema = z.object ({
    //se utiliza la biblioteca zod para  definir un esquema de validacion

    title: z.string().min(1,{
        message: "Title is required"
    })
})
/**
 * definicion de un esquema de validacion usando zod
 */

// define un componente funcional que recibe iniitial.. y course.. como props
export const Titleform = ({
    initialData,
    courseId,
}: TitleFormProps //sigue el modelo de la interfaz
) =>{
   // aqui se crea un estado local llamado isEdi.. con la funcion de actualizacion setIsEdi..
   const [isEditing, setIsEditing] = useState(false); //maneja el estado de edicion con useState
   const toggleEdit = () => setIsEditing((current) => !current) // fucnion para alternal el estado de la edicion entre true y false
  
const form = useForm<z.infer<typeof formSchema>>({
    //inicializa el formulario usando React hook y zod para la validacion
    resolver: zodResolver(formSchema),
    defaultValues: initialData
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
            Course title
                <Button onClick={toggleEdit} variant="ghost">
                    {/**boton para alternar entre los modos de edicion y vista */}
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                            <>
                                  <Pencil  className="h-4 w-4 mr-2"/>
                            Edit title</>
                      
                        )
                    }
                  
                </Button>
        </div>
        {/**muestra el titulo del cursor cuando no esta en modo edicion */}
        {!isEditing && (
            <p className="text-sm mt-2">
                {initialData.title}
            </p>
        )}
      {/**Muestra el formulario cuando esta en modo de edicion */}
        {isEditing && (
            <Form {...form}>
                <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-4">

                <FormField 
                control={form.control}
                name="title"
                render= {({ field }) =>(
                    <FormItem>
                        <FormControl>
                            <Input
                            disabled={isSubmitting}
                            placeholder="e.g. 'Advanced web development"
                            {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>

                    <div>
                        <Button
                        disabled={!isValid || isSubmitting}
                        type="submit"
                        >
                           Save
                        </Button>
                    </div>

                </form>
            </Form>
        )}
        
    </div>
   )
}

