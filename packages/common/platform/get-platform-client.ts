import ky from 'ky';
import memoize, {memoizeClear} from 'memoize';
import ms from 'ms';

import * as Sentry from '@sentry/nextjs';

import {getPlatformConfig} from './get-platform-config';

async function getClient(domain: string) {
  const platform = await getPlatformConfig(domain);

  return ky.create({
    prefixUrl: platform.wp_api,
    headers: {
      Authorization: `Basic ${Buffer.from(platform.wp_auth, 'utf-8').toString(
        'base64',
      )}`,
    },
    timeout: ms('30s'),
    retry: {
      limit: 3,
      methods: ['post', 'put'],
    },
    hooks: {
      beforeRetry: [
        ({request, retryCount}) => {
          console.info(`Retrying [${retryCount + 1}]: ${request.url}`);
        },
      ],
      beforeRequest: [
        // Should be work in the future
        // request => {
        //   const clientIp = cookies().get('client_ip')?.value;
        //   if (isIp(clientIp)) {
        //     request.headers.set('x-forwarded-for', clientIp);
        //     request.headers.set('x-real-ip', clientIp);
        //   }
        // },
        (request, options) => {
          if (/wp-json\/wc\/v[1|2]/.test(request.url)) {
            return ky(request.url.replace('wp-json/wc', 'wc-api'), {
              ...options,
              prefixUrl: undefined,
            });
          }
        },
      ],
      beforeError: [
        async error => {
          if (/wp-json\/wc\/v[1|2]/.test(error.request.url)) {
            if (error.response.status === 404) {
              return error;
            }
          }

          Sentry.captureException(error);
          await Sentry.flush(2000);

          return error;
        },
      ],
    },
  });
}

export const createPlatformClient = memoize(getClient, {
  maxAge: ms('1 day'),
});

export function clearPlatformClient() {
  memoizeClear(createPlatformClient);
}
