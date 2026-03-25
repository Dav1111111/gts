import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { 
  FileText,
  Percent,
  Clock,
  AlertTriangle,
  Shield,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

export function GTSContractorTerms() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 
          className="text-3xl font-bold mb-2"
          style={{ 
            fontFamily: 'Nokia.Kokia, Inter, sans-serif',
            color: '#FFFFFF'
          }}
        >
          Условия и SLA
        </h1>
        <p 
          className="text-lg"
          style={{ 
            color: '#A6A7AA',
            fontFamily: 'Gilroy, Inter, sans-serif'
          }}
        >
          Тарифы, соглашения и правила работы
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commission Structure */}
        <Card 
          className="p-6 border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Percent className="w-6 h-6" style={{ color: '#91040C' }} />
            <h3 
              className="text-lg font-medium"
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              Комиссионная структура
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#121214' }}>
              <div>
                <p 
                  className="font-medium"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Вертолетные услуги
                </p>
                <p 
                  className="text-sm"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Robinson R44, других моделей
                </p>
              </div>
              <Badge 
                style={{ 
                  backgroundColor: '#91040C',
                  color: '#FFFFFF'
                }}
              >
                10%
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#121214' }}>
              <div>
                <p 
                  className="font-medium"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Водный транспорт
                </p>
                <p 
                  className="text-sm"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Катера, яхты, гидроциклы
                </p>
              </div>
              <Badge 
                style={{ 
                  backgroundColor: '#91040C',
                  color: '#FFFFFF'
                }}
              >
                8%
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#121214' }}>
              <div>
                <p 
                  className="font-medium"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Наземная техника
                </p>
                <p 
                  className="text-sm"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  ATV, багги, спорткары
                </p>
              </div>
              <Badge 
                style={{ 
                  backgroundColor: '#91040C',
                  color: '#FFFFFF'
                }}
              >
                12%
              </Badge>
            </div>
          </div>
        </Card>

        {/* Confirmation Windows */}
        <Card 
          className="p-6 border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6" style={{ color: '#F5A623' }} />
            <h3 
              className="text-lg font-medium"
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              Окна подтверждения
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span 
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Стандартные бронирования
                </span>
                <span 
                  className="font-medium"
                  style={{ 
                    color: '#2BB673',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  24 часа
                </span>
              </div>
              <p 
                className="text-sm"
                style={{ 
                  color: '#A6A7AA',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                Время на подтверждение обычных заявок
              </p>
            </div>

            <Separator style={{ backgroundColor: '#232428' }} />

            <div>
              <div className="flex justify-between items-center mb-2">
                <span 
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Срочные бронирования
                </span>
                <span 
                  className="font-medium"
                  style={{ 
                    color: '#F5A623',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  4 часа
                </span>
              </div>
              <p 
                className="text-sm"
                style={{ 
                  color: '#A6A7AA',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                Время на подтверждение срочных заявок
              </p>
            </div>

            <Separator style={{ backgroundColor: '#232428' }} />

            <div>
              <div className="flex justify-between items-center mb-2">
                <span 
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  VIP клиенты
                </span>
                <span 
                  className="font-medium"
                  style={{ 
                    color: '#91040C',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  2 часа
                </span>
              </div>
              <p 
                className="text-sm"
                style={{ 
                  color: '#A6A7AA',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                Время на подтверждение для VIP клиентов
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Penalties and Safety Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card 
          className="p-6 border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6" style={{ color: '#E5484D' }} />
            <h3 
              className="text-lg font-medium"
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              Штрафы и пенальти
            </h3>
          </div>

          <div className="space-y-4">
            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: '#121214' }}
            >
              <div className="flex justify-between items-center mb-2">
                <span 
                  className="font-medium"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Опоздание на подтверждение
                </span>
                <span 
                  style={{ 
                    color: '#E5484D',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  5% от суммы
                </span>
              </div>
              <p 
                className="text-sm"
                style={{ 
                  color: '#A6A7AA',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                При превышении времени ответа
              </p>
            </div>

            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: '#121214' }}
            >
              <div className="flex justify-between items-center mb-2">
                <span 
                  className="font-medium"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Отмена менее чем за 24ч
                </span>
                <span 
                  style={{ 
                    color: '#E5484D',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  20% от суммы
                </span>
              </div>
              <p 
                className="text-sm"
                style={{ 
                  color: '#A6A7AA',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                Кроме форс-мажорных обстоятельств
              </p>
            </div>

            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: '#121214' }}
            >
              <div className="flex justify-between items-center mb-2">
                <span 
                  className="font-medium"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Нарушение безопасности
                </span>
                <span 
                  style={{ 
                    color: '#E5484D',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  50% от суммы
                </span>
              </div>
              <p 
                className="text-sm"
                style={{ 
                  color: '#A6A7AA',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                При несоблюдении требований безопасности
              </p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-6 border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6" style={{ color: '#2BB673' }} />
            <h3 
              className="text-lg font-medium"
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              Правила безопасности
            </h3>
          </div>

          <div className="space-y-3">
            <div 
              className="flex items-start gap-3 p-3 rounded-lg"
              style={{ backgroundColor: '#121214' }}
            >
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                style={{ backgroundColor: '#2BB673' }}
              >
                <span className="text-xs font-bold text-white">1</span>
              </div>
              <div>
                <p 
                  className="font-medium"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Обязательный инструктаж
                </p>
                <p 
                  className="text-sm"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Для всех клиентов перед использованием техники
                </p>
              </div>
            </div>

            <div 
              className="flex items-start gap-3 p-3 rounded-lg"
              style={{ backgroundColor: '#121214' }}
            >
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                style={{ backgroundColor: '#2BB673' }}
              >
                <span className="text-xs font-bold text-white">2</span>
              </div>
              <div>
                <p 
                  className="font-medium"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Проверка погодных условий
                </p>
                <p 
                  className="text-sm"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Обязательная проверка перед каждым выездом
                </p>
              </div>
            </div>

            <div 
              className="flex items-start gap-3 p-3 rounded-lg"
              style={{ backgroundColor: '#121214' }}
            >
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                style={{ backgroundColor: '#2BB673' }}
              >
                <span className="text-xs font-bold text-white">3</span>
              </div>
              <div>
                <p 
                  className="font-medium"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Техническая исправность
                </p>
                <p 
                  className="text-sm"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Регулярные проверки и своевременное ТО
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Emergency Contacts */}
      <Card 
        className="p-6 border-0"
        style={{ backgroundColor: '#17181A' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Phone className="w-6 h-6" style={{ color: '#91040C' }} />
          <h3 
            className="text-lg font-medium"
            style={{ 
              color: '#FFFFFF',
              fontFamily: 'Nokia.Kokia, Inter, sans-serif'
            }}
          >
            Экстренные контакты
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className="p-4 rounded-lg text-center"
            style={{ backgroundColor: '#121214' }}
          >
            <Phone className="w-8 h-8 mx-auto mb-3" style={{ color: '#E5484D' }} />
            <p 
              className="font-medium mb-1"
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Экстренная служба
            </p>
            <p 
              className="text-lg font-bold"
              style={{ 
                color: '#E5484D',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              +7 (800) 911-000
            </p>
            <p 
              className="text-sm"
              style={{ 
                color: '#A6A7AA',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              24/7 экстренная помощь
            </p>
          </div>

          <div 
            className="p-4 rounded-lg text-center"
            style={{ backgroundColor: '#121214' }}
          >
            <Mail className="w-8 h-8 mx-auto mb-3" style={{ color: '#0EA5E9' }} />
            <p 
              className="font-medium mb-1"
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Техническая поддержка
            </p>
            <p 
              className="text-lg font-bold"
              style={{ 
                color: '#0EA5E9',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              +7 (800) 555-TECH
            </p>
            <p 
              className="text-sm"
              style={{ 
                color: '#A6A7AA',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Пн-Пт 9:00-18:00
            </p>
          </div>

          <div 
            className="p-4 rounded-lg text-center"
            style={{ backgroundColor: '#121214' }}
          >
            <MapPin className="w-8 h-8 mx-auto mb-3" style={{ color: '#2BB673' }} />
            <p 
              className="font-medium mb-1"
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Диспетчерская
            </p>
            <p 
              className="text-lg font-bold"
              style={{ 
                color: '#2BB673',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              +7 (862) 555-DISP
            </p>
            <p 
              className="text-sm"
              style={{ 
                color: '#A6A7AA',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Координация операций
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}