import { GTSStaffManagementModule as GTSStaffManagementModuleRU } from "./GTSStaffManagementModule_RU";

interface GTSStaffManagementModuleProps {
  onBack: () => void;
  onNavigateToCalendar: () => void;
}

export function GTSStaffManagementModule(props: GTSStaffManagementModuleProps) {
  return <GTSStaffManagementModuleRU {...props} />;
}