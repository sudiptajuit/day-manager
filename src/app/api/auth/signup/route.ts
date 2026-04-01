import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import { generateToken } from '@/lib/jwt';
import { handleError, successResponse, ApiError } from '@/lib/api-utils';
import { SignupRequest } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body: SignupRequest = await req.json();
    const { email, password, name } = body;

    if (!email || !password) {
      throw new ApiError({
        status: 400,
        message: 'Email and password are required',
      });
    }

    if (password.length < 6) {
      throw new ApiError({
        status: 400,
        message: 'Password must be at least 6 characters',
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ApiError({
        status: 409,
        message: 'Email already registered',
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || undefined,
      },
    });

    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    const { password: _, ...userWithoutPassword } = user;

    return successResponse(
      {
        token,
        user: userWithoutPassword,
      },
      201
    );
  } catch (error) {
    return handleError(error);
  }
}
