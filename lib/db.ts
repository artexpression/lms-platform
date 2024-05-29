// Suggested code may be subject to a license. Learn more: ~LicenseLog:2591320868.

import { PrismaClient } from '@prisma/client'
//el codigo aqui arriba importa el cliente prisma, clase que se geenera automaticamente x prisma, basada en el archivo schema, esta clase contiene todos los metodos necesarios para interactuar con la base de datos

 declare global {
    // declaracion global que es necesaria en typescript para que el compilador reconozca  globalThis.prisma sin error
    var prisma: PrismaClient | undefined }


// el codigo aqui abajo exporta la instancia de prisma,  globalThis.. aqui  se evalua si  ya esta definida, si no se crea una nueva instancia de prismaClient
export const db = globalThis.prisma || new PrismaClient()
 if (process.env.NODE_ENV !== 'production') globalThis.prisma = db
//comprueba si el entorno de ejecucion no esta en produccion,  si es asi asigna la instancia de prisma client a globalThis.prisma, asegura que la misma instancia de prisma client se reutilice en cada recarga de modulo durante el desarrollo, evitando creaciones de multiples instancias 
