import prismadb from '@/lib/prismadb';
import {auth} from '@clerk/nextjs';
import {NextResponse} from 'next/server';

export async function GET(
  req: Request,
  {params}: {params: {billboardId: string}}
) {
  try {
    if (!params.billboardId) {
      return new NextResponse('Billboard id is required', {status: 400});
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_GET]', error);
    return new NextResponse('Internal error', {status: 500});
  }
}

export async function PATCH(
  req: Request,
  {params}: {params: {storeId: string; billboardId: string}}
) {
  try {
    const {userId} = auth();
    const body = await req.json();

    const {label, imageUrl} = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', {status: 403});
    }

    if (!params.billboardId) {
      return new NextResponse('Billboard id is required', {status: 400});
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

    const billboard = await prismadb.billboard.update({
      where: {
        id: params.billboardId,
      },
      data: {label, imageUrl, storeId: params.storeId},
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARDS_POST]', error);
    return new NextResponse('Internal error', {status: 500});
  }
}

export async function DELETE(
  req: Request,
  {params}: {params: {storeId: string; billboardId: string}}
) {
  try {
    console.log(1);
    const {userId} = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', {status: 403});
    }

    if (!params.billboardId) {
      return new NextResponse('Billboard id is required', {status: 400});
    }

    const storeByUserId = prismadb.store.findFirst({
      where: {userId, id: params.storeId},
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', {status: 401});
    }

    const billboard = await prismadb.billboard.delete({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARd_DELETE]', error);
    return new NextResponse('Internal error', {status: 500});
  }
}
