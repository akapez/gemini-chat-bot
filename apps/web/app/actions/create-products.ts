"use server";

import { revalidateTag } from "next/cache";

export default async function createProducts(formData: FormData) {
  await fetch(`${process.env.API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  revalidateTag("products");
}
