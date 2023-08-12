// first, import the Prisma client to access Prisma methods
import { PrismaClient } from "@prisma/client";
// initialize the Prisma client for your application
const prisma = new PrismaClient();

// create an asynchronous main  function
async function main() {
  console.log(await prisma);
  // connect to the database using Prisma connect() method
  await prisma.$connect();

  // using the Prisma create() method, add data based on the model fields
  // Note: other fields as autogenerated, and no need to specify them here
  await prisma.employees.create({
    data: {
      Firstname: "Kim",
      Surname: "Larry",
      Email: "test@gmail.com",
    },
  });

  // Add another field using create() method
  await prisma.employees.create({
    data: {
      Firstname: "Julie",
      Surname: "Morgan",
      Email: "test@gmail.com",
    },
  });

  // you can find the added fields using findMany() method
  const employees = await prisma.employees.findMany();

  // log these added fields to the console
  console.dir(employees, {
    depth: Infinity,
  });
}

main()
  // catch any erroes
  .catch(console.error)
  // disconnect the prisma client once all processes are executed
  .finally(() => prisma.$disconnect());
