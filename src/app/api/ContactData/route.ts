import connectDB, { PhBook } from "@/lib/DB ";
import { NextRequest, NextResponse } from "next/server";

connectDB();

// POST REST API for PhoneBook
export async function POST(request: NextRequest) {
  try {
    const { PhNumber, contactName } = await request.json();
    // console.log(PhNumber, contactName);

    const createdNumber = new PhBook({
      contactName,
      PhNumber,
    });

    const savedNumber = await createdNumber.save();

    const response = NextResponse.json({
      message: "Login successful",
      data: savedNumber,
      success: true,
    });
    // console.log(response);

    return response;
  } catch (error) {
    console.log(error);
  }
}

// GET REST API for PhoneBook
export async function GET(request: NextRequest) {
  try {
    console.log(request.url);

    // Fetch all entries from the database
    const allPhNum = await PhBook.find();

    // Prepare and return the response
    const response = NextResponse.json({
      message: "Data retrieved successfully",
      data: allPhNum,
      success: true,
    });
    // console.log(response);

    return response;
  } catch (error) {
    console.error("Error retrieving data:", error);

    // Return an error response
    return NextResponse.json(
      {
        message: "Error retrieving data",
        error: error,
        success: false,
      },
      { status: 500 }
    );
  }
}
// export async function GET() {
//   try {
//     const allNumbers = await PhBook.find().populate("PhNumbers");

//     const response = NextResponse.json({
//       message: "Login successful",
//       success: true,
//     });
//     console.log(allNumbers);

//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }
