import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Cart from '../../../models/Cart';

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Usually, you would get the userId from the active session
    // For now, we expect it in the body, or handle guest carts differently
    const { userId, items } = body;

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    // Find cart for user and update it, or create a new one if it doesn't exist (upsert)
    const cart = await Cart.findOneAndUpdate(
      { userId: userId },
      { items: items },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, cart }, { status: 200 });
  } catch (error) {
    console.error('Failed to update cart:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    
    // Get userId from query params
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    const cart = await Cart.findOne({ userId: userId });

    return NextResponse.json({ success: true, cart }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}
