import prisma from "../utils/prisma";
import { createUser } from "../utils/password";

async function seedUser() {
  await prisma.user.deleteMany();
  const userData: [string, string][] = [["john", "secret"]];
  userData.forEach(async ([username, password]) => {
    const user = await createUser(username, password);
    console.log(`Created user ${user.id}`);
  });
}

async function main() {
  await seedUser();
}

main()
  .catch(console.error)
  .finally(() => {
    prisma.$disconnect();
  });
