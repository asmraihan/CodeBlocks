"use server";

import { prisma } from "../../../prisma/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authSchema } from "../validations/auth";
import type { z } from "zod"
import { m } from "framer-motion";

type Inputs = z.infer<typeof authSchema>

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
  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (user) {
    return { error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
    },
  });

  if (!newUser) {
    return { error: "Error creating user" };
  }

  return { message: "User created", user: newUser };
  revalidatePath("/")
}


export async function userLogin(data: Inputs) {

  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (!user) {
    return { error: "User not found, please try again." };
  }
  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    return { error: "Invalid email or password" };
  }

  // Create the session
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const sessionToken = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set("session", sessionToken, { expires, httpOnly: true });

  // Save the session in the database
  await prisma.session.create({
    data: {
      sessionToken,
      user_id: user.id,
      expires,
    },
  });
  return { message: true, user: user }
}



export async function getSession() {
  const sessionToken = cookies().get("session")?.value;
  if (!sessionToken) return null;

  const session = await prisma.session.findUnique({
    where: { sessionToken },
    include: {
      user: true, 
    },
  });

  if (!session || new Date() > new Date(session.expires)) {
    // The session is not found or has expired
    return null;
  }

  return session;
}



export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}


// export async function updateSession(request: NextRequest) {
//   console.log(request, "request")
//   const sessionToken = request.cookies.get("session")?.value;
//   console.log(sessionToken)
//   if (!sessionToken) return;

//   const session = await prisma.session.findUnique({
//     where: { sessionToken },
//     include: {
//       user: true  
//     },
//   });

//   if (!session) return;

//   // Refresh the session so it doesn't expire
//   const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // adjust the session duration as needed

//   // Update the session in the database
//   await prisma.session.update({
//     where: { sessionToken },
//     data: { expires },
//   });

//   // Update the session cookie
//   const res = NextResponse.next();
//   res.cookies.set({
//     name: "session",
//     value: await encrypt({ user: session.user, expires }), // Use the user from the session
//     httpOnly: true,
//     expires,
//   });
//   return res;
// }


export async function logout() {
  // Get the session token
  const sessionToken = cookies().get("session")?.value;
  if (sessionToken) {
    // Delete the session from the database
    await prisma.session.delete({
      where: { sessionToken },
    });
  }

  // Clear the session cookie
  cookies().set("session", "", { expires: new Date(0) });
  redirect("/signin");
}