'use client';

import { useEffect, useRef } from 'react';

interface ShopifyCollectionProps {
  collectionId?: string;
}

export function ShopifyCollection({ collectionId }: ShopifyCollectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || !containerRef.current) return;

    const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

    if (!domain || !token) {
      console.warn('Shopify configuration missing.');
      return;
    }

    const scriptId = 'shopify-buy-button-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    const initCollection = () => {
      if (!window.ShopifyBuy || !containerRef.current) return;

      try {
        const client = window.ShopifyBuy.buildClient({
          domain,
          storefrontAccessToken: token,
        });

        window.ShopifyBuy.UI.onReady(client).then((ui) => {
          if (!containerRef.current) return;

          // If collectionId is provided, show that collection; otherwise show all products
          const componentType = collectionId ? 'collection' : 'productSet';
          const config: Record<string, unknown> = {
            node: containerRef.current,
            moneyFormat: '${{amount}}',
            options: {
              product: {
                styles: {
                  product: {
                    '@media (min-width: 601px)': {
                      'max-width': 'calc(33.33% - 20px)',
                      'margin-left': '10px',
                      'margin-right': '10px',
                      'margin-bottom': '30px',
                    },
                  },
                  title: {
                    'font-size': '18px',
                    'font-weight': '600',
                    color: '#1f2937',
                  },
                  price: {
                    'font-size': '16px',
                    color: '#9CB43D',
                    'font-weight': '600',
                  },
                  button: {
                    'background-color': '#D8795E',
                    ':hover': {
                      'background-color': '#C5624A',
                    },
                    'border-radius': '8px',
                    'font-weight': '600',
                    'padding': '12px 24px',
                  },
                },
                buttonDestination: 'cart',
                contents: {
                  img: true,
                  title: true,
                  price: true,
                  button: true,
                  options: true,
                },
                text: {
                  button: 'Add to Cart',
                },
              },
              cart: {
                styles: {
                  button: {
                    'background-color': '#D8795E',
                    ':hover': {
                      'background-color': '#C5624A',
                    },
                    'border-radius': '8px',
                    'font-weight': '600',
                  },
                },
                popup: false,
              },
              toggle: {
                styles: {
                  toggle: {
                    'background-color': '#D8795E',
                    ':hover': {
                      'background-color': '#C5624A',
                    },
                  },
                },
              },
              productSet: {
                styles: {
                  products: {
                    '@media (min-width: 601px)': {
                      'display': 'flex',
                      'flex-wrap': 'wrap',
                      'justify-content': 'flex-start',
                    },
                  },
                },
              },
            },
          };

          if (collectionId) {
            config.id = collectionId;
          }

          ui.createComponent(componentType, config);
        }).catch((err: Error) => {
          console.warn('Shopify collection initialization failed:', err.message);
        });
      } catch (err) {
        console.warn('Shopify client error:', err);
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
      script.onload = initCollection;
      document.head.appendChild(script);
    } else if (window.ShopifyBuy) {
      initCollection();
    }

    initializedRef.current = true;
  }, [collectionId]);

  return (
    <div ref={containerRef} className="shopify-collection" />
  );
}
