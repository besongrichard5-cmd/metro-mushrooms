import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Product from '../../../../models/Product';
import { PRODUCTS } from '../../../../constants/data';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route'; 

const ADMIN_EMAIL = 'opararichard47@gmail.com';

export async function POST(req) {
  try {
    await dbConnect();
    
    // Protect route for Admin only
    const session = await getServerSession(authOptions);
    if (!session || session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    
    // Check if products already exist to prevent duplicate seeding
    const existingCount = await Product.countDocuments();
    if (existingCount > 0) {
      return NextResponse.json({ success: false, message: 'Products already seeded. Delete them first if you want to re-seed.' }, { status: 400 });
    }

    // Insert all products
    const result = await Product.insertMany(PRODUCTS.map(p => {
      // Create a copy without the old string/number id, let mongo create _id
      const { id, ...rest } = p;
      return rest;
    }));

    return NextResponse.json({ success: true, count: result.length, message: 'Products seeded successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Failed to seed products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed products' },
      { status: 500 }
    );
  }
}
