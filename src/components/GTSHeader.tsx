import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X, Phone } from "lucide-react";

interface GTSHeaderProps {
  onNavigateToCatalog?: () => void;
  onNavigateToMembership?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToAdmin?: () => void;
  onNavigateToUILibrary?: () => void;
  onNavigateToSharedModules?: () => void;
  onNavigateToPartnerCreation?: () => void;
  onNavigateToExtendedAdmin?: () => void;
  onNavigateToUnifiedAdmin?: () => void;
}

export function GTSHeader({ onNavigateToCatalog, onNavigateToMembership, onNavigateToDashboard, onNavigateToAdmin, onNavigateToUILibrary, onNavigateToSharedModules, onNavigateToPartnerCreation, onNavigateToExtendedAdmin, onNavigateToUnifiedAdmin }: GTSHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCatalogClick = () => {
    if (onNavigateToCatalog) {
      onNavigateToCatalog();
    } else {
      // Scroll to fleet section if no callback provided
      document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleMembershipClick = () => {
    if (onNavigateToMembership) {
      onNavigateToMembership();
    } else {
      // Scroll to membership section if no callback provided
      document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleDashboardClick = () => {
    if (onNavigateToDashboard) {
      onNavigateToDashboard();
    }
    setIsMenuOpen(false);
  };

  const handleAdminClick = () => {
    if (onNavigateToAdmin) {
      onNavigateToAdmin();
    }
    setIsMenuOpen(false);
  };

  const handleUILibraryClick = () => {
    if (onNavigateToUILibrary) {
      onNavigateToUILibrary();
    }
    setIsMenuOpen(false);
  };

  const handleSharedModulesClick = () => {
    if (onNavigateToSharedModules) {
      onNavigateToSharedModules();
    }
    setIsMenuOpen(false);
  };

  const handlePartnerCreationClick = () => {
    if (onNavigateToPartnerCreation) {
      onNavigateToPartnerCreation();
    }
    setIsMenuOpen(false);
  };

  const handleExtendedAdminClick = () => {
    if (onNavigateToExtendedAdmin) {
      onNavigateToExtendedAdmin();
    }
    setIsMenuOpen(false);
  };

  const handleUnifiedAdminClick = () => {
    if (onNavigateToUnifiedAdmin) {
      onNavigateToUnifiedAdmin();
    }
    setIsMenuOpen(false);
  };



  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-white text-xl lg:text-2xl font-medium tracking-wider">
              GTS
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-12">
            <a href="#about" className="text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wide">
              О КЛУБЕ
            </a>
            <button 
              onClick={handleMembershipClick}
              className="text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wide"
            >
              ЧЛЕНСТВО
            </button>
            <button 
              onClick={handleCatalogClick}
              className="text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wide"
            >
              ТЕХНИКА
            </button>
            <a href="#expeditions" className="text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wide">
              ЭКСПЕДИЦИИ
            </a>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wide">
              КОНТАКТЫ
            </a>
            <button 
              onClick={handleSharedModulesClick}
              className="text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wide"
            >
              МОДУЛИ
            </button>
            <button 
              onClick={handlePartnerCreationClick}
              className="text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wide"
            >
              ПАРТНЁРЫ
            </button>
            <button 
              onClick={handleExtendedAdminClick}
              className="text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wide"
            >
              АДМИН+
            </button>
            <button 
              onClick={handleUnifiedAdminClick}
              className="text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wide"
            >
              UNIFIED
            </button>
            <button 
              onClick={() => {/* Add navigation to new system */}}
              className="text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wide"
            >
              СИСТЕМА
            </button>
          </nav>

          {/* Phone and CTA - Desktop only */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center text-white/80 text-sm">
              <Phone className="w-4 h-4 mr-2" />
              <span>+7 (862) 555-0123</span>
            </div>
            <Button 
              size="sm"
              onClick={handleDashboardClick}
              className="bg-[#91040C] hover:bg-[#91040C]/90 text-white border-0 px-6 py-2 text-sm tracking-wide"
            >
              ЛИЧНЫЙ КАБИНЕТ
            </Button>
          </div>

          {/* Mobile CTA and menu button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <Button 
              size="sm"
              onClick={handleDashboardClick}
              className="bg-[#91040C] hover:bg-[#91040C]/90 text-white border-0 px-4 py-1.5 text-xs tracking-wide"
            >
              КАБИНЕТ
            </Button>
            <button
              className="text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-black/95 absolute left-0 right-0">
            <nav className="py-4 space-y-1">
              <a 
                href="#about" 
                className="block text-white/80 hover:text-white hover:bg-white/5 transition-colors text-base tracking-wide px-4 py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                О КЛУБЕ
              </a>
              <button 
                onClick={handleMembershipClick}
                className="block w-full text-left text-white/80 hover:text-white hover:bg-white/5 transition-colors text-base tracking-wide px-4 py-3"
              >
                ЧЛЕНСТВО
              </button>
              <button 
                onClick={handleCatalogClick}
                className="block w-full text-left text-white/80 hover:text-white hover:bg-white/5 transition-colors text-base tracking-wide px-4 py-3"
              >
                ТЕХНИКА
              </button>
              <button 
                onClick={handleDashboardClick}
                className="block w-full text-left text-white/80 hover:text-white hover:bg-white/5 transition-colors text-base tracking-wide px-4 py-3"
              >
                ЛИЧНЫЙ КАБИНЕТ
              </button>
              <a 
                href="#expeditions" 
                className="block text-white/80 hover:text-white hover:bg-white/5 transition-colors text-base tracking-wide px-4 py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                ЭКСПЕДИЦИИ
              </a>
              <a 
                href="#contact" 
                className="block text-white/80 hover:text-white hover:bg-white/5 transition-colors text-base tracking-wide px-4 py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                КОНТАКТЫ
              </a>
              <button 
                onClick={handleSharedModulesClick}
                className="block w-full text-left text-white/80 hover:text-white hover:bg-white/5 transition-colors text-base tracking-wide px-4 py-3"
              >
                МОДУЛИ
              </button>
              <button 
                onClick={handlePartnerCreationClick}
                className="block w-full text-left text-white/80 hover:text-white hover:bg-white/5 transition-colors text-base tracking-wide px-4 py-3"
              >
                ПАРТНЁРЫ
              </button>
              <button 
                onClick={handleExtendedAdminClick}
                className="block w-full text-left text-white/80 hover:text-white hover:bg-white/5 transition-colors text-base tracking-wide px-4 py-3"
              >
                АДМИН+
              </button>
              <button 
                onClick={handleUnifiedAdminClick}
                className="block w-full text-left text-white/80 hover:text-white hover:bg-white/5 transition-colors text-base tracking-wide px-4 py-3"
              >
                UNIFIED
              </button>
              <button 
                onClick={() => {/* Add mobile navigation */}}
                className="block w-full text-left text-white/80 hover:text-white hover:bg-white/5 transition-colors text-base tracking-wide px-4 py-3"
              >
                СИСТЕМА
              </button>
              <div className="px-4 py-3 border-t border-white/10 mt-2">
                <div className="flex items-center text-white/80 mb-3 text-sm">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+7 (862) 555-0123</span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}