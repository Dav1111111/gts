import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export function ContactForm() {
  type ContactFormData = {
    name: string;
    email: string;
    phone: string;
    tour: string;
    message: string;
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tour: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', email: '', phone: '', tour: '', message: '' });
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6">Связаться с нами</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Готовы к приключению? Оставьте заявку, и мы подберем идеальный тур для вас
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl mb-6">Контактная информация</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-yellow-600 mr-4 mt-1" />
                  <div>
                    <div className="text-lg">+7 (495) 123-45-67</div>
                    <div className="text-gray-600">Ежедневно с 9:00 до 21:00</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-yellow-600 mr-4 mt-1" />
                  <div>
                    <div className="text-lg">info@buggyexpedition.ru</div>
                    <div className="text-gray-600">Ответим в течение часа</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-yellow-600 mr-4 mt-1" />
                  <div>
                    <div className="text-lg">Московская область</div>
                    <div className="text-gray-600">База в 50 км от МКАД</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-xl">
              <h4 className="text-lg mb-3">🎁 Специальное предложение</h4>
              <p className="text-gray-700 mb-4">
                При бронировании тура до конца месяца — скидка 15% для групп от 4 человек!
              </p>
              <p className="text-sm text-gray-600">
                *Предложение действует при оплате полной стоимости тура
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Оставить заявку</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Input
                  type="tel"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  required
                />

                <Select onValueChange={(value) => handleChange('tour', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тур" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classic">Классическое сафари</SelectItem>
                    <SelectItem value="extreme">Экстремальная экспедиция</SelectItem>
                    <SelectItem value="family">Семейное приключение</SelectItem>
                    <SelectItem value="custom">Индивидуальный тур</SelectItem>
                  </SelectContent>
                </Select>

                <Textarea
                  placeholder="Ваше сообщение или особые пожелания"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  rows={4}
                />

                <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Send className="w-4 h-4 mr-2" />
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
