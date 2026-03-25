import { GTSClientClubPortalComplete } from "../portal/GTSClientClubPortalComplete";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  permissions: string[];
}

interface GTSClientClubPortalProps {
  user: User;
  onLogout: () => void;
  onBackToHome: () => void;
}

export function GTSClientClubPortal({ user, onLogout, onBackToHome }: GTSClientClubPortalProps) {
  return <GTSClientClubPortalComplete onBack={onBackToHome} />;
}