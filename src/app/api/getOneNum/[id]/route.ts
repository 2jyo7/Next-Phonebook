import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose"; // Ensure mongoose is imported for ObjectId validation
import connectDB, { PhBook } from "@/lib/DB ";

connectDB();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid ID format.", success: false },
        { status: 400 }
      );
    }

    // Find the entry by ID
    const getOneNum = await PhBook.findById(id);

    if (!getOneNum) {
      return NextResponse.json(
        { message: "Entry not found.", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Fetched the phoneBook entry successfully.",
        data: getOneNum,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to fetch the phoneBook entry with the given ID.",
        success: false,
        error: error, // Send only the error message
      },
      { status: 500 }
    );
  }
}
