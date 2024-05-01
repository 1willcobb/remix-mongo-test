import User from "../models/User.server";
import Thought from "../models/Thought.server";
import { json } from "@remix-run/node";

export const getAllThoughts = async () => {
    try {
        console.log("Getting All Thoughts...");
        const allThoughts = await Thought.find().populate("reactions");
        if (!allThoughts.length) {
            console.log("No thoughts found");
            throw new Error("No thoughts found");
        }
        console.log("Success");
        return allThoughts;
    } catch (err) {
        console.error(err);
        throw new Error("Failed to get thoughts");
    }
};

export const getSingleThought = async (id) => {
    try {
        console.log("Getting single Thought");
        const singleThought = await Thought.findById(id).populate("reactions");
        if (!singleThought) {
            console.log("No thought found");
            throw new Error("No thought found");
        }
        console.log("Success");
        return singleThought;
    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch thought");
    }
};

export const createNewThought = async (thoughtData) => {
    try {
        console.log("Creating new thought...");
        const { thoughtText, username } = thoughtData;
        const user = await User.findOne({ username });
        if (!user) {
            console.log("No user found to create thought");
            throw new Error("No user found to create thought");
        }
        const newThought = await Thought.create(thoughtData);
        await User.findOneAndUpdate(
            { username },
            { $addToSet: { thoughts: newThought._id } },
            { new: true }
        );
        console.log("Success");
        return newThought;
    } catch (err) {
        console.error(err);
        throw new Error("Failed to create new thought");
    }
};

export const updateSingleThought = async (id, thoughtText) => {
    try {
        console.log("Updating a thought...");
        const updatedThought = await Thought.findOneAndUpdate(
            { _id: id },
            { thoughtText },
            { new: true }
        );
        if (!updatedThought) {
            console.log("Nothing found to update thought");
            throw new Error("Nothing found to update thought");
        }
        console.log("Success");
        return updatedThought;
    } catch (err) {
        console.error(err);
        throw new Error("Failed to update thought");
    }
};

export const deleteThought = async (id) => {
    try {
        console.log("Deleting a thought...");
        const thought = await Thought.findById(id);
        if (!thought) {
            console.log("No thought found");
            throw new Error("No thought found");
        }
        const updatedUser = await User.findOneAndUpdate(
            { username: thought.username },
            { $pull: { thoughts: id } },
            { new: true }
        );
        if (!updatedUser) {
            console.log("No user has this thought");
            throw new Error("No user has this thought");
        }
        const deletedThought = await Thought.findOneAndDelete({ _id: id });
        if (!deletedThought) {
            console.log("Nothing was deleted");
            throw new Error("Nothing was deleted");
        }
        console.log("Success");
        return deletedThought;
    } catch (err) {
        console.error(err);
        throw new Error("Failed to delete thought");
    }
};

export const createReaction = async (thoughtId, reactionData) => {
    try {
        console.log("Creating new thought reaction...");
        const updatedThought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $addToSet: { reactions: reactionData } },
            { new: true }
        );
        if (!updatedThought) {
            console.log("No Thought Found");
            throw new Error("No Thought Found");
        }
        console.log("Success");
        return updatedThought;
    } catch (err) {
        console.error(err);
        throw new Error("Failed to create reaction");
    }
};

export const deleteReaction = async (thoughtId, reactionId) => {
    try {
        console.log("Deleting a reaction...");
        const thought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $pull: { reactions: { _id: reactionId } } },
            { new: true }
        );
        if (!thought) {
            console.log("No thought or reaction found");
            throw new Error("No thought or reaction found");
        }
        console.log("Success");
        return thought;
    } catch (err) {
        console.error(err);
        throw new Error("Failed to delete reaction");
    }
};
