import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import {
  fetchAdminProductDetails,
  updateProductAction,
  updateProductImageAction,
} from "@/utils/actions";

// Interface for the Props
interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

async function EditProductPage({ params }: EditProductPageProps) {
  // Getting the ID and destructure the product
  const { id } = await params;
  const { name, company, description, featured, price, image } =
    await fetchAdminProductDetails(id);

  // Returned JSX
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">Update product</h1>
      <div className="border p-8 rounded">
        {/* IMAGE INPUT CONTAINER */}
        <ImageInputContainer
          image={image}
          name={name}
          text="Update image"
          action={updateProductImageAction}
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={image} />
        </ImageInputContainer>

        {/* FORM CONTAINER */}
        <FormContainer action={updateProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            {/* Hidden input with product ID */}
            <input type="hidden" name="id" value={id} />

            {/* Rest of the fields */}
            <FormInput
              type="text"
              name="name"
              label="Product Name"
              defaultValue={name}
            />
            <FormInput type="text" name="company" defaultValue={company} />
            <PriceInput defaultValue={price} />
          </div>
          <TextAreaInput
            name="description"
            labelText="Product description"
            defaultValue={description}
          />
          <div className="mt-6">
            <CheckboxInput
              name="featured"
              label="Featured"
              defaultChecked={featured}
            />
          </div>
          <SubmitButton text="Update product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}

export default EditProductPage;
