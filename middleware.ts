import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware'

export default withAuth({
	callbacks: {
		authorized: async ({ req }) => {
      try {
        const isProduction = process.env.NODE_ENV === 'production';
        const cookieName = (isProduction) ? '__Secure-next-auth.session-token' : 'next-auth.session-token'
        
        const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET, cookieName, raw: true, secureCookie: true})
        
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