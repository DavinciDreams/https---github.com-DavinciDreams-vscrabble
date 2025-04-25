import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      )
    }

    // Here you would:
    // 1. Generate a sign-in token
    // 2. Send an email with the sign-in link
    // 3. Store the token in your database

    return NextResponse.json({ 
      success: true,
      message: 'Sign in link sent' 
    })
  } catch (error) {
    console.error('Sign in error:', error)
    return NextResponse.json(
      { message: 'Failed to process sign in' },
      { status: 500 }
    )
  }
}