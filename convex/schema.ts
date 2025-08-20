import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
	users: defineTable({
		// Basic profile fields are optional; BetterAuth stores canonical metadata
	}),

	threads: defineTable({
		ownerId: v.id("users"),
		title: v.string(),
		model: v.optional(v.string()),
		archived: v.optional(v.boolean()),
		lastMessageAt: v.optional(v.number()),
	})
		.index("by_ownerId", ["ownerId"])
		.index("by_ownerId_and_lastMessageAt", ["ownerId", "lastMessageAt"]),

	messages: defineTable({
		threadId: v.id("threads"),
		authorId: v.optional(v.id("users")),
		role: v.union(v.literal("user"), v.literal("assistant")),
		content: v.string(),
	}).index("by_threadId", ["threadId"]),

	numbers: defineTable({
		value: v.number(),
	}),
});
