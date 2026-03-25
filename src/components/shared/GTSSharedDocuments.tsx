import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, Search, File, FileCheck, AlertCircle, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Separator } from '../ui/separator';

export interface Document {
  id: string;
  name: string;
  type: 'contract' | 'act' | 'invoice' | 'license' | 'insurance' | 'terms';
  status: 'active' | 'pending' | 'expired' | 'draft';
  createdDate: string;
  validUntil?: string;
  size: string;
  downloadUrl: string;
  description?: string;
}

interface DocumentStats {
  total: number;
  active: number;
  pending: number;
  expired: number;
}

interface GTSSharedDocumentsProps {
  documents: Document[];
  stats: DocumentStats;
  onDownload: (documentId: string) => void;
  onView: (documentId: string) => void;
  userRole: 'partner-agent' | 'contractor' | 'brand-partner' | 'admin';
}

const documentTypeLabels = {
  contract: 'Договор',
  act: 'Акт выполненных работ',
  invoice: 'Счет',
  license: 'Лицензия',
  insurance: 'Страховка',
  terms: 'Условия использования'
};

const statusLabels = {
  active: 'Активный',
  pending: 'Ожидает подписания',
  expired: 'Истек срок',
  draft: 'Черновик'
};

const statusColors = {
  active: 'bg-[var(--gts-portal-success)] text-white',
  pending: 'bg-[var(--gts-portal-warning)] text-white',
  expired: 'bg-[var(--gts-portal-error)] text-white',
  draft: 'bg-[var(--gts-portal-muted)] text-[var(--gts-portal-text)]'
};

export function GTSSharedDocuments({
  documents,
  stats,
  onDownload,
  onView,
  userRole
}: GTSSharedDocumentsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
    
    let matchesPeriod = true;
    if (selectedPeriod !== 'all') {
      const docDate = new Date(doc.createdDate);
      const now = new Date();
      
      switch (selectedPeriod) {
        case 'week':
          matchesPeriod = (now.getTime() - docDate.getTime()) <= 7 * 24 * 60 * 60 * 1000;
          break;
        case 'month':
          matchesPeriod = (now.getTime() - docDate.getTime()) <= 30 * 24 * 60 * 60 * 1000;
          break;
        case 'quarter':
          matchesPeriod = (now.getTime() - docDate.getTime()) <= 90 * 24 * 60 * 60 * 1000;
          break;
        case 'year':
          matchesPeriod = (now.getTime() - docDate.getTime()) <= 365 * 24 * 60 * 60 * 1000;
          break;
      }
    }
    
    return matchesSearch && matchesType && matchesStatus && matchesPeriod;
  });

  const getDocumentIcon = (type: Document['type']) => {
    switch (type) {
      case 'contract':
        return <FileText className="h-5 w-5" />;
      case 'act':
        return <FileCheck className="h-5 w-5" />;
      case 'invoice':
        return <File className="h-5 w-5" />;
      case 'license':
      case 'insurance':
        return <FileText className="h-5 w-5" />;
      case 'terms':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading text-[var(--gts-portal-text)]">
            Центр документов
          </h1>
          <p className="text-[var(--gts-portal-muted)]">
            Управление документами и договорами
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--gts-portal-surface)] rounded-lg">
                <FileText className="h-5 w-5 text-[var(--gts-portal-text)]" />
              </div>
              <div>
                <div className="text-2xl font-heading text-[var(--gts-portal-text)]">{stats.total}</div>
                <div className="text-sm text-[var(--gts-portal-muted)]">Всего документов</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--gts-portal-success)]/20 rounded-lg">
                <FileCheck className="h-5 w-5 text-[var(--gts-portal-success)]" />
              </div>
              <div>
                <div className="text-2xl font-heading text-[var(--gts-portal-text)]">{stats.active}</div>
                <div className="text-sm text-[var(--gts-portal-muted)]">Активные</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--gts-portal-warning)]/20 rounded-lg">
                <AlertCircle className="h-5 w-5 text-[var(--gts-portal-warning)]" />
              </div>
              <div>
                <div className="text-2xl font-heading text-[var(--gts-portal-text)]">{stats.pending}</div>
                <div className="text-sm text-[var(--gts-portal-muted)]">На рассмотрении</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--gts-portal-error)]/20 rounded-lg">
                <Calendar className="h-5 w-5 text-[var(--gts-portal-error)]" />
              </div>
              <div>
                <div className="text-2xl font-heading text-[var(--gts-portal-text)]">{stats.expired}</div>
                <div className="text-sm text-[var(--gts-portal-muted)]">Истек срок</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
        <CardHeader>
          <CardTitle className="text-[var(--gts-portal-text)] flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Фильтры
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-[var(--gts-portal-muted)]" />
              <Input
                placeholder="Поиск документов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
              />
            </div>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                <SelectValue placeholder="Тип документа" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
                <SelectItem value="all">Все типы</SelectItem>
                <SelectItem value="contract">Договоры</SelectItem>
                <SelectItem value="act">Акты</SelectItem>
                <SelectItem value="invoice">Счета</SelectItem>
                {userRole === 'contractor' && (
                  <>
                    <SelectItem value="license">Лицензии</SelectItem>
                    <SelectItem value="insurance">Страховка</SelectItem>
                  </>
                )}
                <SelectItem value="terms">Условия</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="active">Активные</SelectItem>
                <SelectItem value="pending">На рассмотрении</SelectItem>
                <SelectItem value="expired">Истек срок</SelectItem>
                <SelectItem value="draft">Черновики</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                <SelectValue placeholder="Период" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
                <SelectItem value="all">Весь период</SelectItem>
                <SelectItem value="week">Последняя неделя</SelectItem>
                <SelectItem value="month">Последний месяц</SelectItem>
                <SelectItem value="quarter">Последний квартал</SelectItem>
                <SelectItem value="year">Последний год</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
        <CardHeader>
          <CardTitle className="text-[var(--gts-portal-text)]">
            Документы ({filteredDocuments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[var(--gts-portal-border)]">
                  <TableHead className="text-[var(--gts-portal-text)]">Документ</TableHead>
                  <TableHead className="text-[var(--gts-portal-text)]">Тип</TableHead>
                  <TableHead className="text-[var(--gts-portal-text)]">Статус</TableHead>
                  <TableHead className="text-[var(--gts-portal-text)]">Создан</TableHead>
                  <TableHead className="text-[var(--gts-portal-text)]">Действует до</TableHead>
                  <TableHead className="text-[var(--gts-portal-text)]">Размер</TableHead>
                  <TableHead className="text-[var(--gts-portal-text)]">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id} className="border-[var(--gts-portal-border)]">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="text-[var(--gts-portal-text)]">
                          {getDocumentIcon(doc.type)}
                        </div>
                        <div>
                          <div className="text-[var(--gts-portal-text)] font-medium">{doc.name}</div>
                          {doc.description && (
                            <div className="text-sm text-[var(--gts-portal-muted)]">{doc.description}</div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-[var(--gts-portal-text)]">
                        {documentTypeLabels[doc.type]}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[doc.status]}>
                        {statusLabels[doc.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-[var(--gts-portal-text)]">
                        {new Date(doc.createdDate).toLocaleDateString('ru-RU')}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-[var(--gts-portal-text)]">
                        {doc.validUntil 
                          ? new Date(doc.validUntil).toLocaleDateString('ru-RU')
                          : '—'
                        }
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-[var(--gts-portal-muted)]">{doc.size}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onView(doc.id)}
                          className="text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-surface)]"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDownload(doc.id)}
                          className="text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-surface)]"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-[var(--gts-portal-muted)] mx-auto mb-4" />
              <div className="text-[var(--gts-portal-text)] font-medium mb-2">
                Документы не найдены
              </div>
              <div className="text-[var(--gts-portal-muted)]">
                Попробуйте изменить параметры фильтра
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}