import { styles } from "./styles.css.js";
import { clearErrors } from "./form-ui.js";

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

type Step = "details" | "security";
let step: Step = "details";

//TODO: Temporary gate: replace with real number, expiry and holder checks later.
function validateCardDetails(): boolean {
  return true;
}

function showStep(next: Step, focus = true): void {
  step = next;
  detailsStep.hidden = next !== "details";
  securityStep.hidden = next !== "security";
  preview.dataset.side = next === "security" ? "back" : "front";
  indicator.textContent =
    next === "security" ? "02 — SECURITY CODE" : "01 — CARD DETAILS";
  status.textContent = "";
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
    if (validateCardDetails()) showStep("security");
  } else {
    status.textContent =
      "Demo only: validation and payments are not connected. Nothing was sent.";
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
  status.textContent = "Form cleared. Nothing was sent.";
});

form.addEventListener("input", () => {
  status.textContent = "";
});
