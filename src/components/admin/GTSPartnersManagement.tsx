import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Mail, Phone, Calendar, Users, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { GTSPartnerCreation } from './GTSPartnerCreation';

interface Partner {
  id: string;
  name: string;
  type: 'partner-agent' | 'contractor' | 'brand-partner';
  contactPerson: string;
  email: string;
  phone: string;
  status: 'active' | 'suspended' | 'pending';
  createdAt: string;
  lastActivity: string;
  revenue: number;
  bookings: number;
  region?: string;
  serviceType?: string;
  collaborationType?: string;
}

interface GTSPartnersManagementProps {
  onBack: () => void;
}

const mockPartners: Partner[] = [
  {
    id: '1',
    name: 'Морские Приключения Сочи',
    type: 'partner-agent',
    contactPerson: 'Алексей Морской',
    email: 'alex@seaadventures.ru',
    phone: '+7 (999) 123-45-67',
    status: 'active',
    createdAt: '2024-01-15',
    lastActivity: '2024-03-01',
    revenue: 1250000,
    bookings: 47,
    region: 'Сочи Центр'
  },
  {
    id: '2',
    name: 'АвиаТур Кавказ',
    type: 'contractor',
    contactPerson: 'Мария Вертолётова',
    email: 'maria@aviatour.ru',
    phone: '+7 (999) 234-56-78',
    status: 'active',
    createdAt: '2024-02-01',
    lastActivity: '2024-02-28',
    revenue: 2100000,
    bookings: 35,
    serviceType: 'Helicopter Services'
  },
  {
    id: '3',
    name: 'Café Mountain View',
    type: 'brand-partner',
    contactPerson: 'Дмитрий Кофеев',
    email: 'dmitry@mountainview.cafe',
    phone: '+7 (999) 345-67-89',
    status: 'pending',
    createdAt: '2024-02-20',
    lastActivity: '2024-02-20',
    revenue: 0,
    bookings: 0,
    collaborationType: 'Coffee Shop'
  },
  {
    id: '4',
    name: 'Экстрим Драйв',
    type: 'contractor',
    contactPerson: 'Сергей Багги',
    email: 'sergey@extremedrive.ru',
    phone: '+7 (999) 456-78-90',
    status: 'suspended',
    createdAt: '2024-01-10',
    lastActivity: '2024-02-15',
    revenue: 890000,
    bookings: 23,
    serviceType: 'Buggy Services'
  },
  {
    id: '5',
    name: 'Отель Черное Море',
    type: 'brand-partner',
    contactPerson: 'Елена Гостинец',
    email: 'elena@blacksea-hotel.ru',
    phone: '+7 (999) 567-89-01',
    status: 'active',
    createdAt: '2024-01-20',
    lastActivity: '2024-03-01',
    revenue: 350000,
    bookings: 12,
    collaborationType: 'Hotel'
  }
];

export function GTSPartnersManagement({ onBack }: GTSPartnersManagementProps) {
  const [currentView, setCurrentView] = useState<'list' | 'create'>('list');
  const [partners, setPartners] = useState<Partner[]>(mockPartners);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partner.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partner.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || partner.status === statusFilter;
    const matchesType = typeFilter === 'all' || partner.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: Partner['status']) => {
    switch (status) {
      case 'active':
        return 'bg-[var(--gts-portal-success)] text-white';
      case 'pending':
        return 'bg-[var(--gts-portal-warning)] text-white';
      case 'suspended':
        return 'bg-[var(--gts-portal-error)] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getTypeLabel = (type: Partner['type']) => {
    switch (type) {
      case 'partner-agent':
        return 'Partner Agent';
      case 'contractor':
        return 'Contractor';
      case 'brand-partner':
        return 'Brand Partner';
    }
  };

  const getTypeColor = (type: Partner['type']) => {
    switch (type) {
      case 'partner-agent':
        return 'bg-blue-500 text-white';
      case 'contractor':
        return 'bg-green-500 text-white';
      case 'brand-partner':
        return 'bg-purple-500 text-white';
    }
  };

  const getStatsData = () => {
    const totalRevenue = partners.reduce((sum, partner) => sum + partner.revenue, 0);
    const totalBookings = partners.reduce((sum, partner) => sum + partner.bookings, 0);
    const activePartners = partners.filter(p => p.status === 'active').length;
    const pendingPartners = partners.filter(p => p.status === 'pending').length;

    return {
      totalRevenue,
      totalBookings,
      activePartners,
      pendingPartners,
      totalPartners: partners.length
    };
  };

  const stats = getStatsData();

  if (currentView === 'create') {
    return (
      <GTSPartnerCreation
        onBack={() => setCurrentView('list')}
        onSuccess={(partnerId) => {
          console.log('Partner created:', partnerId);
          setCurrentView('list');
        }}
      />
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
              Back to Admin
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading text-[var(--gts-portal-text)] mb-2">
                Partners Management
              </h1>
              <p className="text-[var(--gts-portal-muted)]">
                Manage all GTS partners and their relationships
              </p>
            </div>
            <Button
              onClick={() => setCurrentView('create')}
              className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Partner
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[var(--gts-portal-accent)]/20 rounded-lg">
                  <Users className="h-5 w-5 text-[var(--gts-portal-accent)]" />
                </div>
                <div>
                  <div className="text-2xl font-heading text-[var(--gts-portal-text)]">{stats.totalPartners}</div>
                  <div className="text-sm text-[var(--gts-portal-muted)]">Total Partners</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[var(--gts-portal-success)]/20 rounded-lg">
                  <Building className="h-5 w-5 text-[var(--gts-portal-success)]" />
                </div>
                <div>
                  <div className="text-2xl font-heading text-[var(--gts-portal-text)]">{stats.activePartners}</div>
                  <div className="text-sm text-[var(--gts-portal-muted)]">Active</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[var(--gts-portal-warning)]/20 rounded-lg">
                  <Calendar className="h-5 w-5 text-[var(--gts-portal-warning)]" />
                </div>
                <div>
                  <div className="text-2xl font-heading text-[var(--gts-portal-text)]">{stats.pendingPartners}</div>
                  <div className="text-sm text-[var(--gts-portal-muted)]">Pending</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-heading text-[var(--gts-portal-text)]">{stats.totalBookings}</div>
                  <div className="text-sm text-[var(--gts-portal-muted)]">Total Bookings</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Building className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <div className="text-lg font-heading text-[var(--gts-portal-text)]">
                    {Math.round(stats.totalRevenue / 1000000 * 10) / 10}M₽
                  </div>
                  <div className="text-sm text-[var(--gts-portal-muted)]">Total Revenue</div>
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
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-[var(--gts-portal-muted)]" />
                <Input
                  placeholder="Search partners..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="partner-agent">Partner Agent</SelectItem>
                  <SelectItem value="contractor">Contractor</SelectItem>
                  <SelectItem value="brand-partner">Brand Partner</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Partners Table */}
        <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
          <CardHeader>
            <CardTitle className="text-[var(--gts-portal-text)]">
              Partners ({filteredPartners.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-[var(--gts-portal-border)]">
                    <TableHead className="text-[var(--gts-portal-text)]">Partner</TableHead>
                    <TableHead className="text-[var(--gts-portal-text)]">Type</TableHead>
                    <TableHead className="text-[var(--gts-portal-text)]">Contact</TableHead>
                    <TableHead className="text-[var(--gts-portal-text)]">Status</TableHead>
                    <TableHead className="text-[var(--gts-portal-text)]">Performance</TableHead>
                    <TableHead className="text-[var(--gts-portal-text)]">Last Activity</TableHead>
                    <TableHead className="text-[var(--gts-portal-text)]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPartners.map((partner) => (
                    <TableRow key={partner.id} className="border-[var(--gts-portal-border)]">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-[var(--gts-portal-surface)] text-[var(--gts-portal-text)]">
                              {partner.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-[var(--gts-portal-text)] font-medium">{partner.name}</div>
                            <div className="text-sm text-[var(--gts-portal-muted)]">{partner.contactPerson}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(partner.type)}>
                          {getTypeLabel(partner.type)}
                        </Badge>
                        {partner.region && (
                          <div className="text-sm text-[var(--gts-portal-muted)] mt-1">{partner.region}</div>
                        )}
                        {partner.serviceType && (
                          <div className="text-sm text-[var(--gts-portal-muted)] mt-1">{partner.serviceType}</div>
                        )}
                        {partner.collaborationType && (
                          <div className="text-sm text-[var(--gts-portal-muted)] mt-1">{partner.collaborationType}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-[var(--gts-portal-text)]">
                            <Mail className="h-4 w-4" />
                            {partner.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[var(--gts-portal-text)]">
                            <Phone className="h-4 w-4" />
                            {partner.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(partner.status)}>
                          {partner.status.charAt(0).toUpperCase() + partner.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm text-[var(--gts-portal-text)]">
                            {partner.revenue.toLocaleString()}₽
                          </div>
                          <div className="text-sm text-[var(--gts-portal-muted)]">
                            {partner.bookings} bookings
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-[var(--gts-portal-text)]">
                          {new Date(partner.lastActivity).toLocaleDateString('ru-RU')}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-surface)]"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
                            <DropdownMenuItem className="text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-card)]">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Partner
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-card)]">
                              <Mail className="h-4 w-4 mr-2" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-[var(--gts-portal-error)] hover:bg-[var(--gts-portal-card)]">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove Partner
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredPartners.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-[var(--gts-portal-muted)] mx-auto mb-4" />
                <div className="text-[var(--gts-portal-text)] font-medium mb-2">
                  No partners found
                </div>
                <div className="text-[var(--gts-portal-muted)]">
                  Try adjusting your search or filter criteria
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}