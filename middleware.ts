import { auth } from './lib/auth/auth'

export default auth((req) => {
  // Auth logic handled by authConfig
  // This middleware will redirect unauthenticated users
  // trying to access /dashboard/* to the login page
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
