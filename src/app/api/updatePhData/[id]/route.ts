import connectDB, { PhBook } from "@/lib/DB ";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(id);

  try {
    const { PhNumber, contactName } = await request.json();

    // Validate input
    if (!PhNumber || !contactName) {
      return NextResponse.json(
        { message: "Invalid input data.", success: false },
        { status: 400 }
      );
    }

    // Update the phoneBook entry
    const updatedNumber = await PhBook.findByIdAndUpdate(
      id, // Pass the ID directly
      {
        contactName,
        PhNumber,
      },
      { new: true } // Return the updated document
    );

    if (!updatedNumber) {
      return NextResponse.json(
        { message: "Entry not found.", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Update successful",
      data: updatedNumber,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to update the phoneBook entry.",
        success: false,
        error: error,
      },
      { status: 500 }
    );
  }
}
