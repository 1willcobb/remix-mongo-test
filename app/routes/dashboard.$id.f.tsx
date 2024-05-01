import { getAllUsers, getUserById } from "../utils/controllers/UserController.server";
import { Form, useLoaderData, redirect, useRouteError } from "@remix-run/react";
import { json } from "@vercel/remix";
import { addFriend } from "../utils/controllers/FriendController.server";
import { useState } from "react";
export const loader = async ({params}) => {
  try {
    const users = await getAllUsers()  // Fetch all users or adjust query as needed
    const pageUser = await getUserById(params.id);

    return json({users, pageUser});
  } catch (err) {
    throw new Response("Not Found", { status: 404 });
  }
}

export const action = async ({ params, request }) => {
  const body = new URLSearchParams(await request.text());

  const friendId = body.get("friendId");
  const userId = params.id;

  console.log(friendId, userId);
  await addFriend(userId, friendId);

  return redirect(`/dashboard/${userId}/f`);
}

export default function friendUsers() {

  const {users, pageUser} = useLoaderData()
  const [showFriends, setShowFriends] = useState(false);

  return (
    <div>
      <button onClick={()=> setShowFriends(!showFriends)}>Add Friend</button>
      <ul>
        {showFriends && (
          users.map((user) => (
            <li key={user._id}>
              <Form method="post">
                <input type="hidden" name="friendId" value={user._id} />
                <button type="submit">{user.username}</button>
                <a href={`/dashboard/${user._id}/f`}>Profile</a>
              </Form>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export function ErrorBoundary({ error }) {
  useRouteError();
  console.error(error);
  return (
    <div>
      <h1>whoops</h1>
    </div>
  );
}
