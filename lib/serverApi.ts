import User from "@/types/user";
import { nextServer } from "./api";
import { cookies } from "next/headers";

export const getServerMe = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};
