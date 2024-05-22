"use server";

export async function login(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const password = formData.get("password");

  if (password === "12345") {
    return {
      status: "success",
    };
  } else {
    return {
      status: "error",
      errors: ["Wrong password"],
    };
  }
}
