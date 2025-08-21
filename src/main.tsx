import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo'
import App from './App'
import './index.css'

// DEV에서만 MSW 실행
if (import.meta.env.DEV) {
  (async () => {
    try {
      const { worker } = await import('./mocks/browser');
      await worker.start({
        serviceWorker: { url: '/mockServiceWorker.js' },
        onUnhandledRequest: 'bypass',
      });
    } catch (err) {
      console.warn('[MSW] start skipped:', err);
    }
  })();
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
)
