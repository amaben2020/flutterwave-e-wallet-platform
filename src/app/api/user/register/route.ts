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
    // get stuff from req.body
    const { firstName, lastName, email, role, password } = await req.json();
    console.log("email", email);
    const resp = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        role,
        password,
      },
    });

    if (resp.email) {
      return NextResponse.json({ message: "Success", resp }, { status: 200 });
    }

    return NextResponse.json(
      { message: "Something went wrong", resp },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json({ message: "Success", error }, { status: 500 });
  } finally {
    // disconnect when all is said and done
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request, res: NextResponse) => {
  await connectPrisma();
  const id = req.url.split("/user/")[1]; // get the id from the url i.e https://localhost/user/${id}
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
