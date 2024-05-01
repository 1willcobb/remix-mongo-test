import { LoaderFunctionArgs } from "@vercel/remix";
import { Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { getUserById } from "../utils/controllers/UserController.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return await getUserById(params.id);
};

export default function user() {
  const user = useLoaderData();

  console.log(user);
  return (
    <div style={{display: "flex", justifyContent: "center", gap: "100px"}}>
      <div>
        <h1>User</h1>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <h2>Friends</h2>
        <ul>
          {user.friends.map((friend) => (
            <li key={friend._id}>
              <a href={`/dashboard/${friend._id}/f`}>{friend.username}</a>
            </li>
          ))}
        </ul>
        <h2>Thoughts</h2>
        <ul>
          {user.thoughts.map((thought) => (
            <li key={thought._id}>
              <p>{thought.thoughtText}</p>
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export function ErrorBoundary({ error }) {
  useRouteError();
  console.error(error);
  return (
    <div>
      <h1>An error occurred</h1>
    </div>
  );
}
