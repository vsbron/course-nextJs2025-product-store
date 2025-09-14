import { faker } from "@faker-js/faker";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Server action (temporarily here)
const createProductAction = async (formData: FormData) => {
  "use server";
  const name = formData.get("name") as string;
  console.log(name);
};

function AdminCreateProductPage() {
  // Some faker initial data for the form
  const name = faker.commerce.productName();
  const company = faker.company.name();
  const description = faker.lorem.paragraph({ min: 10, max: 12 });

  // Returned JSX
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">Create product</h1>
      <div className="border p-8 rounded-md">
        <form action={createProductAction}>
          <div className="mb-4">
            <Label htmlFor="name" className="mb-2">
              Product Name
            </Label>
            <Input id="name" name="name" type="text" defaultValue={name} />
          </div>
          <Button type="submit" size="lg">
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
}

export default AdminCreateProductPage;
