import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import Home from "@/pages/Home";

// Lazy load pages that aren't immediately needed
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Create wrapped components with Suspense
const LazyPrivacyPolicy = () => (
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
    <PrivacyPolicy />
  </Suspense>
);

const LazyTermsOfService = () => (
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
    <TermsOfService />
  </Suspense>
);

const LazyNotFound = () => (
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
    <NotFound />
  </Suspense>
);

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy-policy" component={LazyPrivacyPolicy} />
      <Route path="/terms-of-service" component={LazyTermsOfService} />
      <Route component={LazyNotFound} />
    </Switch>
  );
}

function App() {
  return <Router />;
}

export default App;