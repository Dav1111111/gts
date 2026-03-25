import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl mb-4 text-yellow-400">Багги Экспедиции</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Мы создаем незабываемые приключения в мире экстремального туризма. 
              Безопасность, профессионализм и яркие эмоции — наши главные принципы.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4">Быстрые ссылки</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Наши туры</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">О компании</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Безопасность</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Отзывы</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Контакты</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg mb-4">Контакты</h4>
            <div className="space-y-2 text-gray-300">
              <p>+7 (495) 123-45-67</p>
              <p>info@buggyexpedition.ru</p>
              <p>Московская область<br />База в 50 км от МКАД</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2024 Багги Экспедиции. Все права защищены.
          </p>
          <div className="flex space-x-6 text-gray-400">
            <a href="#" className="hover:text-yellow-400 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Пользовательское соглашение</a>
          </div>
        </div>
      </div>
    </footer>
  );
}