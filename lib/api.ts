import { NextResponse } from 'next/server';
import type { ApiError } from '@/lib/errors';

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ data }, init);
}

export function fail(error: ApiError, status = 400) {
  return NextResponse.json({ error }, { status });
}
