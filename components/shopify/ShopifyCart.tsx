'use client';

import { useEffect, useRef } from 'react';

export function ShopifyCart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || !containerRef.current) return;

    const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

    if (!domain || !token) {
      console.warn('Shopify configuration missing. Cart disabled.');
      return;
    }

    const scriptId = 'shopify-buy-button-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    const initCart = () => {
      if (!window.ShopifyBuy || !containerRef.current) return;

      try {
        const client = window.ShopifyBuy.buildClient({
          domain,
          storefrontAccessToken: token,
        });

        window.ShopifyBuy.UI.onReady(client).then((ui: { createComponent: (type: string, config: Record<string, unknown>) => void }) => {
        if (!containerRef.current) return;

        ui.createComponent('cart', {
          node: containerRef.current,
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
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
              text: {
                total: 'Subtotal',
                button: 'Checkout',
              },
              popup: false,
            },
            toggle: {
              styles: {
                toggle: {
                  'background-color': 'transparent',
                  ':hover': {
                    'background-color': 'rgba(255,255,255,0.1)',
                  },
                },
                icon: {
                  fill: '#ffffff',
                },
                count: {
                  'font-size': '14px',
                },
              },
            },
          },
        });
      }).catch((err: Error) => {
        console.warn('Shopify cart initialization failed:', err.message);
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
      script.onload = initCart;
      document.head.appendChild(script);
    } else if (window.ShopifyBuy) {
      initCart();
    }

    initializedRef.current = true;
  }, []);

  return <div ref={containerRef} id="shopify-cart" />;
}
