import React, { useState } from 'react';
import { User, Building, CreditCard, Bell, Globe, Shield, Save, Upload, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  avatar?: string;
}

interface CompanyData {
  name: string;
  legalName: string;
  inn: string;
  kpp: string;
  ogrn: string;
  address: string;
  legalAddress: string;
  phone: string;
  email: string;
  website: string;
}

interface BankingData {
  bankName: string;
  bik: string;
  accountNumber: string;
  correspondentAccount: string;
}

interface NotificationSettings {
  emailBookings: boolean;
  emailPromotions: boolean;
  emailNews: boolean;
  whatsappBookings: boolean;
  whatsappPromotions: boolean;
  whatsappNews: boolean;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface GTSSharedProfileProps {
  profileData: ProfileData;
  companyData: CompanyData;
  bankingData: BankingData;
  notificationSettings: NotificationSettings;
  securitySettings: SecuritySettings;
  onSaveProfile: (data: ProfileData) => void;
  onSaveCompany: (data: CompanyData) => void;
  onSaveBanking: (data: BankingData) => void;
  onSaveNotifications: (settings: NotificationSettings) => void;
  onSaveSecurity: (settings: SecuritySettings) => void;
  onAvatarUpload: (file: File) => void;
}

export function GTSSharedProfile({
  profileData,
  companyData,
  bankingData,
  notificationSettings,
  securitySettings,
  onSaveProfile,
  onSaveCompany,
  onSaveBanking,
  onSaveNotifications,
  onSaveSecurity,
  onAvatarUpload
}: GTSSharedProfileProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localProfileData, setLocalProfileData] = useState<ProfileData>(profileData);
  const [localCompanyData, setLocalCompanyData] = useState<CompanyData>(companyData);
  const [localBankingData, setLocalBankingData] = useState<BankingData>(bankingData);
  const [localNotificationSettings, setLocalNotificationSettings] = useState<NotificationSettings>(notificationSettings);
  const [localSecuritySettings, setLocalSecuritySettings] = useState<SecuritySettings>(securitySettings);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onAvatarUpload(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src={localProfileData.avatar} alt={`${localProfileData.firstName} ${localProfileData.lastName}`} />
            <AvatarFallback className="bg-[var(--gts-portal-card)] text-[var(--gts-portal-text)] text-xl">
              {localProfileData.firstName.charAt(0)}{localProfileData.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <Button
            size="sm"
            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90"
            onClick={() => document.getElementById('avatar-upload')?.click()}
          >
            <Upload className="h-4 w-4" />
          </Button>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarUpload}
          />
        </div>
        <div>
          <h1 className="text-2xl font-heading text-[var(--gts-portal-text)]">
            Настройки профиля
          </h1>
          <p className="text-[var(--gts-portal-muted)]">
            Управление личными данными и настройками
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-6 bg-[var(--gts-portal-card)]">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Профиль</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">Компания</span>
          </TabsTrigger>
          <TabsTrigger value="banking" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Реквизиты</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Уведомления</span>
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Язык</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Безопасность</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
            <CardHeader>
              <CardTitle className="text-[var(--gts-portal-text)]">Личные данные</CardTitle>
              <CardDescription className="text-[var(--gts-portal-muted)]">
                Обновите свою личную информацию
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[var(--gts-portal-text)]">Имя</Label>
                  <Input
                    id="firstName"
                    value={localProfileData.firstName}
                    onChange={(e) => setLocalProfileData({...localProfileData, firstName: e.target.value})}
                    className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[var(--gts-portal-text)]">Фамилия</Label>
                  <Input
                    id="lastName"
                    value={localProfileData.lastName}
                    onChange={(e) => setLocalProfileData({...localProfileData, lastName: e.target.value})}
                    className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[var(--gts-portal-text)]">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={localProfileData.email}
                    onChange={(e) => setLocalProfileData({...localProfileData, email: e.target.value})}
                    className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[var(--gts-portal-text)]">Телефон</Label>
                  <Input
                    id="phone"
                    value={localProfileData.phone}
                    onChange={(e) => setLocalProfileData({...localProfileData, phone: e.target.value})}
                    className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="position" className="text-[var(--gts-portal-text)]">Должность</Label>
                  <Input
                    id="position"
                    value={localProfileData.position}
                    onChange={(e) => setLocalProfileData({...localProfileData, position: e.target.value})}
                    className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                  />
                </div>
              </div>
              <Button 
                onClick={() => onSaveProfile(localProfileData)}
                className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90"
              >
                <Save className="h-4 w-4 mr-2" />
                Сохранить
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company Tab */}
        <TabsContent value="company" className="space-y-6">
          <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
            <CardHeader>
              <CardTitle className="text-[var(--gts-portal-text)]">Данные компании</CardTitle>
              <CardDescription className="text-[var(--gts-portal-muted)]">
                Информация о вашей организации
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="companyName" className="text-[var(--gts-portal-text)]">Название компании</Label>
                  <Input
                    id="companyName"
                    value={localCompanyData.name}
                    onChange={(e) => setLocalCompanyData({...localCompanyData, name: e.target.value})}
                    className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="legalName" className="text-[var(--gts-portal-text)]">Юридическое название</Label>
                  <Input
                    id="legalName"
                    value={localCompanyData.legalName}
                    onChange={(e) => setLocalCompanyData({...localCompanyData, legalName: e.target.value})}
                    className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inn" className="text-[var(--gts-portal-text)]">ИНН</Label>
                  <Input
                    id="inn"
                    value={localCompanyData.inn}
                    onChange={(e) => setLocalCompanyData({...localCompanyData, inn: e.target.value})}
                    className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kpp" className="text-[var(--gts-portal-text)]">КПП</Label>
                  <Input
                    id="kpp"
                    value={localCompanyData.kpp}
                    onChange={(e) => setLocalCompanyData({...localCompanyData, kpp: e.target.value})}
                    className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="ogrn" className="text-[var(--gts-portal-text)]">ОГРН</Label>
                  <Input
                    id="ogrn"
                    value={localCompanyData.ogrn}
                    onChange={(e) => setLocalCompanyData({...localCompanyData, ogrn: e.target.value})}
                    className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address" className="text-[var(--gts-portal-text)]">Фактический адрес</Label>
                  <Textarea
                    id="address"
                    value={localCompanyData.address}
                    onChange={(e) => setLocalCompanyData({...localCompanyData, address: e.target.value})}
                    className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="legalAddress" className="text-[var(--gts-portal-text)]">Юридический адрес</Label>
                  <Textarea
                    id="legalAddress"
                    value={localCompanyData.legalAddress}
                    onChange={(e) => setLocalCompanyData({...localCompanyData, legalAddress: e.target.value})}
                    className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                  />
                </div>
              </div>
              <Button 
                onClick={() => onSaveCompany(localCompanyData)}
                className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90"
              >
                <Save className="h-4 w-4 mr-2" />
                Сохранить
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Banking Tab */}
        <TabsContent value="banking" className="space-y-6">
          <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
            <CardHeader>
              <CardTitle className="text-[var(--gts-portal-text)]">Банковские реквизиты</CardTitle>
              <CardDescription className="text-[var(--gts-portal-muted)]">
                Данные для финансовых операций
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bankName" className="text-[var(--gts-portal-text)]">Название банка</Label>
                  <Input
                    id="bankName"
                    value={localBankingData.bankName}
                    onChange={(e) => setLocalBankingData({...localBankingData, bankName: e.target.value})}
                    className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bik" className="text-[var(--gts-portal-text)]">БИК</Label>
                  <Input
                    id="bik"
                    value={localBankingData.bik}
                    onChange={(e) => setLocalBankingData({...localBankingData, bik: e.target.value})}
                    className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber" className="text-[var(--gts-portal-text)]">Расчетный счет</Label>
                  <Input
                    id="accountNumber"
                    value={localBankingData.accountNumber}
                    onChange={(e) => setLocalBankingData({...localBankingData, accountNumber: e.target.value})}
                    className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="correspondentAccount" className="text-[var(--gts-portal-text)]">Корреспондентский счет</Label>
                  <Input
                    id="correspondentAccount"
                    value={localBankingData.correspondentAccount}
                    onChange={(e) => setLocalBankingData({...localBankingData, correspondentAccount: e.target.value})}
                    className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                  />
                </div>
              </div>
              <Button 
                onClick={() => onSaveBanking(localBankingData)}
                className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90"
              >
                <Save className="h-4 w-4 mr-2" />
                Сохранить
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
            <CardHeader>
              <CardTitle className="text-[var(--gts-portal-text)]">Настройки уведомлений</CardTitle>
              <CardDescription className="text-[var(--gts-portal-muted)]">
                Выберите, как вы хотите получать уведомления
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-[var(--gts-portal-text)] font-medium">Email уведомления</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailBookings" className="text-[var(--gts-portal-text)]">Бронирования</Label>
                    <Switch
                      id="emailBookings"
                      checked={localNotificationSettings.emailBookings}
                      onCheckedChange={(checked) => 
                        setLocalNotificationSettings({...localNotificationSettings, emailBookings: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailPromotions" className="text-[var(--gts-portal-text)]">Акции и предложения</Label>
                    <Switch
                      id="emailPromotions"
                      checked={localNotificationSettings.emailPromotions}
                      onCheckedChange={(checked) => 
                        setLocalNotificationSettings({...localNotificationSettings, emailPromotions: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNews" className="text-[var(--gts-portal-text)]">Новости</Label>
                    <Switch
                      id="emailNews"
                      checked={localNotificationSettings.emailNews}
                      onCheckedChange={(checked) => 
                        setLocalNotificationSettings({...localNotificationSettings, emailNews: checked})
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-[var(--gts-portal-border)]" />

              <div className="space-y-4">
                <h4 className="text-[var(--gts-portal-text)] font-medium">WhatsApp уведомления</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="whatsappBookings" className="text-[var(--gts-portal-text)]">Бронирования</Label>
                    <Switch
                      id="whatsappBookings"
                      checked={localNotificationSettings.whatsappBookings}
                      onCheckedChange={(checked) => 
                        setLocalNotificationSettings({...localNotificationSettings, whatsappBookings: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="whatsappPromotions" className="text-[var(--gts-portal-text)]">Акции и предложения</Label>
                    <Switch
                      id="whatsappPromotions"
                      checked={localNotificationSettings.whatsappPromotions}
                      onCheckedChange={(checked) => 
                        setLocalNotificationSettings({...localNotificationSettings, whatsappPromotions: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="whatsappNews" className="text-[var(--gts-portal-text)]">Новости</Label>
                    <Switch
                      id="whatsappNews"
                      checked={localNotificationSettings.whatsappNews}
                      onCheckedChange={(checked) => 
                        setLocalNotificationSettings({...localNotificationSettings, whatsappNews: checked})
                      }
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => onSaveNotifications(localNotificationSettings)}
                className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90"
              >
                <Save className="h-4 w-4 mr-2" />
                Сохранить настройки
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Language & Timezone Tab */}
        <TabsContent value="language" className="space-y-6">
          <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
            <CardHeader>
              <CardTitle className="text-[var(--gts-portal-text)]">Язык и часовой пояс</CardTitle>
              <CardDescription className="text-[var(--gts-portal-muted)]">
                Настройки локализации
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[var(--gts-portal-text)]">Язык интерфейса</Label>
                <Select defaultValue="ru">
                  <SelectTrigger className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
                    <SelectItem value="ru">Русский</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[var(--gts-portal-text)]">Часовой пояс</Label>
                <Select defaultValue="moscow">
                  <SelectTrigger className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
                    <SelectItem value="moscow">Москва (UTC+3)</SelectItem>
                    <SelectItem value="sochi">Сочи (UTC+3)</SelectItem>
                    <SelectItem value="spb">Санкт-Петербург (UTC+3)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90">
                <Save className="h-4 w-4 mr-2" />
                Сохранить
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
            <CardHeader>
              <CardTitle className="text-[var(--gts-portal-text)]">Двухфакторная аутентификация</CardTitle>
              <CardDescription className="text-[var(--gts-portal-muted)]">
                Дополнительная защита вашего аккаунта
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-[var(--gts-portal-text)]">2FA включена</Label>
                  <p className="text-sm text-[var(--gts-portal-muted)]">
                    Требует код из приложения при входе
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {localSecuritySettings.twoFactorEnabled && (
                    <Badge variant="default" className="bg-[var(--gts-portal-success)] text-white">
                      Активно
                    </Badge>
                  )}
                  <Switch
                    checked={localSecuritySettings.twoFactorEnabled}
                    onCheckedChange={(checked) => 
                      setLocalSecuritySettings({...localSecuritySettings, twoFactorEnabled: checked})
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
            <CardHeader>
              <CardTitle className="text-[var(--gts-portal-text)]">Смена пароля</CardTitle>
              <CardDescription className="text-[var(--gts-portal-muted)]">
                Обновите пароль для защиты аккаунта
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-[var(--gts-portal-text)]">Текущий пароль</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={localSecuritySettings.currentPassword}
                    onChange={(e) => setLocalSecuritySettings({...localSecuritySettings, currentPassword: e.target.value})}
                    className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)] pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-[var(--gts-portal-muted)] hover:text-[var(--gts-portal-text)]"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-[var(--gts-portal-text)]">Новый пароль</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={localSecuritySettings.newPassword}
                    onChange={(e) => setLocalSecuritySettings({...localSecuritySettings, newPassword: e.target.value})}
                    className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)] pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-[var(--gts-portal-muted)] hover:text-[var(--gts-portal-text)]"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[var(--gts-portal-text)]">Подтвердите пароль</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={localSecuritySettings.confirmPassword}
                    onChange={(e) => setLocalSecuritySettings({...localSecuritySettings, confirmPassword: e.target.value})}
                    className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)] pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-[var(--gts-portal-muted)] hover:text-[var(--gts-portal-text)]"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button 
                onClick={() => onSaveSecurity(localSecuritySettings)}
                className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90"
              >
                <Save className="h-4 w-4 mr-2" />
                Обновить пароль
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}