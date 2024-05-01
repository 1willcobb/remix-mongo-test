import User from "../models/User.server";
import Thought from "../models/Thought.server";
import { json } from "@remix-run/node";

export const getAllUsers = async () => {
  try {
    return await User.find({});
  } catch (err) {
    throw new Error("Failed to fetch users");
  }
}

export const getUserById = async (id) => {
  try {
    return await User.findById({_id: id}).populate("friends").populate("thoughts");
  } catch (err) {
    throw new Error("Failed to fetch user");
  }
}

export const createUser = async (username: string, email: string) => {
  try {
    //Check if the user exists
    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (existingUser) {
      console.log("User already exists");
      return;
    }
    return await User.create({ username, email });
  } catch (err) {
    throw new Error("Failed to create user");
  }
}

export const updateSingleUser = async (id, update) => {
  try {
    const user = await User.findById({ _id: id});
    if (!user) {
      console.log("No user found");
      return json({ message: "No user found" });
    }

    const { username, email } = update;
    update = {};
    if (username) {
      update.username = username;
    }
    if (email) {
      update.email = email;
    }

    return await User.findOneAndUpdate({ _id: id },
      { $set: update },
      { new: true });
  } catch (err) {
    throw new Error("Failed to update user");
  }
}

export const deleteUser = async (id) => {
  try {
    // find the user 
    const user = await User.findOne({ _id: id });

    // check if user exists
    if (!user) {
      console.log("No user found");
      return json({ message: "No user found" });
    }

    // delete thoughts associated with the user. They are stored by username
    await Thought.deleteMany({
      username: user.username,
    });

    return await User.findOneAndDelete({ _id: id });
  } catch (err) {
    throw new Error("Failed to delete user");
  }
}








//   try {
//     console.log("Updating user...");
//     const id = req.params.userId;
//     const { username, email } = req.body;

//     // check if username or email was submitted
//     if (!username && !email) {
//       return res
//         .status(400)
//         .json({ message: "No username or email field to update" });
//     }

//     // create a single place to update on the condition that minimally only one was submitted
//     const update = {};
//     if (username) {
//       update.username = username;
//     }
//     if (email) {
//       update.email = email;
//     }

//     const updatedUser = await User.findOneAndUpdate(
//       { _id: id },
//       { $set: update },
//       { new: true }
//     );

//     // Check if the update went through
//     if (!updatedUser) {
//       return res.status(404).json({ message: "No User found" });
//     }

//     console.log("Success");
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// },

