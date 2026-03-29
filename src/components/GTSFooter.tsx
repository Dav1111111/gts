import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { GTSStyles } from "../utils/gts-styles";
import { GTSLogo } from "./GTSLogo";
import { useCMS } from "../cms/CMSProvider";

export function GTSFooter() {
  const { data: { footer } } = useCMS();
  
  return (
    <footer className="bg-black text-white py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="mb-4 lg:mb-6">
              <GTSLogo size="md" />
            </div>
            <p className="text-white/60 mb-6 lg:mb-8 font-light leading-relaxed text-sm lg:text-base">
              {footer.description}
            </p>
            <div className="flex space-x-4 lg:space-x-6">
              <a href={footer.contact?.socialLinks?.instagram || '#'} className="text-white/60 hover:text-[#91040C] transition-colors" aria-label="Instagram">
                <Instagram className={GTSStyles.icons.medium} aria-hidden="true" />
              </a>
              <a href={footer.contact?.socialLinks?.facebook || '#'} className="text-white/60 hover:text-[#91040C] transition-colors" aria-label="Facebook">
                <Facebook className={GTSStyles.icons.medium} aria-hidden="true" />
              </a>
              <a href={footer.contact?.socialLinks?.youtube || '#'} className="text-white/60 hover:text-[#91040C] transition-colors" aria-label="YouTube">
                <Youtube className={GTSStyles.icons.medium} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="order-3 lg:order-2">
            <h4 className="text-white font-medium mb-4 lg:mb-6 tracking-wide text-sm lg:text-base">ВПЕЧАТЛЕНИЯ</h4>
            <ul className="space-y-3 lg:space-y-4 text-white/60">
              {footer.services?.map((service, index) => (
                <li key={index}><a href="#" className="hover:text-white transition-colors text-sm">{service}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="order-2 lg:order-3">
            <h4 className="text-white font-medium mb-4 lg:mb-6 tracking-wide text-sm lg:text-base">КОНТАКТЫ</h4>
            <div className="space-y-3 lg:space-y-4 text-white/60">
              <div className="flex items-start">
                <Phone aria-hidden="true" className={`${GTSStyles.icons.small} mr-2 lg:mr-3 mt-0.5 text-[#91040C] flex-shrink-0`} />
                <div>
                  <div className="text-sm">{footer.contact.phone}</div>
                  <div className="text-xs text-white/40">{footer.contact.phoneNote}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail aria-hidden="true" className={`${GTSStyles.icons.small} mr-2 lg:mr-3 mt-0.5 text-[#91040C] flex-shrink-0`} />
                <div>
                  <div className="text-sm break-all">{footer.contact.email}</div>
                  <div className="text-xs text-white/40">{footer.contact.emailNote}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin aria-hidden="true" className={`${GTSStyles.icons.small} mr-2 lg:mr-3 mt-0.5 text-[#91040C] flex-shrink-0`} />
                <div>
                  <div className="text-sm">{footer.contact.address}</div>
                  <div className="text-xs text-white/40">{footer.contact.addressNote}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 lg:pt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center text-white/40 text-xs lg:text-sm space-y-4 lg:space-y-0">
          <div>
            {footer.copyright}
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-xs lg:text-sm">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Пользовательское соглашение</a>
          </div>
        </div>
      </div>
    </footer>
  );
}