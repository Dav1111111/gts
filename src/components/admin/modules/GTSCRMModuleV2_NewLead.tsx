import { GTSCRMModuleV2 as OriginalCRMModule } from "./GTSCRMModuleV2";
import { GTSNewLeadForm } from "./GTSNewLeadForm";
import { useState } from "react";

interface GTSCRMModuleV2Props {
  onBack: () => void;
  onNavigateToCalendar?: () => void;
}

export function GTSCRMModuleV2({ onBack, onNavigateToCalendar }: GTSCRMModuleV2Props) {
  return (
    <>
      <OriginalCRMModule onBack={onBack} onNavigateToCalendar={onNavigateToCalendar} />
    </>
  );
}