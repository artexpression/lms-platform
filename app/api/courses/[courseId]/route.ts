import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * Maneja la actualización de la URL de la imagen del curso con PATCH
 */
export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string } },
) {
    try {
        const { userId } = auth(); // Obtiene el id del usuario autenticado
        const { courseId } = params; // Obtiene el id del curso desde los parámetros de la solicitud
        const values = await req.json(); // Obtiene los datos enviados en la solicitud

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 }); // Si no hay usuario autenticado, retorna un error 401
        }

        // Verificar que la URL de la imagen está presente en los datos enviados
        if (!values.imageUrl || typeof values.imageUrl !== 'string') {
            throw new Error("URL de imagen inválida");
        }

        // Actualizar el curso en la base de datos
        const course = await db.course.update({
            where: {
                id: courseId,
                userId, // Verifica que el curso pertenezca al usuario
            },
            data: {
                ...values, // Actualiza los datos del curso con los valores recibidos
            },
        });

        // Registro de la URL de la imagen en la consola
        console.log("Imagen subida correctamente:", values.imageUrl);

        return NextResponse.json(course); // Retorna el curso actualizado en la respuesta
    } catch (error) {
        console.log("[COURSE_ID]", error); // Loguea cualquier error
        return new NextResponse("Internal Error", { status: 500 }); // Retorna un error 500 en caso de falla
    }
}
