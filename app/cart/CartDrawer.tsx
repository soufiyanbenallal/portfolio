"use client";

import { useEffect, useMemo, useRef, type ReactElement } from "react";
import type {
  CartDrawerHandlers,
  CartDrawerSettings,
  CartItem,
  SectionId,
  UpsellProduct,
} from "./types";
import { buildThemeVars } from "./theme";
import styles from "./CartDrawer.module.css";

import { TopBar } from "./sections/TopBar";
import { Timer } from "./sections/Timer";
import { PromoProgressBar } from "./sections/PromoProgressBar";
import { CartItems } from "./sections/CartItems";
import { ProductUpsell } from "./sections/ProductUpsell";
import { TrustBadges } from "./sections/TrustBadges";
import { SideUpsell } from "./sections/SideUpsell";
import { Footer } from "./sections/Footer";

export interface CartDrawerProps extends CartDrawerHandlers {
  isOpen: boolean;
  settings: CartDrawerSettings;
  items: CartItem[];
  upsellProducts?: UpsellProduct[];
  sideUpsellProducts?: UpsellProduct[];
}

/**
 * Registry mapping a section id to its renderer. Adding a new section type
 * in the future is: build the component, add one line here, add the id to
 * the SectionId union in types.ts. Nothing else in this file changes.
 */
function useSectionRegistry(props: CartDrawerProps): Record<SectionId, () => ReactElement | null> {
  const { settings, items, upsellProducts = [], sideUpsellProducts = [] } = props;
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  return {
    topBar: () => (
      <TopBar
        title={settings.topBar?.title ?? "Your Cart"}
        itemCount={items.reduce((n, i) => n + i.quantity, 0)}
        showItemCount={settings.topBar?.showItemCount ?? true}
        onClose={props.onClose}
        closeAriaLabel={settings.topBar?.closeAriaLabel}
      />
    ),
    timer: () =>
      settings.timer?.enabled ? (
        <Timer
          minutes={settings.timer.minutes}
          message={settings.timer.message}
          expiredMessage={settings.timer.expiredMessage}
          persist={settings.timer.persist}
          isOpen={props.isOpen}
        />
      ) : null,
    promoProgress: () =>
      settings.promoProgress ? (
        <PromoProgressBar
          subtotal={subtotal}
          currency={settings.currency ?? "USD"}
          tiers={settings.promoProgress.tiers}
        />
      ) : null,
    cartItems: () => (
      <CartItems
        items={items}
        currency={settings.currency ?? "USD"}
        onUpdateQuantity={props.onUpdateQuantity}
        onRemoveItem={props.onRemoveItem}
      />
    ),
    productUpsell: () =>
      upsellProducts.length > 0 ? (
        <ProductUpsell
          heading={settings.productUpsell?.heading ?? "You may also like"}
          layout={settings.productUpsell?.layout ?? "carousel"}
          products={upsellProducts}
          currency={settings.currency ?? "USD"}
          onAdd={props.onAddUpsell}
        />
      ) : null,
    trustBadges: () =>
      settings.trustBadges?.badges?.length ? (
        <TrustBadges badges={settings.trustBadges.badges} />
      ) : null,
    sideUpsell: () =>
      sideUpsellProducts.length > 0 ? (
        <SideUpsell
          heading={settings.sideUpsell?.heading ?? "Complete the look"}
          badge={settings.sideUpsell?.badge}
          products={sideUpsellProducts}
          currency={settings.currency ?? "USD"}
          onAdd={props.onAddUpsell}
        />
      ) : null,
    footer: () => (
      <Footer
        subtotal={subtotal}
        currency={settings.currency ?? "USD"}
        showSubtotal={settings.footer?.showSubtotal ?? true}
        subtotalNote={settings.footer?.subtotalNote}
        checkoutLabel={settings.footer?.checkoutLabel ?? "Checkout"}
        continueShoppingLabel={settings.footer?.continueShoppingLabel}
        disabled={items.length === 0}
        onCheckout={props.onCheckout}
        onContinueShopping={props.onContinueShopping}
      />
    ),
  };
}

export function CartDrawer(props: CartDrawerProps) {
  const { isOpen, settings, onClose } = props;
  const registry = useSectionRegistry(props);
  const drawerRef = useRef<HTMLDivElement>(null);

  const orderedSections = useMemo(
    () => [...settings.sections].filter((s) => s.enabled).sort((a, b) => a.order - b.order),
    [settings.sections]
  );

  // Footer is pinned outside the scroll area; everything else scrolls.
  const scrollableSections = orderedSections.filter((s) => s.id !== "footer");
  const footerSection = orderedSections.find((s) => s.id === "footer");

  // Lock body scroll while open + close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    drawerRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  const positionClass = settings.theme.drawer.position === "left" ? styles.left : styles.right;

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={drawerRef}
        className={`${styles.drawer} ${positionClass} ${isOpen ? styles.open : ""}`}
        style={buildThemeVars(settings.theme)}
        role="dialog"
        aria-modal="true"
        aria-label={settings.topBar?.title ?? "Cart"}
        tabIndex={-1}
      >
        <div className={styles.scrollArea}>
          {scrollableSections.map((section, i) => (
            <SectionSlot key={section.id} isLast={i === scrollableSections.length - 1}>
              {registry[section.id]()}
            </SectionSlot>
          ))}
        </div>
        {footerSection ? registry[footerSection.id]() : null}
      </div>
    </>
  );
}

function SectionSlot({ children, isLast }: { children: ReactElement | null; isLast: boolean }) {
  if (!children) return null;
  return (
    <>
      {children}
      {!isLast && <div className={styles.sectionDivider} />}
    </>
  );
}
