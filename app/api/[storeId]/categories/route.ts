import prismadb from '@/lib/prismadb';
import {auth} from '@clerk/nextjs';
import {NextResponse} from 'next/server';

export async function POST(req: Request, {params}: {params: {storeId: string}}) {
  try {
    const {userId} = auth();
    const body = await req.json();

    const {name, billboardId} = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', {status: 403});
    }

    if (!name) {
      return new NextResponse('Name is required', {status: 400});
    }

    if (!billboardId) {
      return new NextResponse('BillboardId is required', {status: 400});
    }

    if (!params.storeId) {
      return new NextResponse('Store is required', {status: 400});
    }

    const storeByUserId = prismadb.store.findFirst({
      where: {userId, id: params.storeId},
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', {status: 401});
    }

    const billboard = await prismadb.category.create({
      data: {name, billboardId, storeId: params.storeId},
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[CATEGORIES_POST]', error);
    return new NextResponse('Internal error', {status: 500});
  }
}

export async function GET(req: Request, {params}: {params: {storeId: string}}) {
  try {
    if (!params.storeId) {
      return new NextResponse('Store id is required', {status: 400});
    }

    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log('[CATEGORIES_GET]', error);
    return new NextResponse('Internal error', {status: 500});
  }
}
