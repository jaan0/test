import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      // Only guard /admin routes via middleware; API routes will enforce RBAC server-side.
      if (!req.nextUrl.pathname.startsWith("/admin")) return true;
      // Allow access to login page without auth
      if (req.nextUrl.pathname === "/admin/login") return true;
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
