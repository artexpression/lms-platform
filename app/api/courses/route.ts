import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
/**
 * importacion de modulos 
 */


/**
 * se exporta una funcion asincrona llamada POST, toma un obj request como argumento
 * esta funcion maneja la solicitu POST a esta ruta especifica
 */
export async function POST(
    req: Request,
    ) {
        try {
            const { userId } = auth(); // obtener el id del suaurio que esta realizando la solicitud, verificando la autenticidad del usuario, si es valido devuelve un objeto con el id del usuario
            
            const { title } = await req.json(); // obtener el titulo del curso que se esta creando
            if (!userId) {
                return new NextResponse("Unauthorized", { status: 401 });
            }
            /**
             * aqui en el if dice que si no esta autenticado es decir no se obtiene un userId este no tiene la autorizacion por lo que mostrara el status 401
             */
            

            /**
             * aqui abajo si el usuario esta autenticado se crea un nuevo registro en la base de datos con la tabla course utilizando db.course.create la creacion se guarda en la avrible course
             */
            const  course = await db.course.create({
                data: {
                    userId,
                    title,
                   
                }
            });

            //retorna la respuesta en formato json con los datos del nuevo curso creado
          return NextResponse.json(course);

   //el error que atrapa si no se puede crear un nuevo curso 
        } catch (error) {
            console.log("[COURSES]", error);
            return new NextResponse("Internal Error", { status: 500 });
        }
    }