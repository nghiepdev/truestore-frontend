export {};

declare global {
  type LayoutProps<P = Record<string | string[]>> = Readonly<{
    children: React.ReactNode;
    params: P;
  }>;

  type PageProps<
    P = Record<string | string[]>,
    S = Record<string | string[] | undefined>
  > = Readonly<{
    params: P;
    searchParams: S;
  }>;

  type GenerateMetadataProps = PageProps;

  type ErrorProps = Readonly<{
    error: ApolloError | Error;
    reset: () => void;
  }>;

  type RouteHandlerContext<P = Record<string | string[]>> = Readonly<{
    params: P;
  }>;

  namespace NodeJS {
    interface ProcessEnv {
      NEXT_API: string;
      NEXT_API_AUTH: string;

      NEXT_PUBLIC_BASE: string;
    }
  }
}
