import User from "../models/User.server";

export const addFriend = async (userId, friendId) => {
    try {
        console.log("Adding friend...");
        const user = await User.findById(userId).populate("friends");

        if (!user) {
            console.log("No user found");
            throw new Error("No user found");
        }

        const isFriend = user.friends.some((friend) => friend.equals(friendId));

        if (isFriend) {
            console.log("Already Friends!");
            throw new Error("Already friends");
        }

        const userUpdated = await User.findByIdAndUpdate(
            userId,
            { $push: { friends: friendId } },
            { new: true }
        );

        console.log("Successfully added friend");
        return userUpdated;
    } catch (err) {
        console.error(err);
        throw new Error("Failed to add friend");
    }
};

export const deleteFriend = async (userId, friendId) => {
    try {
        console.log("Deleting friend...");
        const user = await User.findById(userId).populate("friends");

        if (!user) {
            console.log("No user found");
            throw new Error("No user found");
        }

        const isFriend = user.friends.some((friend) => friend.equals(friendId));

        if (!isFriend) {
            console.log("They are not friends to delete!");
            throw new Error("They are not friends to delete!");
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { friends: friendId } },
            { new: true }
        );

        console.log("Successfully deleted friend");
        return updatedUser;
    } catch (err) {
        console.error(err);
        throw new Error("Failed to delete friend");
    }
};
