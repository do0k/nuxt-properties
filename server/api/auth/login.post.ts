import {LuciaError} from 'lucia'
import { schema, useValidate } from '~/composables/useValidate'

export default defineEventHandler (async (event) => {
  const {username, password} = await useValidate(event, schema.object({
    username: schema.coerce.string().trim().min(11).max(11),
    password: schema.coerce.string().min(8, {message: 'رمزعبور باید حداقل ۸ کاراکتر باشد'})
  }))

  try {
    const key = await auth.useKey('username', username.toLowerCase(), password)
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {}
    })
    const authRequest = auth.handleRequest(event)
    authRequest.setSession(session)
    return sendRedirect(event, '/')
  } catch (e) {
    if (
			e instanceof LuciaError &&
			(e.message === "AUTH_INVALID_KEY_ID" ||
				e.message === "AUTH_INVALID_PASSWORD")
		) {
			// user does not exist
			// or invalid password
			throw createError({
				message: "Incorrect username or password",
				statusCode: 400
			});
		}
		throw createError({
			message: "An unknown error occurred",
			statusCode: 500
		});
  }
})