import 'server-only';
import {unstable_cache as cache} from 'next/cache';
import {notFound} from 'next/navigation';

import {HTTPError} from 'got';

import {createPlatformClient} from '@common/platform';

import type {Order} from './typings';

interface RetriveProductParams {
  throwNotFound?: boolean;
}

export const retrieveOrder = cache(
  async (
    domain: string,
    id: string | number,
    addtionalKey: string,
    params?: RetriveProductParams
  ) => {
    const client = await createPlatformClient(domain);
    try {
      const response = client.get(`v3/orders/${id}`);
      const order = await response.json<Order>();

      if (
        order.order_key === addtionalKey ||
        order.billing.email === addtionalKey
      ) {
        return order;
      }

      const customResponse = await response;
      customResponse.statusCode = 404;
      throw new HTTPError(customResponse);
    } catch (error) {
      if (error instanceof HTTPError) {
        if (params?.throwNotFound && error.response.statusCode === 404) {
          notFound();
        }
      }
      throw error;
    }
  }
);
