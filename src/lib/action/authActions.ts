"use server";

import { prisma } from "../../../prisma/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const bcrypt = require("bcryptjs");
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.JWT_KEY;

const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1800 sec from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}



export async function userRegister(data: any) {
  console.log(data)

  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (user) {
    throw new Error("Product not found, please try again.")
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
    },
  });
  revalidatePath("/")
}


export async function userLogin(data: any) {

  const user = await prisma.user.findUnique({ where: { email: data.email } });
  console.log(user)
  if (!user) {
    return new NextResponse("'Invalid email or password'", { status: 401 })
  }
  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    return new NextResponse("'Invalid email or password'", { status: 401 })
  }

  // Create the session
  const expires = new Date(Date.now() + 10 * 180000);
  const session = await encrypt({ user, expires });
  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  console.log("logout")
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
  redirect("/signin");
}


export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 180000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
