import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Progress } from "../ui/progress";
import { 
  FileText,
  Upload,
  Download,
  Eye,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Car,
  Plus
} from "lucide-react";

export function GTSContractorDocuments() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("license");

  // Mock documents data
  const documentsData = [
    {
      id: "doc-001",
      category: "license" as const,
      title: "Лицензия на авиаперевозки",
      vehicle: "Robinson R44",
      issueDate: "2023-03-15",
      expiryDate: "2025-03-15",
      status: "active" as const,
      fileUrl: "#",
      authority: "Росавиация"
    },
    {
      id: "doc-002",
      category: "insurance" as const,
      title: "Страхование водного транспорта",
      vehicle: "Yamaha 252S",
      issueDate: "2024-01-10",
      expiryDate: "2024-12-31",
      status: "expiring_soon" as const,
      fileUrl: "#",
      authority: "РЕСО-Гарантия"
    },
    {
      id: "doc-003",
      category: "certificate" as const,
      title: "Сертификат безопасности ATV",
      vehicle: "Honda Talon 1000R",
      issueDate: "2023-08-20",
      expiryDate: "2025-08-20",
      status: "active" as const,
      fileUrl: "#",
      authority: "Автодор"
    },
    {
      id: "doc-004",
      category: "insurance" as const,
      title: "ОСАГО для Slingshot",
      vehicle: "Slingshot Polaris R",
      issueDate: "2023-12-01",
      expiryDate: "2024-12-01",
      status: "expired" as const,
      fileUrl: "#",
      authority: "СОГАЗ"
    },
    {
      id: "doc-005",
      category: "license" as const,
      title: "Разрешение на туристическую деятельность",
      vehicle: "Все транспортные средства",
      issueDate: "2023-06-01",
      expiryDate: "2026-06-01",
      status: "active" as const,
      fileUrl: "#",
      authority: "Ростуризм"
    }
  ];

  const categories = [
    { id: "license", name: "Лицензии", icon: Shield, color: "#2BB673" },
    { id: "insurance", name: "Страхование", icon: FileText, color: "#0EA5E9" },
    { id: "certificate", name: "Сертификаты", icon: CheckCircle, color: "#F5A623" },
    { id: "permit", name: "Разрешения", icon: FileText, color: "#91040C" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#2BB673';
      case 'expiring_soon': return '#F5A623';
      case 'expired': return '#E5484D';
      case 'pending': return '#0EA5E9';
      default: return '#A6A7AA';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Действующий';
      case 'expiring_soon': return 'Истекает скоро';
      case 'expired': return 'Просрочен';
      case 'pending': return 'На рассмотрении';
      default: return 'Неизвестно';
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDocumentsByCategory = (categoryId: string) => {
    return documentsData.filter(doc => doc.category === categoryId);
  };

  const activeDocuments = documentsData.filter(doc => doc.status === 'active').length;
  const expiringDocuments = documentsData.filter(doc => doc.status === 'expiring_soon').length;
  const expiredDocuments = documentsData.filter(doc => doc.status === 'expired').length;

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ 
              fontFamily: 'Nokia.Kokia, Inter, sans-serif',
              color: '#FFFFFF'
            }}
          >
            Документы
          </h1>
          <p 
            className="text-lg"
            style={{ 
              color: '#A6A7AA',
              fontFamily: 'Gilroy, Inter, sans-serif'
            }}
          >
            Лицензии, страхование и сертификаты
          </p>
        </div>

        <Button
          onClick={() => setUploadModalOpen(true)}
          style={{ 
            backgroundColor: '#91040C',
            color: '#FFFFFF',
            fontFamily: 'Gilroy, Inter, sans-serif'
          }}
        >
          <Upload className="w-4 h-4 mr-2" />
          Загрузить документ
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card 
          className="p-6 border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8" style={{ color: '#2BB673' }} />
            <span 
              className="text-2xl font-bold"
              style={{ 
                color: '#2BB673',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              {activeDocuments}
            </span>
          </div>
          <p 
            className="text-sm"
            style={{ 
              color: '#A6A7AA',
              fontFamily: 'Gilroy, Inter, sans-serif'
            }}
          >
            Действующих документов
          </p>
        </Card>

        <Card 
          className="p-6 border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-8 h-8" style={{ color: '#F5A623' }} />
            <span 
              className="text-2xl font-bold"
              style={{ 
                color: '#F5A623',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              {expiringDocuments}
            </span>
          </div>
          <p 
            className="text-sm"
            style={{ 
              color: '#A6A7AA',
              fontFamily: 'Gilroy, Inter, sans-serif'
            }}
          >
            Истекают скоро
          </p>
        </Card>

        <Card 
          className="p-6 border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-8 h-8" style={{ color: '#E5484D' }} />
            <span 
              className="text-2xl font-bold"
              style={{ 
                color: '#E5484D',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              {expiredDocuments}
            </span>
          </div>
          <p 
            className="text-sm"
            style={{ 
              color: '#A6A7AA',
              fontFamily: 'Gilroy, Inter, sans-serif'
            }}
          >
            Просроченных
          </p>
        </Card>

        <Card 
          className="p-6 border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8" style={{ color: '#0EA5E9' }} />
            <span 
              className="text-2xl font-bold"
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              {documentsData.length}
            </span>
          </div>
          <p 
            className="text-sm"
            style={{ 
              color: '#A6A7AA',
              fontFamily: 'Gilroy, Inter, sans-serif'
            }}
          >
            Всего документов
          </p>
        </Card>
      </div>

      {/* Documents by Category */}
      <div className="space-y-6">
        {categories.map((category) => {
          const categoryDocs = getDocumentsByCategory(category.id);
          const Icon = category.icon;
          
          if (categoryDocs.length === 0) return null;

          return (
            <Card 
              key={category.id}
              className="border-0 overflow-hidden"
              style={{ backgroundColor: '#17181A' }}
            >
              <div className="p-6 border-b" style={{ borderColor: '#232428' }}>
                <div className="flex items-center gap-3">
                  <Icon className="w-6 h-6" style={{ color: category.color }} />
                  <h3 
                    className="text-lg font-medium"
                    style={{ 
                      color: '#FFFFFF',
                      fontFamily: 'Nokia.Kokia, Inter, sans-serif'
                    }}
                  >
                    {category.name}
                  </h3>
                  <Badge 
                    style={{ 
                      backgroundColor: category.color,
                      color: '#FFFFFF'
                    }}
                  >
                    {categoryDocs.length}
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {categoryDocs.map((doc) => {
                    const daysUntilExpiry = getDaysUntilExpiry(doc.expiryDate);
                    
                    return (
                      <div 
                        key={doc.id}
                        className="flex items-center justify-between p-4 rounded-lg"
                        style={{ backgroundColor: '#121214' }}
                      >
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: category.color }}
                          >
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          
                          <div>
                            <h4 
                              className="font-medium"
                              style={{ 
                                color: '#FFFFFF',
                                fontFamily: 'Gilroy, Inter, sans-serif'
                              }}
                            >
                              {doc.title}
                            </h4>
                            <div className="flex items-center gap-4 text-sm">
                              <span 
                                style={{ 
                                  color: '#A6A7AA',
                                  fontFamily: 'Gilroy, Inter, sans-serif'
                                }}
                              >
                                {doc.vehicle}
                              </span>
                              <span 
                                style={{ 
                                  color: '#A6A7AA',
                                  fontFamily: 'Gilroy, Inter, sans-serif'
                                }}
                              >
                                {doc.authority}
                              </span>
                              <span 
                                className="flex items-center gap-1"
                                style={{ 
                                  color: '#A6A7AA',
                                  fontFamily: 'Gilroy, Inter, sans-serif'
                                }}
                              >
                                <Calendar className="w-3 h-3" />
                                до {new Date(doc.expiryDate).toLocaleDateString('ru-RU')}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {doc.status === 'expiring_soon' && daysUntilExpiry <= 30 && (
                            <div className="text-right">
                              <p 
                                className="text-sm font-medium"
                                style={{ 
                                  color: '#F5A623',
                                  fontFamily: 'Gilroy, Inter, sans-serif'
                                }}
                              >
                                {daysUntilExpiry} дней
                              </p>
                              <p 
                                className="text-xs"
                                style={{ 
                                  color: '#A6A7AA',
                                  fontFamily: 'Gilroy, Inter, sans-serif'
                                }}
                              >
                                до истечения
                              </p>
                            </div>
                          )}
                          
                          <Badge 
                            style={{ 
                              backgroundColor: getStatusColor(doc.status),
                              color: '#FFFFFF'
                            }}
                          >
                            {getStatusText(doc.status)}
                          </Badge>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-0"
                              style={{ 
                                backgroundColor: 'transparent',
                                color: '#FFFFFF'
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-0"
                              style={{ 
                                backgroundColor: 'transparent',
                                color: '#FFFFFF'
                              }}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Upload Modal */}
      <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
        <DialogContent 
          className="max-w-md border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          <DialogHeader>
            <DialogTitle 
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              Загрузить документ
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                Категория
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger 
                  className="border-0"
                  style={{ 
                    backgroundColor: '#121214',
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ backgroundColor: '#17181A', borderColor: '#232428' }}>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                Название документа
              </label>
              <Input
                placeholder="Введите название документа..."
                className="border-0"
                style={{ 
                  backgroundColor: '#121214',
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              />
            </div>

            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                Техника
              </label>
              <Select>
                <SelectTrigger 
                  className="border-0"
                  style={{ 
                    backgroundColor: '#121214',
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  <SelectValue placeholder="Выберите технику" />
                </SelectTrigger>
                <SelectContent style={{ backgroundColor: '#17181A', borderColor: '#232428' }}>
                  <SelectItem value="all">Все транспортные средства</SelectItem>
                  <SelectItem value="r44">Robinson R44</SelectItem>
                  <SelectItem value="yamaha">Yamaha 252S</SelectItem>
                  <SelectItem value="honda">Honda Talon 1000R</SelectItem>
                  <SelectItem value="slingshot">Slingshot Polaris R</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                Дата истечения
              </label>
              <Input
                type="date"
                className="border-0"
                style={{ 
                  backgroundColor: '#121214',
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              />
            </div>

            <div 
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-800/20"
              style={{ borderColor: '#232428' }}
            >
              <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: '#A6A7AA' }} />
              <p 
                className="font-medium"
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                Загрузить файл
              </p>
              <p 
                className="text-sm"
                style={{ 
                  color: '#A6A7AA',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                PDF, JPG, PNG до 10 МБ
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setUploadModalOpen(false)}
                variant="outline"
                className="flex-1 border-0"
                style={{ 
                  backgroundColor: '#121214',
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                Отмена
              </Button>
              <Button
                onClick={() => setUploadModalOpen(false)}
                className="flex-1"
                style={{ 
                  backgroundColor: '#91040C',
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                <Badge 
                  className="mr-2 text-xs"
                  style={{ 
                    backgroundColor: '#F5A623',
                    color: '#000000'
                  }}
                >
                  Модерация
                </Badge>
                Загрузить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}