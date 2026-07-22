import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import * as Sentry from "@sentry/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ClerkProvider } from "@clerk/react";
import SentryUserSync from "./components/SentryUserSync.jsx";
import SentryErrorFallback from "./components/SentryErrorFallback.jsx";

const queryClient = new QueryClient();

const apiBase = import.meta.env.VITE_API_URL ?? "";
const tracePropagationTargets = 
  apiBase.length > 0 ? [apiBase] : typeof window !== "undefined" ? [window.location.origin] : [];

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  sendDefaultPii: true,
  integrations:[
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      maskAllInputs: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: tracePropagationTargets,
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  enableLogs: true,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
        <QueryClientProvider client={queryClient}>
          <Sentry.ErrorBoundary fallback={<SentryErrorFallback />}>
            <SentryUserSync />
            <App />
          </Sentry.ErrorBoundary>
        </QueryClientProvider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
);