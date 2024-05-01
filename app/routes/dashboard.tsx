import { Link, Outlet, useRouteError } from "@remix-run/react";

export default function Dashboard() {
  return (
    <div>
      <Link to="/dashboard" style={{fontSize: "75px", textDecoration: "none"}}>Dashboard</Link>
      <br />
      <Link to="/dashboard/">Dash</Link>
      <br />
      <Link to="/dashboard/login">Create a New User</Link>
      <br />
      <Link to="/dashboard/allUsers">All Users</Link>
      <h1>Welcome to Remix</h1>
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