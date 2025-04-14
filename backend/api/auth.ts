import { type NextRequest, NextResponse } from "next/server"
import directus from "@/lib/directus"
import { login, refresh } from "@directus/sdk"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const result = await directus.request(login(email, password))

    return NextResponse.json(result)
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { refresh_token } = body

    if (!refresh_token) {
      return NextResponse.json({ error: "Refresh token is required" }, { status: 400 })
    }

    const result = await directus.request(refresh(refresh_token))

    return NextResponse.json(result)
  } catch (error) {
    console.error("Token refresh error:", error)
    return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 })
  }
}
