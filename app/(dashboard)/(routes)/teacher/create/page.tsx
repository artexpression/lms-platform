"use client"
/**valida esquemas */
import * as z from "zod";
/**se utiliza para hace rpeticiones HTTP */
import axios from "axios";
/**integra zod con react-hook-form */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

/***
 * Impprtacion de la interfaz de usuario 
 */
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
}from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";
/***
 *  importacion de toas notificacion de algun error
 */


/**
 * define el esquema de validacion del formulario con zod, es como el mensaje de validacion del campo del titulo
 */
const formSchema = z.object ({
    title: z.string().min(1, {
        message: "Title required",
    }),
});

/**
 * definicion del componente principal
 */
const CreatePage = () =>{
    /**inicializa el router para navegacion */
    const router = useRouter();
    /**configura el formulario con "useForm" usando el esquema de validacion "formSceham" y valores por defecto */
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "hola",
        },
    });

    /**define el estado del formulario */

  const { isSubmitting, isValid} = form.formState;

  /**define la funcion onSubmit que maneja el envio del formulario */
  const onSubmit =  async (values: z.infer<typeof formSchema>) =>{
    try {
        /**peticion post con axios,  */
        const response = await axios.post("/api/course", values);
        /**redirije a una nueva pagina si se tiene exito */
        router.push(`/teacher/courses/${response.data.id}`);
    } catch {
        /**mensaje de error si falla*/
        toast.error("Something went wrong")
    }
  }


  /**renderiza el formulario de la interfaz */
    return (
       <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
        <div>
            {/**titulo */}
            <h1 className="text-2xl">
                Name Your course
            </h1>
            {/**descripcion */}
            <p className="text-sm text-slate-600">
                What would you like to name your course? Don&apos;t worry, you can change this later
            </p>
            {/**formulario */}
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-8">
                    
                    <FormField 
                    control = {form.control}
                    name = "title"
                    render= {({ field }) =>(
                        <FormItem>
                         <FormLabel >
                            Course title
                         </FormLabel>
                         <FormControl>
                            <Input
                            disabled={isSubmitting}
                            placeholder="e.g. Advance web development"
                            {...field}
                            />
                         </FormControl>
                         <FormDescription>
                            what will you teach in this course?
                         </FormDescription>
                         <FormMessage>
                            
                         </FormMessage>
                        </FormItem>
                    )}  />

                    <div className="flex items-center gap-x-2 ">
                        <Link href="/">
                            <Button
                            type= "button"
                            variant="ghost">
                                Cancel
                                </Button>
                                </Link>
                                <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                >
                                    Next
                                </Button>
                    </div>

                  

                </form>
            </Form>
        </div>

       </div>
      );
}



// Suggested code may be subject to a license. Learn more: ~LicenseLog:2652631163.
export default CreatePage;