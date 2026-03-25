import React, { useState } from 'react';
import { ArrowLeft, Building, User, FileText, Mail, Upload, Check, AlertCircle, Loader2, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Alert, AlertDescription } from '../ui/alert';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';

type PartnerType = 'partner-agent' | 'contractor' | 'brand-partner' | '';

interface FormData {
  // Basic Info
  partnerType: PartnerType;
  partnerName: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: 'active' | 'suspended';
  
  // Agent specific
  commissionRate: string;
  region: string;
  
  // Contractor specific
  serviceType: string;
  payoutScheme: string;
  payoutValue: string;
  slaDocument: File | null;
  
  // Brand Partner specific
  collaborationType: string;
  loyaltyEnabled: boolean;
  discountScheme: string;
  apiIntegration: boolean;
  
  // Legal
  contractDocument: File | null;
  termsDocument: File | null;
  termsAgreed: boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

interface GTSPartnerCreationProps {
  onBack: () => void;
  onSuccess: (partnerId: string) => void;
}

export function GTSPartnerCreation({ onBack, onSuccess }: GTSPartnerCreationProps) {
  const [formData, setFormData] = useState<FormData>({
    partnerType: '',
    partnerName: '',
    contactPerson: '',
    email: '',
    phone: '',
    status: 'active',
    commissionRate: '',
    region: '',
    serviceType: '',
    payoutScheme: 'percentage',
    payoutValue: '',
    slaDocument: null,
    collaborationType: '',
    loyaltyEnabled: false,
    discountScheme: '',
    apiIntegration: false,
    contractDocument: null,
    termsDocument: null,
    termsAgreed: false
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(['basic-info']);
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  const partnerTypeLabels = {
    'partner-agent': 'Partner Agent',
    'contractor': 'Contractor',
    'brand-partner': 'Brand Partner'
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFileUpload = (field: 'slaDocument' | 'contractDocument' | 'termsDocument', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleInputChange(field, file);
    }
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Basic validation
    if (!formData.partnerType) errors.partnerType = 'Выберите тип партнёра';
    if (!formData.partnerName.trim()) errors.partnerName = 'Введите название партнёра';
    if (!formData.contactPerson.trim()) errors.contactPerson = 'Введите контактное лицо';
    if (!formData.email.trim()) errors.email = 'Введите email';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Введите корректный email';

    // Role-specific validation
    if (formData.partnerType === 'partner-agent') {
      if (!formData.commissionRate) errors.commissionRate = 'Введите комиссию';
      if (!formData.region) errors.region = 'Выберите регион';
    }

    if (formData.partnerType === 'contractor') {
      if (!formData.serviceType) errors.serviceType = 'Выберите тип услуг';
      if (!formData.payoutValue) errors.payoutValue = 'Введите размер выплат';
    }

    if (formData.partnerType === 'brand-partner') {
      if (!formData.collaborationType) errors.collaborationType = 'Выберите тип сотрудничества';
      if (!formData.discountScheme.trim()) errors.discountScheme = 'Введите схему скидок';
    }

    // Legal validation
    if (!formData.termsAgreed) errors.termsAgreed = 'Необходимо согласие с условиями';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    if (!isDraft && !validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (isDraft) {
        // Save as draft logic
        console.log('Saving as draft:', formData);
        setShowSuccess(true);
        setTimeout(() => {
          onSuccess('draft-12345');
        }, 1500);
      } else {
        // Send invitation logic
        console.log('Creating partner and sending invitation:', formData);
        setShowSuccess(true);
        setTimeout(() => {
          onSuccess('partner-12345');
        }, 1500);
      }
    } catch (error) {
      console.error('Error creating partner:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSummaryData = () => {
    const summary = {
      type: formData.partnerType ? partnerTypeLabels[formData.partnerType] : 'Не выбран',
      name: formData.partnerName || 'Не указано',
      email: formData.email || 'Не указано',
      conditions: [] as string[]
    };

    if (formData.partnerType === 'partner-agent' && formData.commissionRate) {
      summary.conditions.push(`Комиссия: ${formData.commissionRate}%`);
    }
    
    if (formData.partnerType === 'contractor' && formData.payoutValue) {
      summary.conditions.push(`Выплаты: ${formData.payoutValue}${formData.payoutScheme === 'percentage' ? '%' : ' руб'}`);
    }
    
    if (formData.partnerType === 'brand-partner' && formData.discountScheme) {
      summary.conditions.push(`Скидки: ${formData.discountScheme}`);
    }

    return summary;
  };

  const getEmailPreviewContent = () => {
    const partnerTypeText = formData.partnerType ? partnerTypeLabels[formData.partnerType] : 'Партнёр';
    
    return `
Здравствуйте, ${formData.contactPerson || '[Имя контактного лица]'}!

Приглашаем вас стать ${partnerTypeText} в системе Grand Tour Sochi.

Для завершения регистрации перейдите по ссылке:
https://portal.gts.com/invite/[token]

Ваши данные для входа:
Email: ${formData.email || '[email]'}
Временный пароль будет отправлен отдельно.

С уважением,
Команда GTS
    `.trim();
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[var(--gts-portal-bg)] p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[var(--gts-portal-success)] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-heading text-[var(--gts-portal-text)] mb-4">
              Приглашение отправлено
            </h1>
            <p className="text-[var(--gts-portal-muted)] mb-8">
              Приглашение успешно отправлено на {formData.email}
            </p>
            <Button 
              onClick={() => onSuccess('partner-12345')}
              className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90"
            >
              Продолжить
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--gts-portal-bg)]">
      {/* Header */}
      <div className="border-b border-[var(--gts-portal-border)] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-card)]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink className="text-[var(--gts-portal-muted)]">Admin</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-[var(--gts-portal-muted)]" />
                <BreadcrumbItem>
                  <BreadcrumbLink className="text-[var(--gts-portal-muted)]">Partners</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-[var(--gts-portal-muted)]" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[var(--gts-portal-text)]">Create Partner</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div>
            <h1 className="text-2xl font-heading text-[var(--gts-portal-text)] mb-2">
              Create Partner Account
            </h1>
            <p className="text-[var(--gts-portal-muted)]">
              Invite new partner to GTS system. Select type and conditions.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Accordion 
              type="multiple" 
              value={currentStep}
              onValueChange={setCurrentStep}
              className="space-y-6"
            >
              {/* Basic Info */}
              <AccordionItem value="basic-info" className="border border-[var(--gts-portal-border)] rounded-xl">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[var(--gts-portal-accent)] rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-heading text-[var(--gts-portal-text)]">Basic Information</div>
                      <div className="text-sm text-[var(--gts-portal-muted)]">Partner type and contact details</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[var(--gts-portal-text)]">Partner Type *</Label>
                        <Select value={formData.partnerType} onValueChange={(value: PartnerType) => handleInputChange('partnerType', value)}>
                          <SelectTrigger className={`bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)] ${validationErrors.partnerType ? 'border-[var(--gts-portal-error)]' : ''}`}>
                            <SelectValue placeholder="Select partner type" />
                          </SelectTrigger>
                          <SelectContent className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
                            <SelectItem value="partner-agent">Partner Agent</SelectItem>
                            <SelectItem value="contractor">Contractor</SelectItem>
                            <SelectItem value="brand-partner">Brand Partner</SelectItem>
                          </SelectContent>
                        </Select>
                        {validationErrors.partnerType && (
                          <p className="text-sm text-[var(--gts-portal-error)]">{validationErrors.partnerType}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[var(--gts-portal-text)]">Status</Label>
                        <Select value={formData.status} onValueChange={(value: 'active' | 'suspended') => handleInputChange('status', value)}>
                          <SelectTrigger className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[var(--gts-portal-text)]">Partner Name *</Label>
                      <Input
                        placeholder="Company or individual name"
                        value={formData.partnerName}
                        onChange={(e) => handleInputChange('partnerName', e.target.value)}
                        className={`bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)] ${validationErrors.partnerName ? 'border-[var(--gts-portal-error)]' : ''}`}
                      />
                      {validationErrors.partnerName && (
                        <p className="text-sm text-[var(--gts-portal-error)]">{validationErrors.partnerName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[var(--gts-portal-text)]">Contact Person *</Label>
                        <Input
                          placeholder="Full name"
                          value={formData.contactPerson}
                          onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                          className={`bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)] ${validationErrors.contactPerson ? 'border-[var(--gts-portal-error)]' : ''}`}
                        />
                        {validationErrors.contactPerson && (
                          <p className="text-sm text-[var(--gts-portal-error)]">{validationErrors.contactPerson}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[var(--gts-portal-text)]">Phone</Label>
                        <Input
                          placeholder="+7 (999) 123-45-67"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[var(--gts-portal-text)]">Email *</Label>
                      <Input
                        type="email"
                        placeholder="partner@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)] ${validationErrors.email ? 'border-[var(--gts-portal-error)]' : ''}`}
                      />
                      {validationErrors.email && (
                        <p className="text-sm text-[var(--gts-portal-error)]">{validationErrors.email}</p>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Role-specific Settings */}
              {formData.partnerType && (
                <AccordionItem value="role-settings" className="border border-[var(--gts-portal-border)] rounded-xl">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Building className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-heading text-[var(--gts-portal-text)]">Role-specific Settings</div>
                        <div className="text-sm text-[var(--gts-portal-muted)]">Configure {partnerTypeLabels[formData.partnerType]} specific options</div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    {formData.partnerType === 'partner-agent' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[var(--gts-portal-text)]">Commission Rate (%) *</Label>
                            <Input
                              type="number"
                              placeholder="15"
                              min="0"
                              max="100"
                              step="0.1"
                              value={formData.commissionRate}
                              onChange={(e) => handleInputChange('commissionRate', e.target.value)}
                              className={`bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)] ${validationErrors.commissionRate ? 'border-[var(--gts-portal-error)]' : ''}`}
                            />
                            {validationErrors.commissionRate && (
                              <p className="text-sm text-[var(--gts-portal-error)]">{validationErrors.commissionRate}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[var(--gts-portal-text)]">Region / Channel *</Label>
                            <Select value={formData.region} onValueChange={(value) => handleInputChange('region', value)}>
                              <SelectTrigger className={`bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)] ${validationErrors.region ? 'border-[var(--gts-portal-error)]' : ''}`}>
                                <SelectValue placeholder="Select region" />
                              </SelectTrigger>
                              <SelectContent className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
                                <SelectItem value="sochi">Sochi Center</SelectItem>
                                <SelectItem value="adler">Adler</SelectItem>
                                <SelectItem value="krasnaya-polyana">Krasnaya Polyana</SelectItem>
                                <SelectItem value="online">Online Channel</SelectItem>
                                <SelectItem value="corporate">Corporate</SelectItem>
                              </SelectContent>
                            </Select>
                            {validationErrors.region && (
                              <p className="text-sm text-[var(--gts-portal-error)]">{validationErrors.region}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {formData.partnerType === 'contractor' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-[var(--gts-portal-text)]">Service Type *</Label>
                          <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                            <SelectTrigger className={`bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)] ${validationErrors.serviceType ? 'border-[var(--gts-portal-error)]' : ''}`}>
                              <SelectValue placeholder="Select service type" />
                            </SelectTrigger>
                            <SelectContent className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
                              <SelectItem value="boat">Boat Services</SelectItem>
                              <SelectItem value="heli">Helicopter Services</SelectItem>
                              <SelectItem value="buggy">Buggy Services</SelectItem>
                              <SelectItem value="slingshot">Slingshot Services</SelectItem>
                              <SelectItem value="other">Other Services</SelectItem>
                            </SelectContent>
                          </Select>
                          {validationErrors.serviceType && (
                            <p className="text-sm text-[var(--gts-portal-error)]">{validationErrors.serviceType}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[var(--gts-portal-text)]">Payout Scheme</Label>
                            <Select value={formData.payoutScheme} onValueChange={(value) => handleInputChange('payoutScheme', value)}>
                              <SelectTrigger className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
                                <SelectItem value="percentage">Percentage (%)</SelectItem>
                                <SelectItem value="fixed">Fixed Amount (₽)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[var(--gts-portal-text)]">Payout Value *</Label>
                            <Input
                              type="number"
                              placeholder={formData.payoutScheme === 'percentage' ? '70' : '50000'}
                              value={formData.payoutValue}
                              onChange={(e) => handleInputChange('payoutValue', e.target.value)}
                              className={`bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)] ${validationErrors.payoutValue ? 'border-[var(--gts-portal-error)]' : ''}`}
                            />
                            {validationErrors.payoutValue && (
                              <p className="text-sm text-[var(--gts-portal-error)]">{validationErrors.payoutValue}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[var(--gts-portal-text)]">SLA Agreement</Label>
                            <div className="relative">
                              <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => handleFileUpload('slaDocument', e)}
                                className="hidden"
                                id="sla-upload"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                className="w-full bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-card)]"
                                onClick={() => document.getElementById('sla-upload')?.click()}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                {formData.slaDocument ? formData.slaDocument.name : 'Upload PDF'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {formData.partnerType === 'brand-partner' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[var(--gts-portal-text)]">Collaboration Type *</Label>
                            <Select value={formData.collaborationType} onValueChange={(value) => handleInputChange('collaborationType', value)}>
                              <SelectTrigger className={`bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)] ${validationErrors.collaborationType ? 'border-[var(--gts-portal-error)]' : ''}`}>
                                <SelectValue placeholder="Select collaboration type" />
                              </SelectTrigger>
                              <SelectContent className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
                                <SelectItem value="coffee-shop">Coffee Shop</SelectItem>
                                <SelectItem value="hotel">Hotel</SelectItem>
                                <SelectItem value="restaurant">Restaurant</SelectItem>
                                <SelectItem value="retail">Retail Store</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            {validationErrors.collaborationType && (
                              <p className="text-sm text-[var(--gts-portal-error)]">{validationErrors.collaborationType}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[var(--gts-portal-text)]">Discount Scheme *</Label>
                            <Input
                              placeholder="10% for GTS members"
                              value={formData.discountScheme}
                              onChange={(e) => handleInputChange('discountScheme', e.target.value)}
                              className={`bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)] ${validationErrors.discountScheme ? 'border-[var(--gts-portal-error)]' : ''}`}
                            />
                            {validationErrors.discountScheme && (
                              <p className="text-sm text-[var(--gts-portal-error)]">{validationErrors.discountScheme}</p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center justify-between p-4 bg-[var(--gts-portal-surface)] rounded-lg border border-[var(--gts-portal-border)]">
                            <div>
                              <Label className="text-[var(--gts-portal-text)]">Loyalty Integration</Label>
                              <p className="text-sm text-[var(--gts-portal-muted)]">Enable bonus points system</p>
                            </div>
                            <Switch
                              checked={formData.loyaltyEnabled}
                              onCheckedChange={(checked) => handleInputChange('loyaltyEnabled', checked)}
                            />
                          </div>
                          <div className="flex items-center justify-between p-4 bg-[var(--gts-portal-surface)] rounded-lg border border-[var(--gts-portal-border)]">
                            <div>
                              <Label className="text-[var(--gts-portal-text)]">API Integration</Label>
                              <p className="text-sm text-[var(--gts-portal-muted)]">Enable API access</p>
                            </div>
                            <Switch
                              checked={formData.apiIntegration}
                              onCheckedChange={(checked) => handleInputChange('apiIntegration', checked)}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Legal & Documents */}
              <AccordionItem value="legal-docs" className="border border-[var(--gts-portal-border)] rounded-xl">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[var(--gts-portal-warning)] rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-heading text-[var(--gts-portal-text)]">Legal & Documents</div>
                      <div className="text-sm text-[var(--gts-portal-muted)]">Upload contracts and agreements</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[var(--gts-portal-text)]">Contract Document</Label>
                        <div className="relative">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleFileUpload('contractDocument', e)}
                            className="hidden"
                            id="contract-upload"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-card)]"
                            onClick={() => document.getElementById('contract-upload')?.click()}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            {formData.contractDocument ? formData.contractDocument.name : 'Upload Contract'}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[var(--gts-portal-text)]">Terms Document</Label>
                        <div className="relative">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleFileUpload('termsDocument', e)}
                            className="hidden"
                            id="terms-upload"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-card)]"
                            onClick={() => document.getElementById('terms-upload')?.click()}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            {formData.termsDocument ? formData.termsDocument.name : 'Upload Terms'}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms-agreed"
                        checked={formData.termsAgreed}
                        onCheckedChange={(checked) => handleInputChange('termsAgreed', checked)}
                        className={validationErrors.termsAgreed ? 'border-[var(--gts-portal-error)]' : ''}
                      />
                      <div className="space-y-1">
                        <Label htmlFor="terms-agreed" className="text-[var(--gts-portal-text)] cursor-pointer">
                          Partner agreed to GTS Terms & Conditions *
                        </Label>
                        {validationErrors.termsAgreed && (
                          <p className="text-sm text-[var(--gts-portal-error)]">{validationErrors.termsAgreed}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Invitation */}
              <AccordionItem value="invitation" className="border border-[var(--gts-portal-border)] rounded-xl">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[var(--gts-portal-success)] rounded-full flex items-center justify-center">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-heading text-[var(--gts-portal-text)]">Invitation</div>
                      <div className="text-sm text-[var(--gts-portal-muted)]">Preview and send invitation email</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <div className="bg-[var(--gts-portal-surface)] border border-[var(--gts-portal-border)] rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-[var(--gts-portal-text)]">Email Preview</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowEmailPreview(!showEmailPreview)}
                          className="text-[var(--gts-portal-muted)] hover:text-[var(--gts-portal-text)]"
                        >
                          {showEmailPreview ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          {showEmailPreview ? 'Hide' : 'Show'} Preview
                        </Button>
                      </div>
                      {showEmailPreview && (
                        <div className="bg-[var(--gts-portal-bg)] p-4 rounded border border-[var(--gts-portal-border)]">
                          <pre className="text-sm text-[var(--gts-portal-text)] whitespace-pre-wrap font-body">
                            {getEmailPreviewContent()}
                          </pre>
                        </div>
                      )}
                    </div>

                    <Alert className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
                      <AlertCircle className="h-4 w-4 text-[var(--gts-portal-warning)]" />
                      <AlertDescription className="text-[var(--gts-portal-text)]">
                        After sending the invitation, the partner will receive an email with login instructions and a temporary password.
                      </AlertDescription>
                    </Alert>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-card)]"
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSubmit(true)}
                disabled={isLoading}
                className="border-[var(--gts-portal-border)] text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-card)]"
              >
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Save as Draft
              </Button>
              <Button
                onClick={() => handleSubmit(false)}
                disabled={isLoading || !formData.partnerName || !formData.email || !formData.partnerType}
                className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90 flex-1 sm:flex-none"
              >
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Mail className="h-4 w-4 mr-2" />}
                Create & Send Invite
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary Card */}
            <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
              <CardHeader>
                <CardTitle className="text-[var(--gts-portal-text)]">Summary</CardTitle>
                <CardDescription className="text-[var(--gts-portal-muted)]">
                  Partner overview
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-[var(--gts-portal-muted)] text-sm">Partner Type</Label>
                  <div className="text-[var(--gts-portal-text)]">{getSummaryData().type}</div>
                </div>
                <div>
                  <Label className="text-[var(--gts-portal-muted)] text-sm">Partner Name</Label>
                  <div className="text-[var(--gts-portal-text)]">{getSummaryData().name}</div>
                </div>
                <div>
                  <Label className="text-[var(--gts-portal-muted)] text-sm">Email</Label>
                  <div className="text-[var(--gts-portal-text)]">{getSummaryData().email}</div>
                </div>
                {getSummaryData().conditions.length > 0 && (
                  <div>
                    <Label className="text-[var(--gts-portal-muted)] text-sm">Conditions</Label>
                    <div className="space-y-1">
                      {getSummaryData().conditions.map((condition, index) => (
                        <Badge key={index} variant="outline" className="border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
              <CardHeader>
                <CardTitle className="text-[var(--gts-portal-text)]">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {formData.partnerType === 'partner-agent' && (
                  <div className="text-sm text-[var(--gts-portal-muted)]">
                    <h4 className="text-[var(--gts-portal-text)] font-medium mb-2">Partner Agent Requirements:</h4>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Commission rate typically 10-20%</li>
                      <li>Must have local market knowledge</li>
                      <li>Proven sales experience preferred</li>
                    </ul>
                  </div>
                )}
                {formData.partnerType === 'contractor' && (
                  <div className="text-sm text-[var(--gts-portal-muted)]">
                    <h4 className="text-[var(--gts-portal-text)] font-medium mb-2">Contractor Requirements:</h4>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Valid licenses and insurance required</li>
                      <li>Equipment must meet safety standards</li>
                      <li>SLA agreement defines service levels</li>
                    </ul>
                  </div>
                )}
                {formData.partnerType === 'brand-partner' && (
                  <div className="text-sm text-[var(--gts-portal-muted)]">
                    <h4 className="text-[var(--gts-portal-text)] font-medium mb-2">Brand Partner Requirements:</h4>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Must align with GTS brand values</li>
                      <li>Location in target market areas</li>
                      <li>API integration for automated benefits</li>
                    </ul>
                  </div>
                )}
                {!formData.partnerType && (
                  <div className="text-sm text-[var(--gts-portal-muted)]">
                    Select a partner type to see specific requirements and tips.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--gts-portal-card)] rounded-lg p-6 flex items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-[var(--gts-portal-accent)]" />
            <span className="text-[var(--gts-portal-text)]">Creating partner account...</span>
          </div>
        </div>
      )}
    </div>
  );
}