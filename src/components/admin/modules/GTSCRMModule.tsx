import { GTSCRMModuleV2 } from "./GTSCRMModuleV2";

interface GTSCRMModuleProps {
  onBack: () => void;
  onNavigateToCalendar: () => void;
}

export function GTSCRMModule({ onBack, onNavigateToCalendar }: GTSCRMModuleProps) {
  return <GTSCRMModuleV2 onBack={onBack} onNavigateToCalendar={onNavigateToCalendar} />;
}