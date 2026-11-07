import { globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "./tokens.css.js";

const mobile = "(max-width: 850px)";
const narrow = "(max-width: 380px)";
const focusRing = { outline: `3px solid ${tokens.accent}`, outlineOffset: 4 };

globalStyle("*, *::before, *::after", { boxSizing: "border-box" });

globalStyle("body", {
  margin: 0,
  background: tokens.page,
  color: tokens.text,
  fontFamily: tokens.font,
  lineHeight: 1.6,
});

globalStyle("button, input", { font: "inherit" });

globalStyle("a", { color: "inherit", textDecoration: "none" });

globalStyle(
  "button:focus-visible, input:focus-visible, a:focus-visible",
  focusRing,
);

globalStyle("::selection", { background: "#ded8fa", color: "#29283b" });

const srOnly = style({
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
  border: 0,
});

const skipLink = style({
  position: "fixed",
  top: 12,
  left: 12,
  zIndex: 10,
  transform: "translateY(-200%)",
  padding: "12px 18px",
  background: tokens.surface,
  color: tokens.accent,
  borderRadius: 8,
  fontWeight: 650,
  selectors: { "&:focus": { transform: "translateY(0)", ...focusRing } },
});

const pageEdge = style({
  maxWidth: 1200,
  marginInline: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "26px 44px",
  gap: 20,
  "@media": { [mobile]: { padding: "22px" } },
});

const header = style([pageEdge, { borderBottom: "1px solid #dedde4" }]);

const footer = style([
  pageEdge,
  {
    borderTop: "1px solid #dedde4",
    fontSize: 11,
    color: tokens.muted,
    flexWrap: "wrap",
  },
]);

const wordmark = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  fontSize: 19,
  fontWeight: 750,
  minHeight: 44,
  flexWrap: "wrap",
});

const brandMark = style({
  display: "inline-block",
  width: 25,
  height: 17,
  transform: "skew(-15deg)",
  background: "#6953be",
  flexShrink: 0,
});

const badge = style({
  fontSize: 9,
  letterSpacing: ".12em",
  background: "#e9e5f4",
  color: "#5c4a92",
  padding: "4px 7px",
  borderRadius: 4,
});

const libraryNote = style({
  fontSize: 12,
  color: tokens.muted,
  "@media": { [mobile]: { display: "none" } },
});

const main = style({
  maxWidth: 1140,
  minHeight: "calc(100vh - 180px)",
  marginInline: "auto",
  padding: "64px 44px",
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 440px)",
  gap: 72,
  alignItems: "center",
  selectors: { "&:focus": { outline: "none" } },
  "@media": {
    [mobile]: {
      maxWidth: 560,
      gridTemplateColumns: "minmax(0, 1fr)",
      gap: 40,
      padding: "40px 22px",
    },
  },
});

const intro = style({
  minWidth: 0,
  "@media": { [mobile]: { paddingInline: 8 } },
});

const eyebrow = style({
  fontSize: 10,
  letterSpacing: ".18em",
  fontWeight: 700,
  color: "#6b5c87",
});

const heading = style({
  fontSize: "clamp(2.5rem, 5vw, 4.125rem)",
  fontWeight: 550,
  lineHeight: 1.12,
  letterSpacing: "-.055em",
  margin: "22px 0",
  overflowWrap: "anywhere",
});

const headingBreak = style({ "@media": { [mobile]: { display: "none" } } });

const headingAccent = style({ color: "#7464ac" });

const description = style({
  maxWidth: 350,
  fontSize: 15,
  lineHeight: 1.85,
  color: tokens.muted,
});

const features = style({
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  padding: 0,
  margin: "28px 0 0",
  listStyle: "none",
});

const feature = style({
  fontSize: 11,
  color: tokens.muted,
  border: "1px solid #d9d7e1",
  borderRadius: 20,
  padding: "6px 10px",
});

const notice = style({
  marginTop: 44,
  paddingLeft: 16,
  borderLeft: "2px solid #cec5e3",
  fontSize: 12,
  "@media": { [mobile]: { marginTop: 28 } },
});

const noticeTitle = style({ margin: "0 0 7px", fontWeight: 650 });

const noticeText = style({ margin: 0, color: tokens.muted, maxWidth: 320 });

const playground = style({ minWidth: 0 });

const toolbar = style({
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "8px 16px",
  margin: "0 4px 16px",
  fontSize: 9,
  color: tokens.muted,
  letterSpacing: ".1em",
});

const toolbarTitle = style({ fontWeight: 650 });

const form = style({
  position: "relative",
  minWidth: 0,
  background: tokens.surface,
  border: `1px solid ${tokens.border}`,
  borderRadius: 24,
  padding: "clamp(20px, 4vw, 32px)",
});

const fieldset = style({
  padding: 0,
  margin: 0,
  border: 0,
  minWidth: 0,
  display: "grid",
  gap: 20,
});

const label = style({
  display: "block",
  fontSize: 13,
  fontWeight: 650,
  marginBottom: 8,
});

const requiredText = style({
  fontSize: 11,
  fontWeight: 400,
  color: tokens.muted,
});

const input = style({
  display: "block",
  appearance: "none",
  width: "100%",
  minWidth: 0,
  minHeight: 48,
  padding: "12px 14px",
  border: `1px solid ${tokens.border}`,
  borderRadius: tokens.radius,
  background: tokens.surface,
  color: tokens.text,
  fontSize: 16,
  lineHeight: 1.5,
  selectors: { "&::placeholder": { color: tokens.muted, opacity: 1 } },
});

const fieldRow = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 16,
  "@media": { [narrow]: { gridTemplateColumns: "minmax(0, 1fr)" } },
});

const hint = style({
  margin: "7px 0 0",
  fontSize: 12,
  lineHeight: 1.5,
  color: tokens.muted,
});

const submitButton = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  minHeight: 48,
  fontSize: 14,
  fontWeight: 650,
  border: 0,
  borderRadius: tokens.radius,
  padding: "14px 18px",
  background: tokens.accent,
  color: tokens.onAccent,
  cursor: "pointer",
  selectors: { "&:hover": { background: "#4538b5" } },
});

const formNote = style({
  fontSize: 11,
  lineHeight: 1.6,
  textAlign: "center",
  color: tokens.muted,
  margin: "16px 12px 0",
});

const preview = style({ marginBottom: 28 });

const card = style({
  aspectRatio: "1.65",
  borderRadius: 18,
  overflow: "hidden",
  padding: "clamp(16px, 4vw, 26px)",
  color: "#fff",
  background:
    "radial-gradient(ellipse at 85% 0%,#8270d6 0,transparent 60%),linear-gradient(120deg,#202847,#42347b)",
  boxShadow: "0 12px 24px #1a174b22",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const cardTop = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const chip = style({
  width: 35,
  height: 27,
  flexShrink: 0,
  position: "relative",
  border: "1px solid #f1ddaa",
  borderRadius: 6,
  background: "linear-gradient(135deg,#e8d4a9,#b79d65)",
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      inset: "8px 0",
      borderBlock: "1px solid #856b3e",
    },
  },
});

const cardBrand = style({
  fontSize: 13,
  letterSpacing: ".05em",
  fontWeight: 650,
});

const cardNumber = style({
  fontFamily: "ui-monospace, monospace",
  letterSpacing: ".06em",
  fontSize: "clamp(14px, 4vw, 21px)",
  whiteSpace: "nowrap",
});

const cardBottom = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
  gap: 12,
});

const cardName = style({ fontSize: 11, letterSpacing: ".07em" });

const cardExpiry = style({
  fontSize: 11,
  fontVariantNumeric: "tabular-nums",
  textAlign: "right",
});

const cardCaption = style({
  display: "block",
  fontSize: 8,
  letterSpacing: ".12em",
  color: "#dfdcee",
  marginBottom: 4,
});

export const styles = {
  srOnly,
  skipLink,
  header,
  footer,
  wordmark,
  brandMark,
  badge,
  libraryNote,
  main,
  intro,
  eyebrow,
  heading,
  headingBreak,
  headingAccent,
  description,
  features,
  feature,
  notice,
  noticeTitle,
  noticeText,
  playground,
  toolbar,
  toolbarTitle,
  form,
  fieldset,
  label,
  requiredText,
  input,
  fieldRow,
  hint,
  submitButton,
  formNote,
  preview,
  card,
  cardTop,
  chip,
  cardBrand,
  cardNumber,
  cardBottom,
  cardName,
  cardExpiry,
  cardCaption,
};
