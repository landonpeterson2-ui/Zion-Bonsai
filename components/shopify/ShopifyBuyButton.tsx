'use client';

import { useEffect, useRef } from 'react';
import { SHOPIFY_COLORS, shopifyButtonStyle } from './styles';

interface ShopifyBuyButtonProps {
  productHandle: string;
  buttonText?: string;
}

export function ShopifyBuyButton({ productHandle, buttonText = 'Add to Cart' }: ShopifyBuyButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || '';
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '';

    if (!domain || !token) {
      console.error('Missing Shopify credentials:', { domain: !!domain, token: !!token });
      return;
    }

    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

    function ShopifyBuyInit() {
      if (!window.ShopifyBuy || !containerRef.current) {
        console.error('ShopifyBuy not loaded or container not found');
        return;
      }

      const client = window.ShopifyBuy.buildClient({
        domain: domain,
        storefrontAccessToken: token,
      });

      window.ShopifyBuy.UI.onReady(client).then(function (ui) {
        if (!containerRef.current) return;

        ui.createComponent('product', {
          handle: productHandle,
          node: containerRef.current,
          moneyFormat: '${{amount}}',
          options: {
            product: {
              buttonDestination: 'cart',
              contents: {
                img: true,
                title: true,
                price: true,
                button: true,
              },
              text: {
                button: buttonText,
              },
              styles: {
                button: shopifyButtonStyle,
                title: {
                  'font-family': 'Cormorant Garamond, serif',
                  'font-weight': '500',
                  'font-size': '24px',
                  color: SHOPIFY_COLORS.forest,
                },
                price: { 'font-family': 'Open Sans, sans-serif', color: SHOPIFY_COLORS.forest },
              },
            },
            cart: {
              popup: false,
            },
          },
        });
      }).catch(function(err: unknown) {
        console.error('Shopify UI error:', err);
      });
    }

    function loadScript() {
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      script.onload = ShopifyBuyInit;
      script.onerror = () => console.error('Failed to load Shopify script');
      document.head.appendChild(script);
    }

    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        ShopifyBuyInit();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }
  }, [productHandle, buttonText]);

  return <div ref={containerRef} />;
}
