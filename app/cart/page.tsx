"use client";

import { useState } from "react";
import {
  CartDrawer,
  DEFAULT_SETTINGS,
  THEME_PRESETS,
  DEFAULT_TRUST_ICONS,
  type CartItem,
  type UpsellProduct,
  type CartDrawerSettings,
} from "./index";

/**
 * This file shows the intended integration shape. In Journeva, `settings`
 * would come from the merchant's saved config (Shopify metafield / your
 * app's DB) instead of a local useState — the component itself never needs
 * to change.
 */
export default function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "1",
      title: "Merino Wool Crewneck",
      variantTitle: "Charcoal / M",
      price: 68,
      compareAtPrice: 84,
      quantity: 1,
      image: "https://picsum.photos/seed/sweater/200",
    },
    {
      id: "2",
      title: "Everyday Canvas Tote",
      variantTitle: "Natural",
      price: 34,
      quantity: 2,
      image: "https://picsum.photos/seed/tote/200",
    },
  ]);

  const upsellProducts: UpsellProduct[] = [
    {
      id: "u1",
      title: "Waffle Knit Beanie",
      price: 22,
      image: "https://picsum.photos/seed/beanie/200",
    },
    {
      id: "u2",
      title: "Wool Blend Scarf",
      price: 38,
      image: "https://picsum.photos/seed/scarf/200",
    },
    {
      id: "u3",
      title: "Leather Card Wallet",
      price: 45,
      image: "https://picsum.photos/seed/wallet/200",
    },
  ];

  const sideUpsellProducts: UpsellProduct[] = [
    {
      id: "s1",
      title: "Travel Shoe Bag",
      price: 18,
      image: "https://picsum.photos/seed/shoebag/200",
    },
  ];

  // This is the object a real admin panel would let a merchant edit and
  // persist. Swapping THEME_PRESETS.editorial for .midnight or .minimal
  // (or a fully custom theme) is the entire re-brand.
  const settings: CartDrawerSettings = {
    ...DEFAULT_SETTINGS,
    theme: THEME_PRESETS.editorial,
    trustBadges: {
      badges: [
        { id: "t1", icon: DEFAULT_TRUST_ICONS.secureCheckout, label: "Secure checkout" },
        { id: "t2", icon: DEFAULT_TRUST_ICONS.freeReturns, label: "30-day returns" },
        { id: "t3", icon: DEFAULT_TRUST_ICONS.fastShipping, label: "Fast shipping" },
      ],
    },
  };

  return (
    <div className="h-dvh">
      <button onClick={() => setIsOpen(true)}>Open cart</button>
      <CartDrawer
        isOpen={isOpen}
        settings={settings}
        items={items}
        upsellProducts={upsellProducts}
        sideUpsellProducts={sideUpsellProducts}
        onClose={() => setIsOpen(false)}
        onUpdateQuantity={(id, qty) =>
          setItems((prev) =>
            qty === 0
              ? prev.filter((i) => i.id !== id)
              : prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
          )
        }
        onRemoveItem={(id) => setItems((prev) => prev.filter((i) => i.id !== id))}
        onAddUpsell={(product) =>
          setItems((prev) => [
            ...prev,
            {
              id: product.id,
              title: product.title,
              price: product.price,
              quantity: 1,
              image: product.image,
            },
          ])
        }
        onCheckout={() => {
          window.location.href = "/checkout";
        }}
        onContinueShopping={() => setIsOpen(false)}
      />
    </div>
  );
}
