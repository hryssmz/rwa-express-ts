import prisma from "../utils/prisma";
import { upsertUser } from "../utils/password";

async function seedUser() {
  prisma.user.deleteMany();
  const userData: [string, string][] = [["john", "secret"]];
  userData.forEach(async ([username, password]) => {
    const user = await upsertUser(username, password);
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
