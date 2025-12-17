"use client";

import { ThemeProvider } from "./ThemeToggle";
import { LanguageProvider } from "./LanguageToggle";
import { SoundProvider } from "./SoundEffects";
import SmoothScroll from "./SmoothScroll";
import CustomCursor from "./CustomCursor";
import NoiseOverlay from "./NoiseOverlay";
import LoadingScreen from "./LoadingScreen";
import ChatWidget from "./ChatWidget";
import CookieConsent from "./CookieConsent";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SoundProvider>
          <LoadingScreen />
          <CustomCursor />
          <NoiseOverlay />
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <ChatWidget />
          <CookieConsent />
        </SoundProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
