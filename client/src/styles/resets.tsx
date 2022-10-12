import { createGlobalStyle } from "styled-components";

export const StyledResets = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    
    color: white;
    font-weight: 300;
    letter-spacing: 1px;
    font-family: 'Kumbh Sans', sans-serif; 
    
    scrollbar-width: none; /* for Firefox */
    -ms-overflow-style: none; /* for IE, Edge */
    
    cursor: default;
    transition: all 200ms ease-in-out 0s;
  }
  html {
    height: 100vh;
    width: 100vw;
    background-color: rgb(32, 36, 42) ;
  }
  body {
    height: 100%;
    width: 100%;
  }
  ::-webkit-scrollbar {
    display: none;
    appearance: none;
  }
  *.hidden {
    display: none;
  }
  *.disabled {
    opacity: 0.6;
    pointer-events: none;
  }
  div#root {
    position: relative;
    overflow: hidden;

    height: 100vh;
    width: 100vw;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding-bottom: 20px;
  }
  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
  }

  /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
  */

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  body.react-confirm-alert-body-element {
  overflow: hidden;
}

.react-confirm-alert-blur {
  filter: url(#gaussian-blur);
  filter: blur(2px);
  -webkit-filter: blur(2px);
}

.react-confirm-alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;

  background: rgba(255, 255, 255, 0.12);
  @include flex(initial, center, center, initial);
  opacity: 0;
  -webkit-animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
  -moz-animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
  -o-animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
  animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
}

.react-confirm-alert-body {
  width: 300px;
  padding: 30px;
  text-align: left;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 20px 75px rgba(0, 0, 0, 0.13);
  color: #666;
}

.react-confirm-alert-svg {
  position: absolute;
  top: 0;
  left: 0;
}

.react-confirm-alert-body > h1 {
  margin-top: 0;
}

.react-confirm-alert-body > h3 {
  margin: 0;
  font-size: 16px;
}

.react-confirm-alert-button-group {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
}

.react-confirm-alert-button-group > button {
  outline: none;
  background: #333;
  border: none;
  display: inline-block;
  padding: 6px 18px;
  color: #eee;
  margin-right: 10px;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
}

@-webkit-keyframes react-confirm-alert-fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-moz-keyframes react-confirm-alert-fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-o-keyframes react-confirm-alert-fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes react-confirm-alert-fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

#react-confirm-alert > div > div > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;

  position: absolute;
  top: 40%;
  left: 0;
  right: 0;

  margin: 0 auto;
  padding: 30px 20px;
  max-height: 260px;
  height: 100%;
  min-width: 280px;
  max-width: 290px;
  width: 100%;

  color: rgb(25, 21, 46);
  text-align: center;
  font-size: 1.3rem;
  line-height: 2rem;
  font-family: 'Kumbh Sans', sans-serif;

  outline: none;
  overflow: hidden;
  border-radius: 5px;
  border: 1px solid rgb(56, 42, 138);
  background-color: rgb(128, 142, 161);

  > div {
    display: row;
    flex-direction: column;
    justify-content: center;
    gap: 28px;
  }
  button {
    padding: 8px 20px;

    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 1px;

    border: none;
    cursor: pointer;

    color: #19152E;
    background-color: rgb(43, 11, 49);

    &:hover {
      filter: brightness(1.1);
    }
    &.return-btn {
      color: #19152E;
      background-color: transparent;
    }
    &.delete-btn {
      min-width: 166.6px;
      background-color: rgb(56, 42, 138);
      color: white;
    }
    .close-modal-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      font-size: 1.6em;
      cursor: pointer;
      &:hover {
        filter: brightness(2);
      }
      * {
        pointer-events: none;
      }
    }
  }
}
`;
