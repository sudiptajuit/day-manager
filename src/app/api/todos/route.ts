import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, extractToken } from '@/lib/jwt';
import { handleError, successResponse, ApiError } from '@/lib/api-utils';

async function verifyAuth(req: NextRequest) {
  const token = extractToken(req);

  if (!token) {
    throw new ApiError({
      status: 401,
      message: 'Unauthorized',
    });
  }

  const payload = verifyToken(token);

  if (!payload) {
    throw new ApiError({
      status: 401,
      message: 'Invalid or expired token',
    });
  }

  return payload;
}

export async function GET(req: NextRequest) {
  try {
    const auth = await verifyAuth(req);

    const todos = await prisma.todo.findMany({
      where: { userId: auth.userId },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(todos);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAuth(req);
    const body = await req.json();
    const { title, description, dueDate } = body;

    if (!title || title.trim() === '') {
      throw new ApiError({
        status: 400,
        message: 'Title is required',
      });
    }

    const todo = await prisma.todo.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: auth.userId,
      },
    });

    return successResponse(todo, 201);
  } catch (error) {
    return handleError(error);
  }
}
