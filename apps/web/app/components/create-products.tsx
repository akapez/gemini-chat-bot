import createProducts from "../actions/create-products";

export default async function CreateProduct() {
  return (
    <div>
      <form action={createProducts}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input type="text" id="price" name="price" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
