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

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAuth(req);
    const { id } = await context.params;
    const todoId = parseInt(id);

    if (isNaN(todoId)) {
      throw new ApiError({
        status: 400,
        message: 'Invalid todo ID',
      });
    }

    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      throw new ApiError({
        status: 404,
        message: 'Todo not found',
      });
    }

    if (todo.userId !== auth.userId) {
      throw new ApiError({
        status: 403,
        message: 'Forbidden',
      });
    }

    const body = await req.json();
    const { title, description, completed, dueDate } = body;

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: {
        ...(title !== undefined && { title: title.trim() }),
        ...(description !== undefined && {
          description: description ? description.trim() : null,
        }),
        ...(completed !== undefined && { completed }),
        ...(dueDate !== undefined && {
          dueDate: dueDate ? new Date(dueDate) : null,
        }),
      },
    });

    return successResponse(updatedTodo);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAuth(req);
    const { id } = await context.params;
    const todoId = parseInt(id);

    if (isNaN(todoId)) {
      throw new ApiError({
        status: 400,
        message: 'Invalid todo ID',
      });
    }

    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      throw new ApiError({
        status: 404,
        message: 'Todo not found',
      });
    }

    if (todo.userId !== auth.userId) {
      throw new ApiError({
        status: 403,
        message: 'Forbidden',
      });
    }

    await prisma.todo.delete({
      where: { id: todoId },
    });

    return successResponse({ id: todoId });
  } catch (error) {
    return handleError(error);
  }
}