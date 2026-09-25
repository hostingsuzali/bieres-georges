"use client";

import { useEffect, type RefObject } from "react";

/**
 * Le widget Elfsight affiche son propre titre « Store Locator », qui fait
 * doublon avec le bandeau maison placé juste au-dessus. Elfsight ne propose
 * pas d'option pour le retirer : on le masque donc côté client, dans le light
 * DOM comme dans l'éventuel shadow DOM du widget.
 */
const TITLE_SELECTORS = [
  '[class*="directory-header__Title"]',
  '[class*="DirectoryHeader__Title"]',
  '[class*="directory-header__Heading"]',
  '[class*="DirectoryHeader__Heading"]',
  '[class*="es-directory-header-title"]',
  "h1",
  "h2",
].join(",");

const SHADOW_STYLE_ID = "georges-hide-store-locator-title";

const SHADOW_STYLE = `
  [class*="directory-header__Title"],
  [class*="DirectoryHeader__Title"],
  [class*="directory-header__Heading"],
  [class*="DirectoryHeader__Heading"],
  [class*="es-directory-header-title"] {
    display: none !important;
  }
`;

/** Durée max de surveillance après montage — le widget se charge en lazy. */
const WATCH_DURATION_MS = 20_000;

function isWidgetTitle(el: HTMLElement) {
  const text = el.textContent?.trim().toLowerCase() ?? "";
  return (
    text === "store locator" ||
    text.startsWith("store locator") ||
    /(directory-?header__(title|heading))/i.test(el.className)
  );
}

function maskIn(root: ParentNode) {
  root.querySelectorAll<HTMLElement>(TITLE_SELECTORS).forEach((el) => {
    if (isWidgetTitle(el)) {
      el.style.setProperty("display", "none", "important");
    }
  });
}

export function useElfsightTitleMask(
  containerRef: RefObject<HTMLElement | null>,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    const mask = () => {
      const widget = container.querySelector('[class*="elfsight-app-"]');
      if (!widget) return;

      maskIn(widget);

      const shadow = widget.shadowRoot;
      if (!shadow) return;

      maskIn(shadow);
      if (!shadow.getElementById(SHADOW_STYLE_ID)) {
        const style = document.createElement("style");
        style.id = SHADOW_STYLE_ID;
        style.textContent = SHADOW_STYLE;
        shadow.appendChild(style);
      }
    };

    mask();

    const observer = new MutationObserver(mask);
    observer.observe(container, { childList: true, subtree: true });

    // Le shadow DOM n'est pas observable depuis l'extérieur : on complète
    // l'observer par un poll borné dans le temps, le temps que le widget
    // finisse de se monter.
    const poll = window.setInterval(mask, 400);
    const stopPoll = window.setTimeout(
      () => window.clearInterval(poll),
      WATCH_DURATION_MS,
    );

    return () => {
      observer.disconnect();
      window.clearInterval(poll);
      window.clearTimeout(stopPoll);
    };
  }, [containerRef, enabled]);
}
