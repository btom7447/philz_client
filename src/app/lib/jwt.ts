import { jwtVerify, SignJWT } from "jose";
import { AuthUser } from "../types/auth";

export type AppJwtPayload = AuthUser;

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const secret = new TextEncoder().encode(JWT_SECRET);

/**
 * Create a JWT (Node + Edge safe)
 */
export async function signToken(
  user: AppJwtPayload,
  expiresIn: string = "7d",
): Promise<string> {
  return new SignJWT({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatarUrl || "",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .setSubject(user.id) // optional but recommended
    .sign(secret);
}

/**
 * Verify JWT safely (EDGE SAFE)
 */
export async function verifyToken(
  token: string,
): Promise<AppJwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);

    return {
      id: payload.id as string,
      name: payload.name as string,
      email: payload.email as string,
      role: payload.role as AuthUser["role"],
      avatarUrl: (payload.avatarUrl as string) || "",
    };
  } catch {
    return null;
  }
}
