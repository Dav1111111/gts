import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { QrCode, Link, Download, Upload, MapPin, Plus, Eye, Edit, Trash2 } from "lucide-react";

export function GTSBrandPartnerTools() {
  const mediaKitFiles = [
    { name: "GTS_Logo_Primary.png", size: "248 KB", type: "Логотип", updated: "2024-01-10" },
    { name: "GTS_Logo_White.png", size: "198 KB", type: "Логотип", updated: "2024-01-10" },
    { name: "Banner_Summer_1920x1080.jpg", size: "1.2 MB", type: "Баннер", updated: "2024-01-15" },
    { name: "Banner_Summer_1200x628.jpg", size: "856 KB", type: "Баннер", updated: "2024-01-15" },
    { name: "GTS_Brand_Guidelines.pdf", size: "2.8 MB", type: "Документ", updated: "2024-01-01" },
    { name: "Product_Images_Pack.zip", size: "15.4 MB", type: "Архив", updated: "2024-01-12" }
  ];

  const locations = [
    {
      id: "LOC-001",
      name: "SPA Центр Роза Хутор",
      address: "ул. Олимпийская, 35, Красная Поляна",
      coordinates: "43.6656, 40.2756",
      status: "active",
      qrCode: "QR-SPA-RH-001",
      visits: 2847
    },
    {
      id: "LOC-002", 
      name: "Wellness Центр Горки Город",
      address: "Курорт Горки Город, 960м",
      coordinates: "43.6789, 40.2892",
      status: "active",
      qrCode: "QR-WEL-GG-002",
      visits: 1923
    },
    {
      id: "LOC-003",
      name: "Фитнес-клуб Адлер",
      address: "ул. Ленина, 298, Адлер",
      coordinates: "43.4267, 39.9342",
      status: "pending",
      qrCode: "-",
      visits: 0
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl mb-2" style={{ color: "var(--gts-portal-text)" }}>
          Промо-инструменты
        </h1>
        <p style={{ color: "var(--gts-portal-muted)" }}>
          Инструменты для создания и управления промо-материалами
        </p>
      </div>

      <Tabs defaultValue="generators" className="w-full">
        <TabsList 
          className="grid w-full grid-cols-4"
          style={{ 
            backgroundColor: "var(--gts-portal-surface)",
            borderColor: "var(--gts-portal-border)"
          }}
        >
          <TabsTrigger 
            value="generators"
            className="data-[state=active]:bg-white data-[state=active]:text-black"
          >
            Генераторы
          </TabsTrigger>
          <TabsTrigger 
            value="utm"
            className="data-[state=active]:bg-white data-[state=active]:text-black"
          >
            UTM Builder
          </TabsTrigger>
          <TabsTrigger 
            value="mediakit"
            className="data-[state=active]:bg-white data-[state=active]:text-black"
          >
            Медиа-кит
          </TabsTrigger>
          <TabsTrigger 
            value="locations"
            className="data-[state=active]:bg-white data-[state=active]:text-black"
          >
            Локации
          </TabsTrigger>
        </TabsList>

        {/* QR & Referral Generators */}
        <TabsContent value="generators" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* QR Code Generator */}
            <Card 
              className="p-6"
              style={{ 
                backgroundColor: "var(--gts-portal-card)",
                borderColor: "var(--gts-portal-border)"
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <QrCode size={24} style={{ color: "var(--gts-portal-accent)" }} />
                <h3 className="text-lg" style={{ color: "var(--gts-portal-text)" }}>
                  QR Code генератор
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="qr-campaign" style={{ color: "var(--gts-portal-text)" }}>
                    Название кампании
                  </Label>
                  <Input 
                    id="qr-campaign"
                    placeholder="Летние приключения 2024"
                    style={{ 
                      backgroundColor: "var(--gts-portal-surface)",
                      borderColor: "var(--gts-portal-border)",
                      color: "var(--gts-portal-text)"
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="qr-landing" style={{ color: "var(--gts-portal-text)" }}>
                    Целевая страница
                  </Label>
                  <Input 
                    id="qr-landing"
                    placeholder="https://grandtoursochi.ru/summer2024"
                    style={{ 
                      backgroundColor: "var(--gts-portal-surface)",
                      borderColor: "var(--gts-portal-border)",
                      color: "var(--gts-portal-text)"
                    }}
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1"
                    style={{ 
                      backgroundColor: "var(--gts-portal-accent)",
                      color: "white"
                    }}
                  >
                    Генерировать QR
                  </Button>
                  <Button 
                    variant="outline"
                    style={{ 
                      borderColor: "var(--gts-portal-border)",
                      color: "var(--gts-portal-text)"
                    }}
                  >
                    <Download size={16} />
                  </Button>
                </div>

                {/* QR Preview */}
                <div 
                  className="h-32 rounded-lg border-2 border-dashed flex items-center justify-center"
                  style={{ borderColor: "var(--gts-portal-border)" }}
                >
                  <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
                    Превью QR кода
                  </p>
                </div>
              </div>
            </Card>

            {/* Referral Link Generator */}
            <Card 
              className="p-6"
              style={{ 
                backgroundColor: "var(--gts-portal-card)",
                borderColor: "var(--gts-portal-border)"
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Link size={24} style={{ color: "var(--gts-portal-accent)" }} />
                <h3 className="text-lg" style={{ color: "var(--gts-portal-text)" }}>
                  Реферальные ссылки
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="ref-source" style={{ color: "var(--gts-portal-text)" }}>
                    Источник трафика
                  </Label>
                  <Input 
                    id="ref-source"
                    placeholder="website, newsletter, social"
                    style={{ 
                      backgroundColor: "var(--gts-portal-surface)",
                      borderColor: "var(--gts-portal-border)",
                      color: "var(--gts-portal-text)"
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="ref-medium" style={{ color: "var(--gts-portal-text)" }}>
                    Тип размещения
                  </Label>
                  <Input 
                    id="ref-medium"
                    placeholder="banner, text-link, email"
                    style={{ 
                      backgroundColor: "var(--gts-portal-surface)",
                      borderColor: "var(--gts-portal-border)",
                      color: "var(--gts-portal-text)"
                    }}
                  />
                </div>

                <Button 
                  className="w-full"
                  style={{ 
                    backgroundColor: "var(--gts-portal-accent)",
                    color: "white"
                  }}
                >
                  Создать ссылку
                </Button>

                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: "var(--gts-portal-surface)" }}
                >
                  <p className="text-xs mb-1" style={{ color: "var(--gts-portal-muted)" }}>
                    Сгенерированная ссылка:
                  </p>
                  <p className="text-sm font-mono" style={{ color: "var(--gts-portal-text)" }}>
                    https://grandtoursochi.ru/?ref=partner&src=website&medium=banner
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* UTM Builder */}
        <TabsContent value="utm" className="mt-6">
          <Card 
            className="p-6"
            style={{ 
              backgroundColor: "var(--gts-portal-card)",
              borderColor: "var(--gts-portal-border)"
            }}
          >
            <h3 className="text-lg mb-4" style={{ color: "var(--gts-portal-text)" }}>
              Конструктор UTM меток
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="utm-url" style={{ color: "var(--gts-portal-text)" }}>
                    Базовый URL *
                  </Label>
                  <Input 
                    id="utm-url"
                    placeholder="https://grandtoursochi.ru"
                    style={{ 
                      backgroundColor: "var(--gts-portal-surface)",
                      borderColor: "var(--gts-portal-border)",
                      color: "var(--gts-portal-text)"
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="utm-source" style={{ color: "var(--gts-portal-text)" }}>
                    Источник (utm_source) *
                  </Label>
                  <Input 
                    id="utm-source"
                    placeholder="partner-spa"
                    style={{ 
                      backgroundColor: "var(--gts-portal-surface)",
                      borderColor: "var(--gts-portal-border)",
                      color: "var(--gts-portal-text)"
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="utm-medium" style={{ color: "var(--gts-portal-text)" }}>
                    Канал (utm_medium) *
                  </Label>
                  <Input 
                    id="utm-medium"
                    placeholder="banner"
                    style={{ 
                      backgroundColor: "var(--gts-portal-surface)",
                      borderColor: "var(--gts-portal-border)",
                      color: "var(--gts-portal-text)"
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="utm-campaign" style={{ color: "var(--gts-portal-text)" }}>
                    Кампания (utm_campaign)
                  </Label>
                  <Input 
                    id="utm-campaign"
                    placeholder="summer-2024"
                    style={{ 
                      backgroundColor: "var(--gts-portal-surface)",
                      borderColor: "var(--gts-portal-border)",
                      color: "var(--gts-portal-text)"
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="utm-content" style={{ color: "var(--gts-portal-text)" }}>
                    Содержание (utm_content)
                  </Label>
                  <Input 
                    id="utm-content"
                    placeholder="hero-banner"
                    style={{ 
                      backgroundColor: "var(--gts-portal-surface)",
                      borderColor: "var(--gts-portal-border)",
                      color: "var(--gts-portal-text)"
                    }}
                  />
                </div>

                <Button 
                  className="w-full"
                  style={{ 
                    backgroundColor: "var(--gts-portal-accent)",
                    color: "white"
                  }}
                >
                  Построить UTM ссылку
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label style={{ color: "var(--gts-portal-text)" }}>
                    Результат:
                  </Label>
                  <div 
                    className="p-4 rounded-lg min-h-32"
                    style={{ backgroundColor: "var(--gts-portal-surface)" }}
                  >
                    <p className="text-sm font-mono break-all" style={{ color: "var(--gts-portal-text)" }}>
                      https://grandtoursochi.ru?utm_source=partner-spa&utm_medium=banner&utm_campaign=summer-2024&utm_content=hero-banner
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    style={{ 
                      borderColor: "var(--gts-portal-border)",
                      color: "var(--gts-portal-text)"
                    }}
                  >
                    Копировать
                  </Button>
                  <Button 
                    variant="outline"
                    style={{ 
                      borderColor: "var(--gts-portal-border)",
                      color: "var(--gts-portal-text)"
                    }}
                  >
                    QR код
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Media Kit */}
        <TabsContent value="mediakit" className="mt-6">
          <Card 
            className="p-6"
            style={{ 
              backgroundColor: "var(--gts-portal-card)",
              borderColor: "var(--gts-portal-border)"
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg" style={{ color: "var(--gts-portal-text)" }}>
                Медиа-кит партнера
              </h3>
              <Button 
                style={{ 
                  backgroundColor: "var(--gts-portal-accent)",
                  color: "white"
                }}
              >
                <Download size={16} className="mr-2" />
                Скачать все
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mediaKitFiles.map((file, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: "var(--gts-portal-surface)",
                    borderColor: "var(--gts-portal-border)"
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium truncate" style={{ color: "var(--gts-portal-text)" }}>
                      {file.name}
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      style={{ color: "var(--gts-portal-muted)" }}
                    >
                      <Download size={16} />
                    </Button>
                  </div>
                  <div className="text-xs space-y-1" style={{ color: "var(--gts-portal-muted)" }}>
                    <p>{file.type} • {file.size}</p>
                    <p>Обновлен: {file.updated}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Locations */}
        <TabsContent value="locations" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg" style={{ color: "var(--gts-portal-text)" }}>
                Локации партнера
              </h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  style={{ 
                    borderColor: "var(--gts-portal-border)",
                    color: "var(--gts-portal-text)"
                  }}
                >
                  <Upload size={16} className="mr-2" />
                  Импорт CSV
                </Button>
                <Button 
                  style={{ 
                    backgroundColor: "var(--gts-portal-accent)",
                    color: "white"
                  }}
                >
                  <Plus size={16} className="mr-2" />
                  Добавить локацию
                </Button>
              </div>
            </div>

            {/* Locations Table */}
            <Card 
              className="p-0 overflow-hidden"
              style={{ 
                backgroundColor: "var(--gts-portal-card)",
                borderColor: "var(--gts-portal-border)"
              }}
            >
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow style={{ borderColor: "var(--gts-portal-border)" }}>
                      <TableHead style={{ color: "var(--gts-portal-muted)" }}>Название</TableHead>
                      <TableHead style={{ color: "var(--gts-portal-muted)" }}>Адрес</TableHead>
                      <TableHead style={{ color: "var(--gts-portal-muted)" }}>Статус</TableHead>
                      <TableHead style={{ color: "var(--gts-portal-muted)" }}>QR код</TableHead>
                      <TableHead style={{ color: "var(--gts-portal-muted)" }}>Посещения</TableHead>
                      <TableHead style={{ color: "var(--gts-portal-muted)" }}>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {locations.map((location) => (
                      <TableRow key={location.id} style={{ borderColor: "var(--gts-portal-border)" }}>
                        <TableCell>
                          <div>
                            <p className="font-medium" style={{ color: "var(--gts-portal-text)" }}>
                              {location.name}
                            </p>
                            <p className="text-xs" style={{ color: "var(--gts-portal-muted)" }}>
                              ID: {location.id}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell style={{ color: "var(--gts-portal-text)" }}>
                          <div>
                            <p className="text-sm">{location.address}</p>
                            <p className="text-xs font-mono" style={{ color: "var(--gts-portal-muted)" }}>
                              {location.coordinates}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            style={{ 
                              borderColor: location.status === "active" ? "var(--gts-portal-success)" : "var(--gts-portal-warning)",
                              color: location.status === "active" ? "var(--gts-portal-success)" : "var(--gts-portal-warning)"
                            }}
                          >
                            {location.status === "active" ? "Активна" : "На модерации"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {location.qrCode !== "-" ? (
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-mono" style={{ color: "var(--gts-portal-text)" }}>
                                {location.qrCode}
                              </span>
                              <Button variant="ghost" size="sm">
                                <Download size={14} />
                              </Button>
                            </div>
                          ) : (
                            <span style={{ color: "var(--gts-portal-muted)" }}>-</span>
                          )}
                        </TableCell>
                        <TableCell style={{ color: "var(--gts-portal-text)" }}>
                          {location.visits.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye size={14} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit size={14} />
                            </Button>
                            <Button variant="ghost" size="sm" style={{ color: "var(--gts-portal-error)" }}>
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Map Placeholder */}
            <Card 
              className="p-6"
              style={{ 
                backgroundColor: "var(--gts-portal-card)",
                borderColor: "var(--gts-portal-border)"
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={24} style={{ color: "var(--gts-portal-accent)" }} />
                <h4 className="text-lg" style={{ color: "var(--gts-portal-text)" }}>
                  Карта локаций
                </h4>
              </div>
              <div 
                className="h-64 rounded-lg border-2 border-dashed flex items-center justify-center"
                style={{ borderColor: "var(--gts-portal-border)" }}
              >
                <p style={{ color: "var(--gts-portal-muted)" }}>
                  Интерактивная карта с метками локаций партнера
                </p>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}