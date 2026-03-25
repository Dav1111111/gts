import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { GTSNavigationHeader } from "../GTSNavigationHeader";
import { GTSFooter } from "../GTSFooter";
import { Route } from "../GTSRouter";
import { 
  Phone, Mail, MapPin, Clock, Send,
  Instagram, Facebook, Youtube
} from "lucide-react";
import { motion } from "motion/react";

interface GTSContactsPageProps {
  onNavigate: (route: Route) => void;
}

export function GTSContactsPage({ onNavigate }: GTSContactsPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // В реальном приложении - отправка на сервер
  };

  return (
    <div className="min-h-screen bg-white">
      <GTSNavigationHeader onNavigate={onNavigate} />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-6">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl lg:text-7xl text-black mb-6 tracking-wider">
              СВЯЖИТЕСЬ
              <span className="block text-[#91040C] mt-2">С НАМИ</span>
            </h1>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Наша команда готова ответить на любые вопросы и помочь организовать незабываемое приключение
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl text-black mb-6">Контактная информация</h2>
                
                <div className="space-y-6">
                  <Card className="bg-white border-black/10 p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[#91040C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-[#91040C]" />
                      </div>
                      <div>
                        <h3 className="text-black mb-2">Телефон</h3>
                        <p className="text-black/70 text-lg">+7 (862) 555-0123</p>
                        <p className="text-black/50 text-sm">Круглосуточно, 7 дней в неделю</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-white border-black/10 p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[#91040C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-[#91040C]" />
                      </div>
                      <div>
                        <h3 className="text-black mb-2">Email</h3>
                        <p className="text-black/70 text-lg">club@grandtoursochi.ru</p>
                        <p className="text-black/50 text-sm">Ответим в течение 1 часа</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-white border-black/10 p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[#91040C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-[#91040C]" />
                      </div>
                      <div>
                        <h3 className="text-black mb-2">Адрес</h3>
                        <p className="text-black/70">Олимпийский парк</p>
                        <p className="text-black/70">Адлерский район, Сочи</p>
                        <p className="text-black/70">Краснодарский край, 354340</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-white border-black/10 p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[#91040C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-[#91040C]" />
                      </div>
                      <div>
                        <h3 className="text-black mb-2">Часы работы офиса</h3>
                        <p className="text-black/70">Пн-Пт: 09:00 - 20:00</p>
                        <p className="text-black/70">Сб-Вс: 10:00 - 18:00</p>
                        <p className="text-black/50 text-sm mt-2">Консьерж-сервис: 24/7</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Social */}
              <div>
                <h3 className="text-xl text-black mb-4">Мы в социальных сетях</h3>
                <div className="flex space-x-4">
                  <button className="w-12 h-12 bg-black/5 hover:bg-[#91040C]/10 rounded-full flex items-center justify-center transition-colors">
                    <Instagram className="w-6 h-6 text-black/70" />
                  </button>
                  <button className="w-12 h-12 bg-black/5 hover:bg-[#91040C]/10 rounded-full flex items-center justify-center transition-colors">
                    <Facebook className="w-6 h-6 text-black/70" />
                  </button>
                  <button className="w-12 h-12 bg-black/5 hover:bg-[#91040C]/10 rounded-full flex items-center justify-center transition-colors">
                    <Youtube className="w-6 h-6 text-black/70" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-white border-black/10 p-8">
                <h2 className="text-2xl text-black mb-6">Напишите нам</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-black/70 mb-2">Ваше имя</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="border-black/20"
                    />
                  </div>

                  <div>
                    <label className="block text-black/70 mb-2">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ivan@example.com"
                      className="border-black/20"
                    />
                  </div>

                  <div>
                    <label className="block text-black/70 mb-2">Телефон</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (___) ___-__-__"
                      className="border-black/20"
                    />
                  </div>

                  <div>
                    <label className="block text-black/70 mb-2">Сообщение</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Расскажите, чем мы можем помочь..."
                      rows={6}
                      className="border-black/20"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-[#91040C] hover:bg-[#91040C]/90 text-white py-6"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Отправить сообщение
                  </Button>

                  <p className="text-sm text-black/50 text-center">
                    Отправляя форму, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              </Card>
            </motion.div>

          </div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16"
          >
            <Card className="bg-gray-100 border-black/10 h-96 flex items-center justify-center">
              <div className="text-center text-black/40">
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <p>Карта расположения</p>
              </div>
            </Card>
          </motion.div>

        </div>
      </main>

      <GTSFooter />
    </div>
  );
}
