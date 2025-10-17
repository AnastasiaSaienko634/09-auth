import User from "@/types/user";
import { nextServer } from "./api";
import { cookies } from "next/headers";
import { SessionResponse } from "./clientApi";

export const getServerMe = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<SessionResponse>("/auth/session");
  return data.success;
};
