import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'
import * as serviceWorker from './serviceWorker';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { v4 as uuidv4 } from 'uuid';

import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache';

const nonce = Buffer.from(uuidv4()).toString('base64')
const cspDirectives = {
  'default-src': "'self'",
  'connect-src': "'self' https://api.pwnedpasswords.com", /// Add all api endpoints here
  'style-src': `'self' 'nonce-${nonce}' https://fonts.googleapis.com`,
  'font-src': "'self' https://fonts.gstatic.com",
  'img-src': "'self' https://cdnjs.cloudflare.com"
}

const cache = createCache({
  key: 'example-key',
  nonce: nonce, 
  prepend: true
})

let cspContent = ""
Object.keys(cspDirectives).forEach((key) => {
  cspContent += `${key} ${cspDirectives[key]}; `
})

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <CacheProvider value={cache}>
        <HelmetProvider>
          <Helmet>
            <meta http-equiv="Content-Security-Policy" content={cspContent} />
            <meta property="csp-nonce" content={nonce} />
          </Helmet>
          <App />
        </HelmetProvider>
      </CacheProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
