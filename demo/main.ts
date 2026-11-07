import { styles } from "./styles.css.js";

for (const element of document.querySelectorAll<HTMLElement>("[data-ui]")) {
  const key = element.dataset.ui as keyof typeof styles;
  const className = styles[key];
  if (!className) throw new Error(`Unknown page style: ${key}`);
  element.classList.add(...className.split(" "));
}

document
  .querySelector<HTMLFormElement>("#card-form")!
  .addEventListener("submit", (event) => {
    event.preventDefault();
  });
