import { globalStyle } from '@vanilla-extract/css';
import { tokens } from './tokens.css.js';

globalStyle('*, *::before, *::after', { boxSizing: 'border-box' });
globalStyle('body', {
  margin: 0, padding: 32, background: tokens.page, color: tokens.text,
  fontFamily: tokens.font, lineHeight: 1.6,
});
