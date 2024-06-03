const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "HTML" },
        { name: "CSS" },
        { name: "JavaScript" },
        { name: "TypeScript" },
        { name: "React JS" },
        { name: "Next JS" },
        { name: "Vue JS" },
        { name: "Node JS" },
        { name: "SvelteKit" },
        { name: "React Native" },
        { name: "Sass" },
        { name: "Git" },
      ]
    });
    console.log("Successfully seeded the database categories");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();