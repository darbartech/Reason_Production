import { json } from '@/lib/server/http';

export const dynamic = 'force-dynamic';

const notFound = () => json({ success: false, error: 'not_found' }, 404);

// More specific routes win, so this only answers unknown /api paths.
export async function GET() { return notFound(); }
export async function HEAD() { return notFound(); }
export async function POST() { return notFound(); }
export async function PUT() { return notFound(); }
export async function PATCH() { return notFound(); }
export async function DELETE() { return notFound(); }
export async function OPTIONS() { return notFound(); }
