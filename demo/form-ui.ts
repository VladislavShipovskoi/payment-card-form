const fields = ["number", "expiry", "holder", "cvv"] as const;
export type FieldName = (typeof fields)[number];

export function setFieldError(
  form: HTMLFormElement,
  field: FieldName,
  message: string | null,
): void {
  const input = form.elements.namedItem(field);
  const error = form.querySelector<HTMLElement>(`#${field}-error`);

  if (!(input instanceof HTMLInputElement) || !error) {
    throw new Error(`Missing field UI: ${field}`);
  }

  const text = message?.trim() ?? "";
  const descriptions = new Set(
    (input.getAttribute("aria-describedby") ?? "").split(/\s+/).filter(Boolean),
  );

  if (text) {
    descriptions.add(error.id);
  } else {
    descriptions.delete(error.id);
  }

  input.setAttribute("aria-invalid", String(Boolean(text)));

  if (descriptions.size) {
    input.setAttribute("aria-describedby", [...descriptions].join(" "));
  } else {
    input.removeAttribute("aria-describedby");
  }

  error.textContent = text;
}

export function clearErrors(form: HTMLFormElement): void {
  for (const field of fields) setFieldError(form, field, null);
}

export function setDisabled(form: HTMLFormElement, disabled: boolean): void {
  for (const control of form.querySelectorAll<
    HTMLFieldSetElement | HTMLButtonElement
  >('fieldset, button[type="reset"]')) {
    control.disabled = disabled;
  }
  form.setAttribute("aria-disabled", String(disabled));
}
