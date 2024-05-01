import {
  Form,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  redirect,
  useLoaderData,
} from "@remix-run/react";

import { json } from "@vercel/remix";
import {
  getAllUsers,
  createUser,
} from "./utils/controllers/UserController.server";

export const loader = async () => {
  try {
    const users = await getAllUsers(); // Fetch all users or adjust query as needed

    return json(users);
  } catch (err) {
    throw new Response("Not Found", { status: 404 });
  }
};

export function Layout({ children }: { children: React.ReactNode }) {
  // const users = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
