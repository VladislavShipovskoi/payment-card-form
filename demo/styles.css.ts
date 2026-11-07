import { globalStyle, style } from "@vanilla-extract/css";
import { media, tokens } from "./tokens.css.js";

const focusRing = {
  outline: `${tokens.borderWidth.focus} solid ${tokens.color.accent}`,
  outlineOffset: tokens.space[4],
};

globalStyle("*, *::before, *::after", { boxSizing: "border-box" });

globalStyle("body", {
  margin: 0,
  background: tokens.color.page,
  color: tokens.color.text,
  fontFamily: tokens.fontFamily.body,
  lineHeight: tokens.lineHeight.body,
});

globalStyle("button, input", { font: "inherit" });

globalStyle("a", { color: "inherit", textDecoration: "none" });

globalStyle(
  "button:focus-visible, input:focus-visible, a:focus-visible",
  focusRing,
);

globalStyle("::selection", {
  background: tokens.color.selection,
  color: tokens.color.text,
});

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
  top: tokens.space[12],
  left: tokens.space[12],
  zIndex: tokens.layer.skipLink,
  transform: "translateY(-200%)",
  clipPath: "inset(50%)",
  padding: `${tokens.space[12]} ${tokens.space[18]}`,
  background: tokens.color.surface,
  color: tokens.color.accent,
  borderRadius: tokens.radius.small,
  fontWeight: tokens.fontWeight.strong,
  selectors: {
    "&:focus": { transform: "translateY(0)", clipPath: "none", ...focusRing },
  },
});

const pageEdge = style({
  maxWidth: tokens.size.page,
  marginInline: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${tokens.space[26]} ${tokens.space[44]}`,
  gap: tokens.space[20],
  "@media": { [media.mobile]: { padding: tokens.space[22] } },
});

const header = style([
  pageEdge,
  { borderBottom: `${tokens.borderWidth.thin} solid ${tokens.color.divider}` },
]);

const footer = style([
  pageEdge,
  {
    borderTop: `${tokens.borderWidth.thin} solid ${tokens.color.divider}`,
    fontSize: tokens.fontSize[11],
    color: tokens.color.muted,
    flexWrap: "wrap",
  },
]);

const wordmark = style({
  display: "inline-flex",
  alignItems: "center",
  gap: tokens.space[10],
  fontSize: tokens.fontSize[19],
  fontWeight: tokens.fontWeight.brand,
  minHeight: tokens.size.link,
  flexWrap: "wrap",
});

const brandMark = style({
  display: "inline-block",
  width: tokens.size.brandWidth,
  height: tokens.size.brandHeight,
  transform: "skew(-15deg)",
  background: tokens.color.brand,
  flexShrink: 0,
});

const badge = style({
  fontSize: tokens.fontSize[9],
  letterSpacing: tokens.letterSpacing.caption,
  background: tokens.color.badgeBackground,
  color: tokens.color.badgeText,
  padding: `${tokens.space[4]} ${tokens.space[7]}`,
  borderRadius: tokens.radius.badge,
});

const libraryNote = style({
  fontSize: tokens.fontSize[12],
  color: tokens.color.muted,
  "@media": { [media.mobile]: { display: "none" } },
});

const main = style({
  maxWidth: tokens.size.content,
  minHeight: `calc(100vh - ${tokens.size.pageChrome})`,
  marginInline: "auto",
  padding: `${tokens.space[64]} ${tokens.space[44]}`,
  display: "grid",
  gridTemplateColumns: `minmax(0, 1fr) minmax(0, ${tokens.size.form})`,
  gap: tokens.space[72],
  alignItems: "center",
  selectors: { "&:focus": { outline: "none" } },
  "@media": {
    [media.mobile]: {
      maxWidth: tokens.size.mobileContent,
      gridTemplateColumns: "minmax(0, 1fr)",
      gap: tokens.space[40],
      padding: `${tokens.space[40]} ${tokens.space[22]}`,
    },
  },
});

const intro = style({
  minWidth: 0,
  "@media": { [media.mobile]: { paddingInline: tokens.space[8] } },
});

const eyebrow = style({
  fontSize: tokens.fontSize[10],
  letterSpacing: tokens.letterSpacing.eyebrow,
  fontWeight: tokens.fontWeight.bold,
  color: tokens.color.eyebrow,
});

const heading = style({
  fontSize: tokens.fontSize.heading,
  fontWeight: tokens.fontWeight.medium,
  lineHeight: tokens.lineHeight.heading,
  letterSpacing: tokens.letterSpacing.heading,
  margin: `${tokens.space[22]} 0`,
  overflowWrap: "anywhere",
});

const headingBreak = style({
  "@media": { [media.mobile]: { display: "none" } },
});

const headingAccent = style({ color: tokens.color.headingAccent });

const description = style({
  maxWidth: tokens.size.description,
  fontSize: tokens.fontSize[15],
  lineHeight: tokens.lineHeight.relaxed,
  color: tokens.color.muted,
});

const features = style({
  display: "flex",
  flexWrap: "wrap",
  gap: tokens.space[8],
  padding: 0,
  margin: `${tokens.space[28]} 0 0`,
  listStyle: "none",
});

const feature = style({
  fontSize: tokens.fontSize[11],
  color: tokens.color.muted,
  border: `${tokens.borderWidth.thin} solid ${tokens.color.featureBorder}`,
  borderRadius: tokens.radius.pill,
  padding: `${tokens.space[6]} ${tokens.space[10]}`,
});

const notice = style({
  marginTop: tokens.space[44],
  paddingLeft: tokens.space[16],
  borderLeft: `${tokens.borderWidth.accent} solid ${tokens.color.noticeBorder}`,
  fontSize: tokens.fontSize[12],
  "@media": { [media.mobile]: { marginTop: tokens.space[28] } },
});

const noticeTitle = style({
  margin: `0 0 ${tokens.space[7]}`,
  fontWeight: tokens.fontWeight.strong,
});

const noticeText = style({
  margin: 0,
  color: tokens.color.muted,
  maxWidth: tokens.size.notice,
});

const playground = style({ minWidth: 0 });

const toolbar = style({
  display: "grid",
  gap: tokens.space[8],
  margin: `0 ${tokens.space[4]} ${tokens.space[16]}`,
  fontSize: tokens.fontSize[9],
  color: tokens.color.muted,
  letterSpacing: tokens.letterSpacing.label,
});

const toolbarControls = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: tokens.space[12],
  flexWrap: "wrap",
});
const languageControls = style({
  display: "flex",
  gap: tokens.space[4],
  padding: tokens.space[4],
  border: `${tokens.borderWidth.thin} solid ${tokens.color.border}`,
  borderRadius: tokens.radius.small,
});
const controlButton = style({
  minHeight: tokens.size.link,
  minWidth: tokens.size.control,
  padding: `${tokens.space[8]} ${tokens.space[12]}`,
  border: 0,
  borderRadius: tokens.radius.badge,
  background: "transparent",
  color: tokens.color.muted,
  fontSize: tokens.fontSize[11],
  fontWeight: tokens.fontWeight.strong,
  cursor: "pointer",
  selectors: {
    '&[aria-pressed="true"]': {
      background: tokens.color.accent,
      color: tokens.color.onAccent,
    },
    '&:hover:not([aria-pressed="true"])': {
      background: tokens.color.selection,
    },
  },
});
const themeButton = style([
  controlButton,
  {
    border: `${tokens.borderWidth.thin} solid ${tokens.color.border}`,
    borderRadius: tokens.radius.small,
  },
]);

const form = style({
  display: "grid",
  position: "relative",
  minWidth: 0,
  background: tokens.color.surface,
  color: tokens.color.text,
  colorScheme: "light",
  border: `${tokens.borderWidth.thin} solid ${tokens.color.border}`,
  borderRadius: tokens.radius.form,
  padding: tokens.size.formPadding,
  selectors: { '&[data-theme="dark"]': { colorScheme: "dark" } },
});

const fieldset = style({
  padding: 0,
  margin: 0,
  border: 0,
  minWidth: 0,
  display: "grid",
  gridArea: "2 / 1",
  alignContent: "start",
  gap: tokens.space[20],
  // Both steps size the same grid cell without exposing the inactive fields.
  selectors: { "&[hidden]": { visibility: "hidden", pointerEvents: "none" } },
});

const label = style({
  display: "block",
  fontSize: tokens.fontSize[13],
  fontWeight: tokens.fontWeight.strong,
  marginBottom: tokens.space[8],
});

const requiredText = style({
  fontSize: tokens.fontSize[11],
  fontWeight: tokens.fontWeight.regular,
  color: tokens.color.muted,
});

const disabledControl = {
  opacity: tokens.opacity.disabled,
  cursor: "not-allowed",
};

const input = style({
  display: "block",
  appearance: "none",
  width: "100%",
  minWidth: 0,
  minHeight: tokens.size.control,
  padding: `${tokens.space[12]} ${tokens.space[14]}`,
  border: `${tokens.borderWidth.thin} solid ${tokens.color.border}`,
  borderRadius: tokens.radius.control,
  background: tokens.color.surface,
  color: tokens.color.text,
  fontSize: tokens.fontSize[16],
  lineHeight: tokens.lineHeight.compact,
  selectors: {
    "&::placeholder": { color: tokens.color.muted, opacity: 1 },
    '&[aria-invalid="true"]': { borderColor: tokens.color.error },
    "&:disabled": disabledControl,
  },
});

const hint = style({
  margin: `${tokens.space[7]} 0 0`,
  fontSize: tokens.fontSize[12],
  lineHeight: tokens.lineHeight.compact,
  color: tokens.color.muted,
});

const error = style({
  margin: 0,
  color: tokens.color.error,
  fontSize: tokens.fontSize[12],
  lineHeight: tokens.lineHeight.compact,
  selectors: { "&:not(:empty)": { marginTop: tokens.space[7] } },
});

const submitButton = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: tokens.space[12],
  minHeight: tokens.size.control,
  fontSize: tokens.fontSize[14],
  fontWeight: tokens.fontWeight.strong,
  border: 0,
  borderRadius: tokens.radius.control,
  padding: `${tokens.space[14]} ${tokens.space[18]}`,
  background: tokens.color.accent,
  color: tokens.color.onAccent,
  cursor: "pointer",
  selectors: {
    // Reserve the button's space so completion does not move the page columns.
    "&[hidden]": { visibility: "hidden", pointerEvents: "none" },
    "&:hover:not(:disabled)": { background: tokens.color.accentHover },
    "&:disabled": disabledControl,
  },
});

const formNote = style({
  fontSize: tokens.fontSize[11],
  lineHeight: tokens.lineHeight.body,
  textAlign: "center",
  color: tokens.color.muted,
  margin: `${tokens.space[16]} ${tokens.space[12]} 0`,
});

const actions = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: tokens.space[12],
  "@media": { [media.narrow]: { gridTemplateColumns: "minmax(0, 1fr)" } },
});

const backButton = style([
  submitButton,
  {
    background: tokens.color.surface,
    color: tokens.color.text,
    border: `${tokens.borderWidth.thin} solid ${tokens.color.border}`,
    selectors: { "&:hover:not(:disabled)": { background: tokens.color.page } },
  },
]);

const resetButton = style({
  marginTop: tokens.space[12],
  padding: `${tokens.space[8]} ${tokens.space[12]}`,
  minHeight: tokens.size.link,
  border: 0,
  borderRadius: tokens.radius.small,
  background: "transparent",
  color: tokens.color.muted,
  fontSize: tokens.fontSize[12],
  cursor: "pointer",
  selectors: { "&:disabled": disabledControl },
});

const status = style({
  margin: `${tokens.space[12]} ${tokens.space[12]} 0`,
  minHeight: tokens.size.statusMinHeight,
  fontSize: tokens.fontSize[12],
  lineHeight: tokens.lineHeight.body,
  color: tokens.color.muted,
  textAlign: "center",
});

const preview = style({
  marginBottom: tokens.space[28],
  perspective: tokens.size.perspective,
});

const card = style({
  aspectRatio: tokens.size.cardRatio,
  position: "relative",
  transformStyle: "preserve-3d",
  transition: `transform ${tokens.motion.flipDuration} ${tokens.motion.flipEasing}`,
  selectors: { '&[data-side="back"]': { transform: "rotateY(180deg)" } },
  "@media": { [media.reducedMotion]: { transition: "none" } },
});

const cardFace = style({
  position: "absolute",
  inset: 0,
  backfaceVisibility: "hidden",
  borderRadius: tokens.radius.card,
  overflow: "hidden",
  padding: tokens.size.cardPadding,
  color: tokens.color.cardText,
  background: tokens.background.card,
  boxShadow: tokens.shadow.card,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const cardBack = style([
  cardFace,
  {
    transform: "rotateY(180deg)",
    paddingInline: 0,
    justifyContent: "flex-start",
  },
]);

const magneticStripe = style({
  height: tokens.size.stripeHeight,
  background: tokens.color.cardStripe,
  marginTop: tokens.space[4],
});

const signature = style({
  margin: `${tokens.space[20]} ${tokens.space[24]} ${tokens.space[8]}`,
  padding: `${tokens.space[6]} ${tokens.space[12]}`,
  background: tokens.color.signatureBackground,
  color: tokens.color.signatureText,
  textAlign: "right",
  fontFamily: tokens.fontFamily.security,
  letterSpacing: tokens.letterSpacing.security,
});

const cardBackCaption = style({
  margin: `0 ${tokens.space[24]}`,
  fontSize: tokens.fontSize[9],
  letterSpacing: tokens.letterSpacing.label,
  textAlign: "right",
});

const cardTop = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const chip = style({
  width: tokens.size.chipWidth,
  height: tokens.size.chipHeight,
  flexShrink: 0,
  position: "relative",
  border: `${tokens.borderWidth.thin} solid ${tokens.color.chipBorder}`,
  borderRadius: tokens.radius.chip,
  background: tokens.background.chip,
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      inset: `${tokens.space[8]} 0`,
      borderBlock: `${tokens.borderWidth.thin} solid ${tokens.color.chipDivider}`,
    },
  },
});

const cardBrand = style({
  fontSize: tokens.fontSize[13],
  letterSpacing: tokens.letterSpacing.brand,
  fontWeight: tokens.fontWeight.strong,
});

const cardNumber = style({
  fontFamily: tokens.fontFamily.mono,
  letterSpacing: tokens.letterSpacing.number,
  fontSize: tokens.fontSize.cardNumber,
  whiteSpace: "nowrap",
});

const cardBottom = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
  gap: tokens.space[12],
});

const cardName = style({
  fontSize: tokens.fontSize[11],
  letterSpacing: tokens.letterSpacing.name,
});

const cardExpiry = style({
  fontSize: tokens.fontSize[11],
  fontVariantNumeric: "tabular-nums",
  textAlign: "right",
});

const cardCaption = style({
  display: "block",
  fontSize: tokens.fontSize[8],
  letterSpacing: tokens.letterSpacing.caption,
  color: tokens.color.cardCaption,
  marginBottom: tokens.space[4],
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
  toolbarControls,
  languageControls,
  controlButton,
  themeButton,
  form,
  fieldset,
  label,
  requiredText,
  input,
  hint,
  error,
  submitButton,
  actions,
  backButton,
  resetButton,
  status,
  formNote,
  preview,
  card,
  cardFace,
  cardBack,
  magneticStripe,
  signature,
  cardBackCaption,
  cardTop,
  chip,
  cardBrand,
  cardNumber,
  cardBottom,
  cardName,
  cardExpiry,
  cardCaption,
};
