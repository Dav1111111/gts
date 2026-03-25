import { useState } from "react";
import { 
  Search, 
  Users, 
  MessageSquare, 
  Eye, 
  Calendar,
  DollarSign,
  Clock,
  Tag,
  MoreHorizontal,
  Plus,
  Filter
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

interface Client {
  id: string;
  name: string;
  contact: string;
  firstService: string;
  firstServiceDate: string;
  ltv: number;
  lastActivity: string;
  bookingsCount: number;
  tags: string[];
  totalSpent: number;
}

const mockClients: Client[] = [
  {
    id: "CL-001",
    name: "Андрей Волков",
    contact: "+7 (999) 123-45-67",
    firstService: "Yamaha 252S",
    firstServiceDate: "2024-01-15",
    ltv: 145000,
    lastActivity: "2024-02-15",
    bookingsCount: 3,
    tags: ["VIP", "Regular"],
    totalSpent: 145000
  },
  {
    id: "CL-002",
    name: "Мария Смирнова",
    contact: "+7 (999) 234-56-78",
    firstService: "Robinson R44",
    firstServiceDate: "2024-01-20",
    ltv: 380000,
    lastActivity: "2024-02-18",
    bookingsCount: 5,
    tags: ["Premium", "Corporate"],
    totalSpent: 380000
  },
  {
    id: "CL-003",
    name: "Дмитрий Козлов",
    contact: "+7 (999) 345-67-89",
    firstService: "Honda Talon",
    firstServiceDate: "2024-01-25",
    ltv: 75000,
    lastActivity: "2024-02-20",
    bookingsCount: 2,
    tags: ["Adventure"],
    totalSpent: 75000
  },
  {
    id: "CL-004",
    name: "Елена Петрова",
    contact: "+7 (999) 456-78-90",
    firstService: "Slingshot Polaris R",
    firstServiceDate: "2024-02-01",
    ltv: 35000,
    lastActivity: "2024-02-22",
    bookingsCount: 1,
    tags: ["New"],
    totalSpent: 35000
  },
  {
    id: "CL-005",
    name: "Алексей Иванов",
    contact: "+7 (999) 567-89-01",
    firstService: "Luxury Route Package",
    firstServiceDate: "2024-02-05",
    ltv: 190000,
    lastActivity: "2024-02-25",
    bookingsCount: 2,
    tags: ["VIP", "Luxury"],
    totalSpent: 190000
  }
];

const mockBookingHistory = [
  {
    id: "GTS-2024-001",
    service: "Yamaha 252S",
    date: "2024-01-15",
    amount: 45000,
    status: "completed"
  },
  {
    id: "GTS-2024-015",
    service: "Honda Talon",
    date: "2024-01-28",
    amount: 25000,
    status: "completed"
  },
  {
    id: "GTS-2024-034",
    service: "Yamaha 252S",
    date: "2024-02-15",
    amount: 45000,
    status: "confirmed"
  }
];

const tagColors: Record<string, string> = {
  VIP: "var(--gts-portal-accent)",
  Premium: "var(--gts-portal-warning)",
  Regular: "var(--gts-portal-success)",
  Corporate: "var(--gts-portal-muted)",
  Adventure: "var(--gts-portal-success)",
  New: "var(--gts-portal-warning)",
  Luxury: "var(--gts-portal-accent)"
};

export function GTSPartnerAgentClients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.includes(searchTerm)
  );

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
            My Clients
          </h1>
          <p 
            className="mt-2"
            style={{ color: 'var(--gts-portal-muted)' }}
          >
            Manage clients you've brought to GTS
          </p>
        </div>
        
        <Button 
          className="flex items-center gap-2"
          style={{
            backgroundColor: 'var(--gts-portal-accent)',
            color: 'white'
          }}
        >
          <Plus className="w-4 h-4" />
          Add Client Note
        </Button>
      </div>

      {/* Search & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Search */}
        <Card 
          className="p-6"
          style={{ 
            backgroundColor: 'var(--gts-portal-card)',
            borderColor: 'var(--gts-portal-border)'
          }}
        >
          <div className="relative">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              style={{ color: 'var(--gts-portal-muted)' }}
            />
            <Input
              placeholder="Search clients..."
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
        </Card>

        {/* Quick Stats */}
        <Card 
          className="p-6"
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
              {filteredClients.length}
            </div>
            <div 
              className="text-sm"
              style={{ color: 'var(--gts-portal-muted)' }}
            >
              Total Clients
            </div>
          </div>
        </Card>

        <Card 
          className="p-6"
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
              ₽{filteredClients.reduce((sum, c) => sum + c.ltv, 0).toLocaleString()}
            </div>
            <div 
              className="text-sm"
              style={{ color: 'var(--gts-portal-muted)' }}
            >
              Total LTV
            </div>
          </div>
        </Card>

        <Card 
          className="p-6"
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
              {Math.round(filteredClients.reduce((sum, c) => sum + c.ltv, 0) / filteredClients.length / 1000)}K
            </div>
            <div 
              className="text-sm"
              style={{ color: 'var(--gts-portal-muted)' }}
            >
              Avg LTV
            </div>
          </div>
        </Card>
      </div>

      {/* Clients Table */}
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
                <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Name</TableHead>
                <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Contact</TableHead>
                <TableHead style={{ color: 'var(--gts-portal-muted)' }}>First Service</TableHead>
                <TableHead style={{ color: 'var(--gts-portal-muted)' }}>LTV</TableHead>
                <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Last Activity</TableHead>
                <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Tags</TableHead>
                <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length === 0 ? (
                <TableRow>
                  <TableCell 
                    colSpan={7} 
                    className="text-center py-8"
                    style={{ color: 'var(--gts-portal-muted)' }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Users className="w-8 h-8" />
                      <p>No clients found</p>
                      <p className="text-sm">Try adjusting your search</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredClients.map((client) => (
                  <TableRow 
                    key={client.id} 
                    style={{ borderColor: 'var(--gts-portal-border)' }}
                  >
                    <TableCell style={{ color: 'var(--gts-portal-text)' }}>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div 
                          className="text-sm"
                          style={{ color: 'var(--gts-portal-muted)' }}
                        >
                          {client.bookingsCount} bookings
                        </div>
                      </div>
                    </TableCell>
                    <TableCell 
                      className="font-mono text-sm"
                      style={{ color: 'var(--gts-portal-text)' }}
                    >
                      {client.contact}
                    </TableCell>
                    <TableCell style={{ color: 'var(--gts-portal-text)' }}>
                      <div>
                        <div className="font-medium">{client.firstService}</div>
                        <div 
                          className="text-sm"
                          style={{ color: 'var(--gts-portal-muted)' }}
                        >
                          {client.firstServiceDate}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell 
                      className="font-medium"
                      style={{ color: 'var(--gts-portal-success)' }}
                    >
                      ₽{client.ltv.toLocaleString()}
                    </TableCell>
                    <TableCell style={{ color: 'var(--gts-portal-text)' }}>
                      {client.lastActivity}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {client.tags.map((tag) => (
                          <Badge 
                            key={tag}
                            className="text-xs"
                            style={{
                              backgroundColor: `${tagColors[tag] || 'var(--gts-portal-muted)'}20`,
                              color: tagColors[tag] || 'var(--gts-portal-muted)',
                              border: `1px solid ${tagColors[tag] || 'var(--gts-portal-muted)'}40`
                            }}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedClient(client)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent 
                            className="w-[400px] sm:w-[540px]"
                            style={{ 
                              backgroundColor: 'var(--gts-portal-surface)',
                              borderColor: 'var(--gts-portal-border)'
                            }}
                          >
                            <SheetHeader>
                              <SheetTitle 
                                style={{ color: 'var(--gts-portal-text)' }}
                              >
                                {selectedClient?.name}
                              </SheetTitle>
                            </SheetHeader>
                            <div className="mt-6 space-y-6">
                              {/* Client Info */}
                              <div>
                                <h4 
                                  className="font-medium mb-3"
                                  style={{ color: 'var(--gts-portal-text)' }}
                                >
                                  Client Information
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span style={{ color: 'var(--gts-portal-muted)' }}>Contact:</span>
                                    <span style={{ color: 'var(--gts-portal-text)' }}>{selectedClient?.contact}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span style={{ color: 'var(--gts-portal-muted)' }}>Total Spent:</span>
                                    <span 
                                      className="font-medium"
                                      style={{ color: 'var(--gts-portal-success)' }}
                                    >
                                      ₽{selectedClient?.totalSpent.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span style={{ color: 'var(--gts-portal-muted)' }}>Bookings Count:</span>
                                    <span style={{ color: 'var(--gts-portal-text)' }}>{selectedClient?.bookingsCount}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span style={{ color: 'var(--gts-portal-muted)' }}>Last Activity:</span>
                                    <span style={{ color: 'var(--gts-portal-text)' }}>{selectedClient?.lastActivity}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Booking History */}
                              <div>
                                <h4 
                                  className="font-medium mb-3"
                                  style={{ color: 'var(--gts-portal-text)' }}
                                >
                                  Recent Bookings
                                </h4>
                                <div className="space-y-3">
                                  {mockBookingHistory.map((booking) => (
                                    <div 
                                      key={booking.id}
                                      className="flex items-center justify-between p-3 rounded-lg"
                                      style={{ backgroundColor: 'var(--gts-portal-card)' }}
                                    >
                                      <div>
                                        <div 
                                          className="font-medium text-sm"
                                          style={{ color: 'var(--gts-portal-text)' }}
                                        >
                                          {booking.service}
                                        </div>
                                        <div 
                                          className="text-xs"
                                          style={{ color: 'var(--gts-portal-muted)' }}
                                        >
                                          {booking.date}
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <div 
                                          className="font-medium text-sm"
                                          style={{ color: 'var(--gts-portal-success)' }}
                                        >
                                          ₽{booking.amount.toLocaleString()}
                                        </div>
                                        <Badge 
                                          className="text-xs"
                                          style={{
                                            backgroundColor: 'var(--gts-portal-success)20',
                                            color: 'var(--gts-portal-success)'
                                          }}
                                        >
                                          {booking.status}
                                        </Badge>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Quick Actions */}
                              <div>
                                <h4 
                                  className="font-medium mb-3"
                                  style={{ color: 'var(--gts-portal-text)' }}
                                >
                                  Quick Actions
                                </h4>
                                <div className="space-y-2">
                                  <Button 
                                    className="w-full justify-start"
                                    variant="outline"
                                    style={{
                                      borderColor: 'var(--gts-portal-border)',
                                      color: 'var(--gts-portal-text)'
                                    }}
                                  >
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Send Message
                                  </Button>
                                  <Button 
                                    className="w-full justify-start"
                                    variant="outline"
                                    style={{
                                      borderColor: 'var(--gts-portal-border)',
                                      color: 'var(--gts-portal-text)'
                                    }}
                                  >
                                    <Tag className="w-4 h-4 mr-2" />
                                    Manage Tags
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </SheetContent>
                        </Sheet>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}