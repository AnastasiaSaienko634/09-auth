import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../api";

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");
  try {
    const { data } = await api("/notes", {
      params: { tag },
    });
    return NextResponse.json(data);
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

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const { data } = await api.post("/notes", body);
    return NextResponse.json(data);
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
