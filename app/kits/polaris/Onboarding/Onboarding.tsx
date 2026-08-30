import { useState } from 'react';
import { OnboardingFlow } from './partials/components/OnboardingFlow';

export default function Onboarding() {
  const [resetKey, setResetKey] = useState(0);

  return (
    <OnboardingFlow
      key={resetKey}
      onGoToDashboard={() => {
        // TODO: wire to your router, e.g. navigate('/dashboard')
        window.alert('→ Navigating to the Revenue Dashboard');
      }}
      onExit={() => {
        // TODO: wire to your router / close the embedded app frame
        window.alert('Exiting setup — the merchant can resume later from the Hub.');
      }}
      onRestart={() => setResetKey((k) => k + 1)}
    />
  );
}
