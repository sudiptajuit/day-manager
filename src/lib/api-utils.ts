import { NextRequest, NextResponse } from 'next/server';

export interface ApiErrorOptions {
  status?: number;
  message: string;
}

export class ApiError extends Error {
  public status: number;

  constructor(options: ApiErrorOptions) {
    super(options.message);
    this.status = options.status || 500;
  }
}

export function handleError(error: unknown): NextResponse {
  console.error('[API Error]', error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.status }
    );
  }

  if (error instanceof SyntaxError) {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { success: false, error: 'Internal server error' },
    { status: 500 }
  );
}

export function successResponse<T>(data: T, status: number = 200): NextResponse {
  return NextResponse.json({ success: true, data }, { status });
}
