"use client";

import { useEffect, type RefObject } from "react";

/**
 * Le widget Elfsight affiche son propre titre « Store Locator », qui fait
 * doublon avec le bandeau maison placé juste au-dessus. Elfsight ne propose
 * pas d'option directe pour le retirer dans toutes les vues : on le masque
 * donc côté client, dans le light DOM comme dans l'ensemble des shadow DOMs
 * (directs ou imbriqués) du widget.
 */
const TITLE_SELECTORS = [
  '[class*="directory" i][class*="header" i]',
  '[class*="directory" i][class*="heading" i]',
  '[class*="DirectoryHeader" i]',
  '[class*="DirectoryHeading" i]',
  '[class*="Header__Title" i]',
  '[class*="Header__Heading" i]',
  '[class*="header__title" i]',
  '[class*="header__heading" i]',
  '[class*="es-directory-header" i]',
  '[class*="es-header-title" i]',
  '[class*="es-title" i]',
  "h1",
  "h2",
  "h3",
  "h4",
].join(",");

const SHADOW_STYLE_ID = "georges-hide-store-locator-title";

const MASK_STYLE = `
  [class*="directory" i][class*="header" i] [class*="title" i],
  [class*="directory" i][class*="header" i] [class*="heading" i],
  [class*="directory-header__Title"],
  [class*="DirectoryHeader__Title"],
  [class*="directory-header__Heading"],
  [class*="DirectoryHeader__Heading"],
  [class*="es-directory-header-title"],
  [class*="Header__Title"],
  [class*="Header__Heading"],
  [class*="header__title"],
  [class*="header__heading"] {
    display: none !important;
  }
`;

/** Durée max de surveillance après montage — le widget se charge en lazy. */
const WATCH_DURATION_MS = 30_000;

function isWidgetTitle(el: HTMLElement): boolean {
  const text = el.textContent?.trim().toLowerCase() ?? "";
  if (!text) return false;

  // « Store Locator », « Store Locator (4) », etc.
  if (/^store\s+locator(\s*\(\d+\))?$/i.test(text)) {
    return true;
  }
  if (text.startsWith("store locator") && text.length < 35) {
    return true;
  }

  const className = typeof el.className === "string" ? el.className : "";
  return /(directory-?(header|heading)__(title|heading)|es-directory-header-title)/i.test(
    className
  );
}

function hideElement(el: HTMLElement) {
  el.style.setProperty("display", "none", "important");
  el.style.setProperty("visibility", "hidden", "important");
  el.style.setProperty("height", "0", "important");
  el.style.setProperty("overflow", "hidden", "important");
  el.style.setProperty("margin", "0", "important");
  el.style.setProperty("padding", "0", "important");
}

function maskInRoot(root: ParentNode) {
  // 1. Recherche par sélecteurs ciblés
  root.querySelectorAll<HTMLElement>(TITLE_SELECTORS).forEach((el) => {
    if (isWidgetTitle(el)) {
      hideElement(el);
      // Si le conteneur parent immédiat n'a que ce titre, on le masque également pour éviter le vide
      if (
        el.parentElement &&
        el.parentElement.children.length === 1 &&
        !el.parentElement.classList.contains("elfsight-app")
      ) {
        hideElement(el.parentElement);
      }
    }
  });

  // 2. Recherche textuelle élargie dans tous les éléments pouvant servir de titre
  root
    .querySelectorAll<HTMLElement>(
      'h1, h2, h3, h4, h5, div, span, p, [class*="title" i], [class*="heading" i]'
    )
    .forEach((el) => {
      // Éviter de masquer de gros conteneurs avec beaucoup d'enfants
      if (el.children.length <= 2 && isWidgetTitle(el)) {
        hideElement(el);
      }
    });

  // 3. Injection d'une balise style si absente
  if ("getElementById" in root) {
    const docOrShadow = root as Document | ShadowRoot;
    if (!docOrShadow.getElementById(SHADOW_STYLE_ID)) {
      const style = document.createElement("style");
      style.id = SHADOW_STYLE_ID;
      style.textContent = MASK_STYLE;
      try {
        docOrShadow.appendChild(style);
      } catch {
        // Ignorer si non supporté sur ce nœud
      }
    }
  }
}

/** Collecte récursive de tous les shadow roots sous un élément */
function collectShadowRoots(node: Node, acc: ShadowRoot[] = []): ShadowRoot[] {
  if (node instanceof HTMLElement && node.shadowRoot) {
    acc.push(node.shadowRoot);
    collectShadowRoots(node.shadowRoot, acc);
  }
  const children =
    node instanceof HTMLElement || node instanceof ShadowRoot
      ? Array.from(node.children)
      : [];
  for (const child of children) {
    collectShadowRoots(child, acc);
  }
  return acc;
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
      // Masquer dans le DOM normal du conteneur
      maskInRoot(container);

      // Trouver l'élément du widget
      const widget = container.querySelector('[class*="elfsight-app-"]');
      if (widget) {
        maskInRoot(widget);
      }

      // Parcourir récursivement tous les shadow DOMs du sous-arbre
      const shadowRoots = collectShadowRoots(container);
      for (const shadow of shadowRoots) {
        maskInRoot(shadow);
      }
    };

    // Exécution immédiate
    mask();

    // Observer pour réagir dès qu'Elfsight injecte ses éléments
    const observer = new MutationObserver(mask);
    observer.observe(container, { childList: true, subtree: true });

    // Polling borné dans le temps pour les rendus asynchrones (Shadow DOM / Web Components)
    const poll = window.setInterval(mask, 300);
    const stopPoll = window.setTimeout(() => {
      window.clearInterval(poll);
    }, WATCH_DURATION_MS);

    return () => {
      observer.disconnect();
      window.clearInterval(poll);
      window.clearTimeout(stopPoll);
    };
  }, [containerRef, enabled]);
}
