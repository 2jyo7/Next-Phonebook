import connectDB, { PhBook } from "@/lib/DB ";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id || !mongoose.isValidObjectId(id)) {
    return NextResponse.json(
      { message: "Invalid ID", success: false },
      { status: 400 }
    );
  }

  try {
    const deletedContact = await PhBook.findByIdAndDelete(id);

    if (!deletedContact) {
      return NextResponse.json(
        { message: "Contact not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Contact deleted successfully",
      data: deletedContact,
      success: true,
    });
  } catch (error) {
    console.error("Error deleting contact:", error);

    return NextResponse.json(
      { message: "Failed to delete contact", success: false },
      { status: 500 }
    );
  }
}
