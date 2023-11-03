import { schema, useValidate } from "~/composables/useValidate";
import { auth } from "~/server/utils/lucia";

export default defineEventHandler(async (event) => {
	const {username, password} = await useValidate(event, schema.object({
		username: schema.coerce.string().trim().min(10).max(10),
		password: schema.coerce.string().min(8, {message: 'رمزعبور باید حداقل ۸ کاراکتر باشد'})
	}))

	// Validations go here

	try {
		const user = auth.createUser({
			key: {
				providerId: 'username',
				providerUserId: username.toLowerCase(),
				password
			},
			attributes: {
				username
			}
		})
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		})
		const authRequest = auth.handleRequest(event)
		authRequest.setSession(session)
		return sendRedirect(event, '/')
	} catch (e) {
		console.log(e)
	}
});
