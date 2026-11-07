import { styles } from "./styles.css.js";
import { clearErrors } from "./form-ui.js";
import { darkTheme } from "./tokens.css.js";
import { messages } from "./i18n.js";
import type { Locale, MessageKey } from "./i18n.js";

for (const element of document.querySelectorAll<HTMLElement>("[data-ui]")) {
  const key = element.dataset.ui as keyof typeof styles;
  const className = styles[key];
  if (!className) throw new Error(`Unknown page style: ${key}`);
  element.classList.add(...className.split(" "));
}

const form = document.querySelector<HTMLFormElement>("#card-form")!;
const detailsStep =
  document.querySelector<HTMLFieldSetElement>("#details-step")!;
const securityStep =
  document.querySelector<HTMLFieldSetElement>("#security-step")!;
const preview = document.querySelector<HTMLElement>("#card-preview")!;
const indicator = document.querySelector<HTMLElement>("#step-indicator")!;
const status = document.querySelector<HTMLElement>("#form-status")!;
const panel = document.querySelector<HTMLElement>("#form-panel")!;
const themeButton = document.querySelector<HTMLButtonElement>("#theme-toggle")!;
const languageControls =
  document.querySelector<HTMLElement>("#language-controls")!;
const continueButton =
  document.querySelector<HTMLButtonElement>("#continue-button")!;
const detailsInputs = ["number", "expiry", "holder"].map(
  (field) => form.querySelector<HTMLInputElement>(`#card-${field}`)!,
);

type Step = "details" | "security";
let step: Step = "details";
let locale: Locale = "en";
let theme: "light" | "dark" = "light";
type Feedback = "idle" | "submitted" | "cleared";
let feedback: Feedback = "idle";

function setText(element: Element, text: string): void {
  if (element.textContent !== text) element.textContent = text;
}

function renderFeedback(): void {
  setText(status, feedback === "idle" ? "" : messages[locale][feedback]);
}

function setFeedback(next: Feedback): void {
  feedback = next;
  renderFeedback();
}

function renderStep(): void {
  setText(
    indicator,
    step === "security"
      ? messages[locale].securityStep
      : messages[locale].detailsStep,
  );
}

function renderLocale(): void {
  const copy = messages[locale];
  panel.lang = locale;
  // Only leaf text and placeholders change; field nodes, values and selection survive.
  for (const element of panel.querySelectorAll<HTMLElement>("[data-copy]")) {
    const key = element.dataset.copy as MessageKey;
    if (copy[key] === undefined) throw new Error(`Unknown translation: ${key}`);
    setText(element, copy[key]);
  }
  for (const input of panel.querySelectorAll<HTMLInputElement>(
    "[data-placeholder]",
  )) {
    input.placeholder = copy[input.dataset.placeholder as MessageKey];
  }
  languageControls.setAttribute("aria-label", copy.language);
  for (const language of ["en", "ru"] as const) {
    document
      .querySelector(`#locale-${language}`)!
      .setAttribute("aria-pressed", String(locale === language));
  }
  // Caller-provided field errors remain untouched; their future validator owns translation.
  renderStep();
  renderFeedback();
}

function renderTheme(): void {
  form.classList.toggle(darkTheme, theme === "dark");
  form.dataset.theme = theme;
  themeButton.setAttribute("aria-pressed", String(theme === "dark"));
}

//TODO: Temporary gate: replace with real number, expiry and holder checks later.
function validateCardDetails(): boolean {
  return true;
}

function detailsAreFilled(): boolean {
  return detailsInputs.every((input) => input.value.trim().length > 0);
}

function renderContinue(): void {
  const filled = detailsAreFilled();
  continueButton.hidden = !filled;
  continueButton.disabled = !filled;
}

function showStep(next: Step, focus = true): void {
  step = next;
  detailsStep.hidden = next !== "details";
  securityStep.hidden = next !== "security";
  preview.dataset.side = next === "security" ? "back" : "front";
  renderContinue();
  renderStep();
  setFeedback("idle");
  if (focus) {
    form
      .querySelector<HTMLInputElement>(
        next === "security" ? "#card-cvv" : "#card-number",
      )!
      .focus();
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (detailsStep.disabled || securityStep.disabled) return;
  if (step === "details") {
    if (detailsAreFilled() && validateCardDetails()) showStep("security");
  } else {
    setFeedback("submitted");
  }
});

document
  .querySelector<HTMLButtonElement>("#back-button")!
  .addEventListener("click", () => {
    if (detailsStep.disabled || securityStep.disabled) return;
    showStep("details");
  });

form.addEventListener("reset", () => {
  clearErrors(form);
  showStep("details", !detailsStep.disabled && !securityStep.disabled);
  setFeedback("cleared");
  continueButton.hidden = true;
  continueButton.disabled = true;
  // A task (not a microtask) runs after the browser's native reset action.
  setTimeout(renderContinue, 0);
});

form.addEventListener("input", () => {
  setFeedback("idle");
  renderContinue();
});

form.addEventListener("change", renderContinue);

for (const language of ["en", "ru"] as const) {
  document
    .querySelector(`#locale-${language}`)!
    .addEventListener("click", () => {
      locale = language;
      renderLocale();
    });
}

themeButton.addEventListener("click", () => {
  theme = theme === "light" ? "dark" : "light";
  renderTheme();
});

renderLocale();
renderTheme();
renderContinue();
