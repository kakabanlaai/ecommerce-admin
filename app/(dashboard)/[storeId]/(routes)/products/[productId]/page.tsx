import prismadb from '@/lib/prismadb';

import {ProductForm} from './components/product-form';

const ProductPage = async ({
  params,
}: {
  params: {productId: string; storeId: string};
}) => {
  const product = !(params.productId === 'new')
    ? await prismadb.product.findUnique({
        where: {
          id: params.productId,
        },
        include: {
          images: true,
          colors: {include: {color: true}},
        },
      })
    : null;

  const initialData = product
    ? {...product, colors: product.colors.map((item) => item.color)}
    : null;

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={initialData}
        />
      </div>
    </div>
  );
};

export default ProductPage;
