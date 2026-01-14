import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, USER_ROLES, UserRole } from "../config/auth.config";

// Key for JWT verification - in production this should be in env
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-at-least-32-chars-long"
);

export type SessionPayload = {
  default_company_view: number | string;
  // Add other JWT fields here
  exp?: number;
};

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);

  if (!session?.value) {
    return null;
  }

  try {
    // If you are using real JWT verification:
    // const { payload } = await jwtVerify(session.value, JWT_SECRET);
    
    // For now, assuming simply reading payload for the logic demo
    // In real app, MUST verify signature
    const payload = decodeJwtPart(session.value) as SessionPayload;
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getUserRole(): Promise<UserRole> {
  const session = await getSession();

  if (!session) {
    return USER_ROLES.GUEST;
  }

  // Logic: default_company_view == 0 -> User, != 0 -> Company
  // Convert to number just in case
  const companyView = Number(session.default_company_view);
  
  if (companyView === 0) {
    return USER_ROLES.USER;
  }

  return USER_ROLES.COMPANY;
}

// Helper to decode JWT without verification (for middleware usage where perf matters, 
// though verify is better security practice)
function decodeJwtPart(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}
