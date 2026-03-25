import { useState } from "react";
import { PageType, NavigationContext, UserRole, getDefaultPageForRole } from "../utils/navigation";

export function useNavigation() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [navigationContext, setNavigationContext] = useState<NavigationContext>({});
  const [userRole, setUserRole] = useState<UserRole>('');

  // Enhanced navigation function with context
  const navigateToModule = (targetModule: string, context?: NavigationContext) => {
    setNavigationContext({
      sourceModule: currentPage,
      userRole,
      ...context
    });
    setCurrentPage(targetModule as PageType);
  };

  const handleRoleSelected = (role: UserRole) => {
    setUserRole(role);
    const defaultPage = getDefaultPageForRole(role);
    setCurrentPage(defaultPage);
  };

  const goToHome = () => setCurrentPage("home");
  const goToLogin = () => setCurrentPage("login");

  return {
    currentPage,
    navigationContext,
    userRole,
    setCurrentPage,
    navigateToModule,
    handleRoleSelected,
    goToHome,
    goToLogin
  };
}