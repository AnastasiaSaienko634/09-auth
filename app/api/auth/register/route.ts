import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../api";
import { cookies } from "next/headers";
import { parse } from "cookie";
export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const apiResponse = await api.post("auth/register", body);
    const cookieStore = await cookies();
    const setCookie = apiResponse.headers["set-cookie"];
    if (setCookie) {
      const cookieArr = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArr) {
        const parsed = parse(cookieStr);
        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: Number(parsed["Max-Age"]),
        };

        if (parsed.accessToken) {
          cookieStore.set("accessToken", parsed.accessToken, options);
        }
        if (parsed.refreshToken) {
          cookieStore.set("refreshToken", parsed.refreshToken, options);
        }
      }
      return NextResponse.json(apiResponse.data);
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status }
    );
  }
}
