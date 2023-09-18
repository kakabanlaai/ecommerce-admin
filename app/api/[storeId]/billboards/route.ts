import prismadb from '@/lib/prismadb';
import {auth} from '@clerk/nextjs';
import {NextResponse} from 'next/server';

export async function POST(req: Request, {params}: {params: {storeId: string}}) {
  try {
    const {userId} = auth();
    const body = await req.json();

    const {label, imageUrl} = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', {status: 403});
    }

    if (!label) {
      return new NextResponse('Label is required', {status: 400});
    }

    if (!imageUrl) {
      return new NextResponse('ImageUrl is required', {status: 400});
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

    const billboard = await prismadb.billboard.create({
      data: {label, imageUrl, storeId: params.storeId},
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARDS_POST]', error);
    return new NextResponse('Internal error', {status: 500});
  }
}

export async function GET(req: Request, {params}: {params: {storeId: string}}) {
  try {
    if (!params.storeId) {
      return new NextResponse('Store id is required', {status: 400});
    }

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log('[BILLBOARDS_GET]', error);
    return new NextResponse('Internal error', {status: 500});
  }
}