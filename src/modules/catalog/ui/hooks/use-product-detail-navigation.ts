"use client";

import * as React from "react";

export function useProductDetailNavigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isBagOpen, setIsBagOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isNotifyOpen, setIsNotifyOpen] = React.useState(false);

  const openMenu = React.useCallback(() => setIsMenuOpen(true), []);
  const closeMenu = React.useCallback(() => setIsMenuOpen(false), []);
  const openBag = React.useCallback(() => setIsBagOpen(true), []);
  const closeBag = React.useCallback(() => setIsBagOpen(false), []);
  const openNotify = React.useCallback(() => setIsNotifyOpen(true), []);

  return {
    isMenuOpen,
    isBagOpen,
    searchQuery,
    isNotifyOpen,
    setSearchQuery,
    setIsNotifyOpen,
    openMenu,
    closeMenu,
    openBag,
    closeBag,
    openNotify,
  };
}
