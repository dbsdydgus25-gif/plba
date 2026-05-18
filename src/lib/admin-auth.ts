import { SignJWT, jwtVerify } from "jose";

// ✅ Edge Runtime 호환: ADMIN_SECRET은 반드시 ASCII 문자만 사용
const getSecret = () => {
  const secret = process.env.ADMIN_SECRET ?? "plba-admin-fallback-secret-change-in-prod";
  return new TextEncoder().encode(secret);
};

const COOKIE_NAME = "plba_admin_token";

/** JWT 토큰 발급 */
export async function signAdminToken(): Promise<string> {
  return await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecret());
}

/** JWT 토큰 검증 */
export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export { COOKIE_NAME };
