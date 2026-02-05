declare module 'shopify-buy' {
  interface Config {
    domain: string;
    storefrontAccessToken: string;
    apiVersion?: string;
  }

  interface Client {
    product: {
      fetchAll: () => Promise<unknown[]>;
      fetch: (id: string) => Promise<unknown>;
    };
    collection: {
      fetchAll: () => Promise<unknown[]>;
      fetchWithProducts: (id: string) => Promise<unknown>;
    };
    checkout: {
      create: () => Promise<unknown>;
      addLineItems: (checkoutId: string, lineItems: unknown[]) => Promise<unknown>;
    };
  }

  export function buildClient(config: Config): Client;
  export default { buildClient };
}

declare global {
  interface Window {
    ShopifyBuy?: {
      buildClient: (config: { domain: string; storefrontAccessToken: string }) => unknown;
      UI: {
        onReady: (client: unknown) => Promise<{
          createComponent: (
            type: string,
            config: Record<string, unknown>
          ) => void;
        }>;
      };
    };
  }
}

export {};
