export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_VERSION?: string;

      NEXT_API: string;
      NEXT_API_AUTH: string;
      NEXT_CACHE_HANDLER?: 0 | 1;
      NEXT_REDIS_URL?: string;

      NEXT_PUBLIC_PAYPAL_CLIENT_ID: string;

      NEXT_PUBLIC_FIREBASE_API_KEY: string;

      NEXT_PUBLIC_IMGPROXY_URL: string;
    }
  }

  type LayoutProps<P = object> = Readonly<{
    children: React.ReactNode;
    params: P & {domain: string};
  }>;

  type PageProps<P = object, S = object> = Readonly<{
    params: P & {domain: string};
    searchParams: S;
  }>;

  type GenerateMetadataProps<P = unknown, S = unknown> = PageProps<P, S>;

  type ErrorProps = Readonly<{
    error: ApolloError | Error;
    reset: () => void;
  }>;

  type RouteHandlerContext<P = object> = Readonly<{
    params: P;
  }>;
}
