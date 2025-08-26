import { Doc, Id } from "./_generated/dataModel";

// Helper to ensure a user document exists for the current identity
export async function ensureUser(ctx: any): Promise<Doc<"users">> {
	const identity = await ctx.auth.getUserIdentity();
	if (!identity) throw new Error("Not authenticated");

	const existing = await ctx.db
		.query("users")
		.withIndex("by_customerId", (q: any) => q.eq("customerId", identity.subject))
		.first();
	if (existing) return existing as Doc<"users">;

	const now = Date.now();
	const newId: Id<"users"> = await ctx.db.insert("users", {
		subscriptionTier: "free",
		createdAt: now,
		updatedAt: now,
		customerId: identity.subject,
	});
	const created = await ctx.db.get(newId);
	if (!created) throw new Error("Failed to create user");
	return created as Doc<"users">;
}
