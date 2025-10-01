"use server";

import { db } from "@/db/drizzle";
import { User, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUsers() {
    try {
        const allUsers = await db.select({
            id: users.id, // Updated to match the schema
            name: users.name,
            role: users.role,
            address: users.address
        }).from(users);
        return allUsers;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Adjusting the createUser function to make the id property optional
export async function createUser(user: Omit<User, "createdAt" | "updatedAt" | "id">) {
    try {
        await db.insert(users).values({
            ...user,
        });
    } catch (error) {
        console.error(error);
        return { error: "Failed to create user" };
    }
}

export async function updateUser(user: Omit<User, "createdAt" | "updatedAt">) {
    try {
        await db.update(users).set({
            name: user.name,
            role: user.role,
            address: user.address
        }).where(eq(users.id, user.id)); // Updated to use id
    } catch (error) {
        console.error(error);
        return { error: "Failed to update user" };
    }
}

export async function deleteUser(id: string) {
    try {
        await db.delete(users).where(eq(users.id, Number(id))); // Convert id to number
    } catch (error) {
        console.error(error);
        return { error: "Failed to delete user" };
    }
}