import { NextResponse } from "next/server";

import { prisma } from "../../../../../prisma/index";

async function connectPrisma() {
  try {
    await prisma.$connect();
  } catch (e) {
    console.log(e);
    return Error("Unsuccessful ❌");
  }
}

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { email, password } = await req.json();

    const user = await prisma?.user.findFirst({
      where: {
        email,
        password,
      },
    });

    console.log("User", user);

    if (
      user?.firstName &&
      user?.password === password &&
      user?.email === email
    ) {
      if (user.email) {
        return NextResponse.json(
          { message: "Successful login ✅", user },
          { status: 200 },
        );
      }
    }

    return NextResponse.json(
      { message: "Something went wrong, please check your credentials" },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json({ message: "Error ❌", error }, { status: 500 });
  } finally {
    // disconnect when all is said and done
    await prisma.$disconnect();
  }
};

// forgot password
export const PUT = async (req: Request, res: NextResponse) => {
  await connectPrisma();
  const id = req.url.split("/user/")[1];
  try {
    // get stuff from req.body
    const { firstName, lastName, email, role } = await req.json();
    const resp = await prisma.user.update({
      data: {
        firstName,
        lastName,
        email,
        role,
      },
      where: {
        id,
      },
    });

    return NextResponse.json(
      { message: "Successfully updated 🔌", resp },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: "Success", error }, { status: 500 });
  } finally {
    // disconnect when all is said and done
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: Request, res: NextResponse) => {
  await connectPrisma();
  try {
    const id = req.url.split("/user/")[1];

    const resp = await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { message: "Successfully deleted 🗑️", resp },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failure ❌ 🗑️", error },
      { status: 500 },
    );
  } finally {
    // disconnect when all is said and done
    await prisma.$disconnect();
  }
};
