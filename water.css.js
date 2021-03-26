import { css } from 'skruv/html.js'

export default css`
:root {
  --background-body: #fff;
  --background: #efefef;
  --background-alt: #f7f7f7;
  --selection: #9e9e9e;
  --text-main: #363636;
  --text-bright: #000;
  --text-muted: #70777f;
  --links: #0076d1;
  --focus: #0096bfab;
  --border: #dbdbdb;
  --code: #000;
  --animation-duration: 0.1s;
  --button-hover: #ddd;
  --scrollbar-thumb: color-mod(var(--button-hover) lightness(-3%));
  --scrollbar-thumb-hover: color-mod(var(--button-hover) lightness(-10%));
  --form-placeholder: #949494;
  --form-text: #000;
  --variable: #39a33c;
  --highlight: #ff0;
  --select-arrow: svg-load('./assets/select-arrow.svg', fill: #161f27);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background-body: #202b38;
    --background: #161f27;
    --background-alt: #1a242f;
    --selection: #1c76c5;
    --text-main: #dbdbdb;
    --text-bright: #fff;
    --text-muted: #a9b1ba;
    --links: #41adff;
    --focus: #0096bfab;
    --border: #526980;
    --code: #ffbe85;
    --animation-duration: 0.1s;
    --button-hover: #324759;
    --scrollbar-thumb: var(--button-hover);
    --scrollbar-thumb-hover: color-mod(var(--scrollbar-thumb) lightness(+8%));
    --form-placeholder: #a9a9a9;
    --form-text: #fff;
    --variable: #d941e2;
    --highlight: #efdb43;
    --select-arrow: svg-load('./assets/select-arrow.svg', fill: #efefef);
  }
}

html {
  scrollbar-color: var(--scrollbar-thumb) var(--background-body);
  scrollbar-width: thin;
}

body {
  max-width: 800px;
  padding: 0 10px;
  margin: 20px auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif;
  line-height: 1.4;
  color: var(--text-main);
  word-wrap: break-word;
  background: var(--background-body);
  text-rendering: optimizeLegibility;
}

button,
input,
textarea {
  transition:
    background-color var(--animation-duration) linear,
    border-color var(--animation-duration) linear,
    color var(--animation-duration) linear,
    box-shadow var(--animation-duration) linear,
    transform var(--animation-duration) ease;
}

h1 {
  margin-top: 0;
  font-size: 2.2em;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 24px;
  margin-bottom: 12px;
}

h1,
h2,
h3,
h4,
h5,
h6,
strong {
  color: var(--text-bright);
}

h1,
h2,
h3,
h4,
h5,
h6,
b,
strong,
th {
  font-weight: 600;
}

q::before {
  content: none;
}

q::after {
  content: none;
}

blockquote,
q {
  padding: 0.5em 1em;
  margin: 1.5em 0;
  font-style: italic;
  border-left: 4px solid var(--focus);
}

blockquote > footer {
  font-style: normal;
  border: 0;
}

blockquote cite {
  font-style: normal;
}

address {
  font-style: normal;
}

a[href^='mailto\:']::before {
  content: '📧 ';
}

a[href^='tel\:']::before {
  content: '📞 ';
}

a[href^='sms\:']::before {
  content: '💬 ';
}

mark {
  padding: 0 2px 0 2px;
  color: #000;
  background-color: var(--highlight);
  border-radius: 2px;
}

a {
  color: var(--links);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

code,
samp,
time {
  padding: 2.5px 5px;
  font-size: 1em;
  color: var(--code);
  background: var(--background);
  border-radius: 6px;
}

pre > code {
  display: block;
  padding: 10px;
  overflow-x: auto;
}

var {
  font-family: monospace;
  font-style: normal;
  color: var(--variable);
}

kbd {
  padding: 2px 4px 2px 4px;
  color: var(--text-main);
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 2px;
}

::selection {
  color: var(--text-bright);
  background-color: var(--selection);
}

details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 10px 0;
  margin: 1em 0;
  overflow: hidden;
  background-color: var(--background-alt);
  border-radius: 6px;
}

details[open] {
  padding: 10px;
}

details > :last-child {
  margin-bottom: 0;
}

summary {
  display: list-item;
  padding: 10px;
  margin: -10px -10px 0;
  cursor: pointer;
  background-color: var(--background);
  outline: none;
}

summary:hover,
summary:focus {
  text-decoration: underline;
}

details > *:not(summary) {
  margin-top: 0;
}

details[open] summary {
  margin-bottom: 10px;
}
`
