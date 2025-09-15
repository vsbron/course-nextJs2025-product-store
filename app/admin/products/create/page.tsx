import { faker } from "@faker-js/faker";

import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { createProductAction } from "@/utils/actions";

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
        <FormContainer action={createProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              type="text"
              name="name"
              label="Product name"
              defaultValue={name}
            />
            <FormInput
              type="text"
              name="company"
              label="Company"
              defaultValue={company}
            />
            <PriceInput />
            <ImageInput />
          </div>
          <TextAreaInput
            name="description"
            labelText="Product description"
            defaultValue={description}
          />
          <div className="mt-6">
            <CheckboxInput name="featured" label="Featured" />
          </div>
          <SubmitButton text="Create a product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}

export default AdminCreateProductPage;
