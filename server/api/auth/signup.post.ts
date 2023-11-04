import { schema, useValidate } from "~/composables/useValidate";
import { auth } from "~/server/utils/lucia";
import { db } from "~/server/db";

export default defineEventHandler(async (event) => {
	const { username, password } = await useValidate(
		event,
		schema.object({
			username: schema.coerce
				.string()
				.trim()
				.min(10)
				.max(10)
				.refine(async (username) => {
					const user = await db.user.findUnique({
						where: { username },
					});
					console.log(JSON.stringify(user));
					if (user) return false;
					return true;
				}, "این کدملی قبلا در سامانه ثبت شده است"),
			password: schema.coerce
				.string()
				.min(8, { message: "رمزعبور باید حداقل ۸ کاراکتر باشد" }),
		})
	);

	try {
		const user = auth.createUser({
			key: {
				providerId: "username",
				providerUserId: username.toLowerCase(),
				password,
			},
			attributes: {
				username,
			},
		});
		const session = await auth.createSession({
			userId: await user.userId,
			attributes: {},
		});
		const authRequest = auth.handleRequest(event);
		authRequest.setSession(session);
		return sendRedirect(event, "/");
	} catch (e) {
		// throw createError("عملیات با خطا روبرو شد لطفا دوباره تلاش کنید");
		console.log(e);
	}
});
