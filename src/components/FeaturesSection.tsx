import { Shield, Award, Users, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Безопасность",
    description: "Профессиональные инструкторы, качественное снаряжение и полная страховка для всех участников"
  },
  {
    icon: Award,
    title: "Опытные гиды",
    description: "Наши гиды знают каждый уголок пустыни и обеспечат незабываемые впечатления"
  },
  {
    icon: Users,
    title: "Индивидуальный подход",
    description: "Персонализируем каждый тур под ваши предпочтения и уровень подготовки"
  },
  {
    icon: Headphones,
    title: "24/7 поддержка",
    description: "Круглосуточная поддержка до, во время и после вашего приключения"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6">Почему выбирают нас</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Мы предоставляем не просто экскурсии, а настоящие приключения с гарантией безопасности и качества
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6 group-hover:bg-yellow-200 transition-colors">
                <feature.icon className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Statistics */}
        <div className="mt-20 bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl mb-2 text-primary">500+</div>
              <div className="text-gray-600">Довольных клиентов</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl mb-2 text-primary">50+</div>
              <div className="text-gray-600">Маршрутов</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl mb-2 text-primary">5</div>
              <div className="text-gray-600">Лет опыта</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl mb-2 text-primary">0</div>
              <div className="text-gray-600">Несчастных случаев</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}