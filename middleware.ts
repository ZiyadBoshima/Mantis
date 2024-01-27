import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware'

export default withAuth({
	callbacks: {
		authorized: async ({ req }) => {
      try {
        const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET, cookieName: 'next-auth.session-token', raw: true, secureCookie: true})
        
        if (!token) return false;

        return true;
      }
      catch (err) {
        return false;
     	}
	  }
  }
});

export const config = {
  matcher: ['/((?!auth/signup|auth/login|api/auth|auth/signin).*)']
}
//((?!auth/signup|auth/login|api/auth|auth/signin).*)