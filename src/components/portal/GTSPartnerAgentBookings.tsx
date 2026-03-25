import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MessageSquare, 
  AlertTriangle, 
  MoreHorizontal,
  Calendar,
  ChevronDown,
  FileText,
  DollarSign
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Booking {
  id: string;
  client: string;
  service: string;
  date: string;
  time: string;
  amount: number;
  commission: number;
  status: 'new' | 'confirmed' | 'completed' | 'canceled';
}

const mockBookings: Booking[] = [
  {
    id: "GTS-2024-001",
    client: "Андрей Волков",
    service: "Yamaha 252S",
    date: "2024-02-15",
    time: "10:00",
    amount: 45000,
    commission: 4500,
    status: "confirmed"
  },
  {
    id: "GTS-2024-002", 
    client: "Мария Смирнова",
    service: "Robinson R44",
    date: "2024-02-18",
    time: "14:30",
    amount: 120000,
    commission: 12000,
    status: "new"
  },
  {
    id: "GTS-2024-003",
    client: "Дмитрий Козлов",
    service: "Honda Talon",
    date: "2024-02-20",
    time: "09:00",
    amount: 25000,
    commission: 2500,
    status: "completed"
  },
  {
    id: "GTS-2024-004",
    client: "Елена Петрова",
    service: "Slingshot Polaris R",
    date: "2024-02-22",
    time: "16:00",
    amount: 35000,
    commission: 3500,
    status: "canceled"
  },
  {
    id: "GTS-2024-005",
    client: "Алексей Иванов",
    service: "Luxury Route Package",
    date: "2024-02-25",
    time: "11:00",
    amount: 95000,
    commission: 9500,
    status: "confirmed"
  }
];

const statusConfig = {
  new: { label: "Новая", color: "var(--gts-portal-warning)" },
  confirmed: { label: "Подтверждена", color: "var(--gts-portal-success)" },
  completed: { label: "Завершена", color: "var(--gts-portal-success)" },
  canceled: { label: "Отменена", color: "var(--gts-portal-error)" }
};

export function GTSPartnerAgentBookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = booking.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    const matchesService = serviceFilter === "all" || booking.service.includes(serviceFilter);
    
    return matchesSearch && matchesStatus && matchesService;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 
            className="text-2xl font-bold"
            style={{ 
              color: 'var(--gts-portal-text)',
              fontFamily: 'var(--font-heading)'
            }}
          >
            My Bookings
          </h1>
          <p 
            className="mt-2"
            style={{ color: 'var(--gts-portal-muted)' }}
          >
            Manage and track all your client bookings
          </p>
        </div>
        
        <Button 
          className="flex items-center gap-2"
          style={{
            backgroundColor: 'var(--gts-portal-accent)',
            color: 'white'
          }}
        >
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card 
        className="p-6"
        style={{ 
          backgroundColor: 'var(--gts-portal-card)',
          borderColor: 'var(--gts-portal-border)'
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              style={{ color: 'var(--gts-portal-muted)' }}
            />
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              style={{
                backgroundColor: 'var(--gts-portal-surface)',
                borderColor: 'var(--gts-portal-border)',
                color: 'var(--gts-portal-text)'
              }}
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger 
              style={{
                backgroundColor: 'var(--gts-portal-surface)',
                borderColor: 'var(--gts-portal-border)',
                color: 'var(--gts-portal-text)'
              }}
            >
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>

          {/* Service Filter */}
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger 
              style={{
                backgroundColor: 'var(--gts-portal-surface)',
                borderColor: 'var(--gts-portal-border)',
                color: 'var(--gts-portal-text)'
              }}
            >
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="Yamaha">Boat (Yamaha)</SelectItem>
              <SelectItem value="Robinson">Helicopter</SelectItem>
              <SelectItem value="Honda">Buggy</SelectItem>
              <SelectItem value="Slingshot">Slingshot</SelectItem>
              <SelectItem value="Route">Route Package</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Filter */}
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger 
              style={{
                backgroundColor: 'var(--gts-portal-surface)',
                borderColor: 'var(--gts-portal-border)',
                color: 'var(--gts-portal-text)'
              }}
            >
              <SelectValue placeholder="All Periods" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Periods</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Bookings Table */}
      <Card 
        style={{ 
          backgroundColor: 'var(--gts-portal-card)',
          borderColor: 'var(--gts-portal-border)'
        }}
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: 'var(--gts-portal-border)' }}>
                <TableHead style={{ color: 'var(--gts-portal-muted)' }}>#</TableHead>
                <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Client</TableHead>
                <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Service</TableHead>
                <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Date/Time</TableHead>
                <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Amount</TableHead>
                <TableHead style={{ color: 'var(--gts-portal-muted)' }}>My Commission</TableHead>
                <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Status</TableHead>
                <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell 
                    colSpan={8} 
                    className="text-center py-8"
                    style={{ color: 'var(--gts-portal-muted)' }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Calendar className="w-8 h-8" />
                      <p>No bookings found</p>
                      <p className="text-sm">Try adjusting your filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredBookings.map((booking) => (
                  <TableRow 
                    key={booking.id} 
                    style={{ borderColor: 'var(--gts-portal-border)' }}
                  >
                    <TableCell 
                      className="font-mono text-sm"
                      style={{ color: 'var(--gts-portal-text)' }}
                    >
                      {booking.id}
                    </TableCell>
                    <TableCell style={{ color: 'var(--gts-portal-text)' }}>
                      {booking.client}
                    </TableCell>
                    <TableCell 
                      className="font-medium"
                      style={{ color: 'var(--gts-portal-text)' }}
                    >
                      {booking.service}
                    </TableCell>
                    <TableCell style={{ color: 'var(--gts-portal-text)' }}>
                      <div>
                        <div className="font-medium">{booking.date}</div>
                        <div 
                          className="text-sm"
                          style={{ color: 'var(--gts-portal-muted)' }}
                        >
                          {booking.time}
                        </div>
                      </div>
                    </TableCell>  
                    <TableCell 
                      className="font-medium"
                      style={{ color: 'var(--gts-portal-text)' }}
                    >
                      ₽{booking.amount.toLocaleString()}
                    </TableCell>
                    <TableCell 
                      className="font-medium"
                      style={{ color: 'var(--gts-portal-success)' }}
                    >
                      ₽{booking.commission.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className="text-xs"
                        style={{
                          backgroundColor: `${statusConfig[booking.status].color}20`,
                          color: statusConfig[booking.status].color,
                          border: `1px solid ${statusConfig[booking.status].color}40`
                        }}
                      >
                        {statusConfig[booking.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="w-8 h-8 p-0"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Ask Status
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Dispute Commission
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Open Chat
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-red-500">
                            <AlertTriangle className="w-4 h-4" />
                            Mark Suspicious
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className="p-4"
          style={{ 
            backgroundColor: 'var(--gts-portal-card)',
            borderColor: 'var(--gts-portal-border)'
          }}
        >
          <div className="text-center">
            <div 
              className="text-2xl font-bold"
              style={{ color: 'var(--gts-portal-text)' }}
            >
              {filteredBookings.length}
            </div>
            <div 
              className="text-sm"
              style={{ color: 'var(--gts-portal-muted)' }}
            >
              Total Bookings
            </div>
          </div>
        </Card>

        <Card 
          className="p-4"
          style={{ 
            backgroundColor: 'var(--gts-portal-card)',
            borderColor: 'var(--gts-portal-border)'
          }}
        >
          <div className="text-center">
            <div 
              className="text-2xl font-bold"
              style={{ color: 'var(--gts-portal-success)' }}
            >
              ₽{filteredBookings.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
            </div>
            <div 
              className="text-sm"
              style={{ color: 'var(--gts-portal-muted)' }}
            >
              Total Value
            </div>
          </div>
        </Card>

        <Card 
          className="p-4"
          style={{ 
            backgroundColor: 'var(--gts-portal-card)',
            borderColor: 'var(--gts-portal-border)'
          }}
        >
          <div className="text-center">
            <div 
              className="text-2xl font-bold"
              style={{ color: 'var(--gts-portal-accent)' }}
            >
              ₽{filteredBookings.reduce((sum, b) => sum + b.commission, 0).toLocaleString()}
            </div>
            <div 
              className="text-sm"
              style={{ color: 'var(--gts-portal-muted)' }}
            >
              Total Commission
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}