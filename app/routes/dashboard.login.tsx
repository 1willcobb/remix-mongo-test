import { ActionFunctionArgs, redirect,json } from "@vercel/remix";
import { Outlet, Form, useRouteError } from "@remix-run/react";
import { createUser } from "../utils/controllers/UserController.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const body = new URLSearchParams(await request.text());
    const username = body.get("username");
    const email = body.get("email");

    if (!username || !email) {
      throw new Error("Username and email are required");
    }

    const newUser = await createUser(username, email);

    if (!newUser) {
      // Assuming createUser returns `null` or a similar marker when user exists
      return json({ message: "User already exists" }, { status: 409 });
    }

    return redirect(`/dashboard/${newUser._id}`);
  } catch (err) {
    console.error(err);
    // Return a JSON error message for consistency
    return json({ message: err.message || "An error occurrded" }, { status: 500 });
  }
};

export default function Dashboard() {
  return (
    <div>
      <Form method="post">
        <h2>Create a New User</h2>
        <input type="text" name="username" required />
        <input type="email" name="email" required />
        <button type="submit">Submit</button>
      </Form>
      <Outlet />
    </div>
  );
}

export function ErrorBoundary({ error }) {
  const newError = useRouteError();
  console.error(error);
  return (
    <div>
      <h1>An error occurred</h1>
      <p>{newError.message}</p>
    </div>
  );
}