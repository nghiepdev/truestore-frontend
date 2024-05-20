'use client';

import {Suspense, use, useState} from 'react';

import clsx from 'clsx';

import {
  addCart,
  type Product,
  type ProductVariation,
  useProductVariation,
} from '@model/product';
import offcanvas from '@ui/offcanvas';
import {SpinNumber} from '@ui/spin-number';

import ProductCheckoutCart from './product-checkout-cart';

interface ProductCartActionsProps {
  min?: number;
  max?: number;
  product: Product;
  variationPromise?: Promise<ProductVariation[]>;
}

export default function ProductCartActions({
  min = 1,
  max,
  product,
  variationPromise,
}: ProductCartActionsProps) {
  let productVariations: ProductVariation[] = [];
  if (variationPromise) {
    productVariations = use(variationPromise);
  }
  const variantion = useProductVariation(productVariations);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className='flex gap-x-3'>
      <SpinNumber value={quantity} min={min} max={max} onChange={setQuantity} />
      <div
        className={clsx(
          'flex grow gap-x-3',
          '*:multi-[`rounded;text-white;font-bold;px-2;py-3;flex-1;flex;items-center;justify-center;gap-x-2;transition;whitespace-nowrap`]',
          '[&_span[class*=i-]]:multi-[`text-xl`]',
          'sm:*:multi-[`px-5`]'
        )}
      >
        <button
          className='bg-black hover:bg-black/80'
          onClick={async () => {
            if (!variantion) {
              alert('Please, choose product options');
              return;
            }
            await addCart({
              product: {
                id: product.id,
                name: product.name,
              },
              quantity,
              variantion: {
                id: variantion.id,
                price: variantion.price,
                regular_price: variantion.regular_price,
                sale_price: variantion.sale_price,
                image: variantion.image.src || product.images?.[0].src,
                attributes: variantion.attributes.map(attr => attr.option),
              },
            });
            offcanvas.show({
              direction: 'right',
              content: (
                <Suspense>
                  <ProductCheckoutCart onClose={offcanvas.close} />
                </Suspense>
              ),
            });
          }}
        >
          <span className='i-carbon-shopping-cart-plus'></span>
          <span>Add to cart</span>
        </button>
        <button className='bg-orange-600 hover:bg-orange-500'>
          <span className='i-carbon-wallet'></span>
          <span>Buy now</span>
        </button>
      </div>
    </div>
  );
}
