import { createGlobalTheme } from "@vanilla-extract/css";

export const palette = {
  page: "#f6f5f1",
  surface: "#ffffff",
  text: "#29283b",
  muted: "#626173",
  accent: "#5145cd",
  onAccent: "#ffffff",
  border: "#bfc0cf",
  error: "#b42336",
  font: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  radius: "14px",
};

export const tokens = createGlobalTheme(":root", palette);
