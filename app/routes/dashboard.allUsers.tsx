import { json } from "@vercel/remix";
import { Outlet, Form, useRouteError, useLoaderData } from "@remix-run/react";
import { getAllUsers } from "../utils/controllers/UserController.server";
export const loader = async () => {
  try {
    const users = await getAllUsers()  // Fetch all users or adjust query as needed

    return json(users);
  } catch (err) {
    throw new Response("Not Found", { status: 404 });
  }
}

export default function Dashboard() {
  const users = useLoaderData()

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <a href={`/dashboard/${user._id}/f`}>{user.username}</a>
          </li>
        ))}
      </ul>
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