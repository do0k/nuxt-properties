export default defineNuxtRouteMiddleware(async () => {
  const user = useUser()
  const {data, error} = useFetch('/api/user') 
})