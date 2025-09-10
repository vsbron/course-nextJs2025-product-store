import db from "@/utils/db";

async function AboutPage() {
  // Create profile in Prisma
  const profile = await db.testProfile.create({
    data: {
      name: "Random name",
    },
  });

  // Get all users from DB
  const users = await db.testProfile.findMany();

  // Returned JSX
  return (
    <div>
      {users.map(({ id, name }) => (
        <h2 key={id} className="text-2xl font-bold">
          {name}
        </h2>
      ))}
    </div>
  );
}

export default AboutPage;
