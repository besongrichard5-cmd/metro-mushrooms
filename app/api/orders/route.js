import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Order from '../../../models/Order';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]/route'; // You might need to adjust this import based on your setup

export async function POST(req) {
  try {
    await dbConnect();
    
    // Parse the incoming request body
    const body = await req.json();
    
    // Create a new order in the database
    const order = await Order.create(body);

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    
    // Fetch all orders (You'd usually want to protect this for admin only, or filter by user ID)
    const orders = await Order.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
