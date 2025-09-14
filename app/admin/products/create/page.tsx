import { faker } from "@faker-js/faker";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/form/FormInput";

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
          <FormInput
            name="name"
            label="Product name"
            type="text"
            defaultValue={name}
          />
          <Button type="submit" size="lg">
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
}

export default AdminCreateProductPage;
