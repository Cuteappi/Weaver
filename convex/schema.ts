import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // Users — required for ownership of chat threads/messages
    users: defineTable({
        subscriptionTier: v.union(v.literal("free"), v.literal("pro"), v.literal("enterprise")),
        subscriptionStatus: v.optional(v.union(v.literal("active"), v.literal("canceled"), v.literal("past_due"))),
        subscriptionId: v.optional(v.string()),
        customerId: v.optional(v.string()),
        subscriptionEndsAt: v.optional(v.number()),
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_subscriptionTier", ["subscriptionTier"])
        .index("by_customerId", ["customerId"]),

    // Chat threads (standalone chat)
    chatThreads: defineTable({
        userId: v.id("users"),
        title: v.string(),
        status: v.union(v.literal("draft"), v.literal("active"), v.literal("archived")),
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_ownerId_and_updatedAt", ["userId", "updatedAt"]),

    // Messages inside chat threads
    chatMessages: defineTable({
        threadId: v.id("chatThreads"),
        role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
        content: v.string(),
        model: v.optional(v.string()),
        status: v.optional(v.union(v.literal("streaming"), v.literal("final"))),
        createdAt: v.number(),
    })
        .index("by_threadId_and_createdAt", ["threadId", "createdAt"]),

    // Per-user state (pointer to the users stlst state as yo what they had open in the app)
    userState: defineTable({
        userId: v.id("users"),
        draftThreadId: v.optional(v.id("chatThreads")),
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_userId", ["userId"]),
});
