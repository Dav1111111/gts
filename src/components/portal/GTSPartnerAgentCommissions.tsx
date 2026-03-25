import { useState } from "react";
import { 
  CreditCard, 
  Download, 
  Plus, 
  DollarSign, 
  Calendar,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

interface Commission {
  id: string;
  bookingId: string;
  client: string;
  service: string;
  bookingAmount: number;
  commissionRate: number;
  commissionAmount: number;
  status: 'pending' | 'accrued' | 'paid';
  accrualDate: string;
  payoutDate?: string;
}

interface Payout {
  id: string;
  amount: number;
  requestDate: string;
  processDate?: string;
  status: 'requested' | 'processing' | 'completed' | 'rejected';
  method: string;
  provider: string;
  commissionCount: number;
}

const mockCommissions: Commission[] = [
  {
    id: "COM-2024-001",
    bookingId: "GTS-2024-001",
    client: "Андрей Волков",
    service: "Yamaha 252S",
    bookingAmount: 45000,
    commissionRate: 10,
    commissionAmount: 4500,
    status: "paid",
    accrualDate: "2024-01-15",
    payoutDate: "2024-01-30"
  },
  {
    id: "COM-2024-002",
    bookingId: "GTS-2024-002",
    client: "Мария Смирнова",
    service: "Robinson R44",
    bookingAmount: 120000,
    commissionRate: 10,
    commissionAmount: 12000,
    status: "accrued",
    accrualDate: "2024-02-18"
  },
  {
    id: "COM-2024-003",
    bookingId: "GTS-2024-003", 
    client: "Дмитрий Козлов",
    service: "Honda Talon",
    bookingAmount: 25000,
    commissionRate: 10,
    commissionAmount: 2500,
    status: "paid",
    accrualDate: "2024-02-20",
    payoutDate: "2024-02-28"
  },
  {
    id: "COM-2024-004",
    bookingId: "GTS-2024-005",
    client: "Алексей Иванов",
    service: "Luxury Route Package",
    bookingAmount: 95000,
    commissionRate: 10,
    commissionAmount: 9500,
    status: "pending",
    accrualDate: "2024-02-25"
  }
];

const mockPayouts: Payout[] = [
  {
    id: "PAY-2024-001",
    amount: 67000,
    requestDate: "2024-01-25",
    processDate: "2024-01-30",
    status: "completed",
    method: "Bank Transfer",
    provider: "Sberbank",
    commissionCount: 15
  },
  {
    id: "PAY-2024-002",
    amount: 45000,
    requestDate: "2024-02-20",
    processDate: "2024-02-28",
    status: "completed",
    method: "Bank Transfer", 
    provider: "Sberbank",
    commissionCount: 8
  },
  {
    id: "PAY-2024-003",
    amount: 22000,
    requestDate: "2024-03-01",
    status: "processing",
    method: "Bank Transfer",
    provider: "Sberbank",
    commissionCount: 5
  }
];

const commissionStatusConfig = {
  pending: { label: "Pending", color: "var(--gts-portal-warning)", icon: Clock },
  accrued: { label: "Accrued", color: "var(--gts-portal-success)", icon: CheckCircle },
  paid: { label: "Paid", color: "var(--gts-portal-muted)", icon: CheckCircle }
};

const payoutStatusConfig = {
  requested: { label: "Requested", color: "var(--gts-portal-warning)", icon: Clock },
  processing: { label: "Processing", color: "var(--gts-portal-warning)", icon: Clock },
  completed: { label: "Completed", color: "var(--gts-portal-success)", icon: CheckCircle },
  rejected: { label: "Rejected", color: "var(--gts-portal-error)", icon: XCircle }
};

export function GTSPartnerAgentCommissions() {
  const [payoutDialogOpen, setPayoutDialogOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutMethod, setPayoutMethod] = useState("");

  const totalAccrued = mockCommissions
    .filter(c => c.status === 'accrued')
    .reduce((sum, c) => sum + c.commissionAmount, 0);
    
  const totalPaid = mockCommissions
    .filter(c => c.status === 'paid')
    .reduce((sum, c) => sum + c.commissionAmount, 0);
    
  const totalPending = mockCommissions
    .filter(c => c.status === 'pending')
    .reduce((sum, c) => sum + c.commissionAmount, 0);

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
            Commissions & Payouts
          </h1>
          <p 
            className="mt-2"
            style={{ color: 'var(--gts-portal-muted)' }}
          >
            Track your earnings and manage payouts
          </p>
        </div>
        
        <Dialog open={payoutDialogOpen} onOpenChange={setPayoutDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="flex items-center gap-2"
              style={{
                backgroundColor: 'var(--gts-portal-accent)',
                color: 'white'
              }}
            >
              <CreditCard className="w-4 h-4" />
              Request Payout
            </Button>
          </DialogTrigger>
          <DialogContent 
            style={{ 
              backgroundColor: 'var(--gts-portal-surface)',
              borderColor: 'var(--gts-portal-border)'
            }}
          >
            <DialogHeader>
              <DialogTitle style={{ color: 'var(--gts-portal-text)' }}>
                Request Payout
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label 
                  htmlFor="amount"
                  style={{ color: 'var(--gts-portal-text)' }}
                >
                  Amount (Available: ₽{totalAccrued.toLocaleString()})
                </Label>
                <Input
                  id="amount"
                  placeholder="Enter amount"
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  style={{
                    backgroundColor: 'var(--gts-portal-surface)',
                    borderColor: 'var(--gts-portal-border)',
                    color: 'var(--gts-portal-text)'
                  }}
                />
              </div>
              
              <div>
                <Label 
                  htmlFor="method"
                  style={{ color: 'var(--gts-portal-text)' }}
                >
                  Payout Method
                </Label>
                <Select value={payoutMethod} onValueChange={setPayoutMethod}>
                  <SelectTrigger 
                    style={{
                      backgroundColor: 'var(--gts-portal-surface)',
                      borderColor: 'var(--gts-portal-border)',
                      color: 'var(--gts-portal-text)'
                    }}
                  >
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="wallet">Digital Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label 
                  htmlFor="requisites"
                  style={{ color: 'var(--gts-portal-text)' }}
                >
                  Payment Requisites
                </Label>
                <Textarea
                  id="requisites"
                  placeholder="Enter your payment details..."
                  style={{
                    backgroundColor: 'var(--gts-portal-surface)',
                    borderColor: 'var(--gts-portal-border)',
                    color: 'var(--gts-portal-text)'
                  }}
                />
              </div>
              
              <Button 
                className="w-full"
                style={{
                  backgroundColor: 'var(--gts-portal-accent)',
                  color: 'white'
                }}
                onClick={() => setPayoutDialogOpen(false)}
              >
                Submit Request
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card 
          className="p-6"
          style={{ 
            backgroundColor: 'var(--gts-portal-card)',
            borderColor: 'var(--gts-portal-border)'
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: 'var(--gts-portal-warning)20' }}
            >
              <Clock 
                className="w-5 h-5" 
                style={{ color: 'var(--gts-portal-warning)' }}
              />
            </div>
            <div>
              <div 
                className="text-2xl font-bold"
                style={{ color: 'var(--gts-portal-text)' }}
              >
                ₽{totalPending.toLocaleString()}
              </div>
              <div 
                className="text-sm"
                style={{ color: 'var(--gts-portal-muted)' }}
              >
                Pending
              </div>
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
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: 'var(--gts-portal-success)20' }}
            >
              <CheckCircle 
                className="w-5 h-5" 
                style={{ color: 'var(--gts-portal-success)' }}
              />
            </div>
            <div>
              <div 
                className="text-2xl font-bold"
                style={{ color: 'var(--gts-portal-text)' }}
              >
                ₽{totalAccrued.toLocaleString()}
              </div>
              <div 
                className="text-sm"
                style={{ color: 'var(--gts-portal-muted)' }}
              >
                Accrued
              </div>
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
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: 'var(--gts-portal-muted)20' }}
            >
              <DollarSign 
                className="w-5 h-5" 
                style={{ color: 'var(--gts-portal-muted)' }}
              />
            </div>
            <div>
              <div 
                className="text-2xl font-bold"
                style={{ color: 'var(--gts-portal-text)' }}
              >
                ₽{totalPaid.toLocaleString()}
              </div>
              <div 
                className="text-sm"
                style={{ color: 'var(--gts-portal-muted)' }}
              >
                Paid
              </div>
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
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: 'var(--gts-portal-accent)20' }}
            >
              <CreditCard 
                className="w-5 h-5" 
                style={{ color: 'var(--gts-portal-accent)' }}
              />
            </div>
            <div>
              <div 
                className="text-2xl font-bold"
                style={{ color: 'var(--gts-portal-text)' }}
              >
                ₽{(totalAccrued + totalPaid + totalPending).toLocaleString()}
              </div>
              <div 
                className="text-sm"
                style={{ color: 'var(--gts-portal-muted)' }}
              >
                Total Earned
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="accruals" className="space-y-6">
        <TabsList 
          className="grid w-full grid-cols-2"
          style={{ backgroundColor: 'var(--gts-portal-surface)' }}
        >
          <TabsTrigger 
            value="accruals"
            style={{ color: 'var(--gts-portal-text)' }}
          >
            Commission Accruals
          </TabsTrigger>
          <TabsTrigger 
            value="payouts"
            style={{ color: 'var(--gts-portal-text)' }}
          >
            Payouts History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="accruals">
          <Card 
            style={{ 
              backgroundColor: 'var(--gts-portal-card)',
              borderColor: 'var(--gts-portal-border)'
            }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 
                  className="text-lg font-semibold"
                  style={{ color: 'var(--gts-portal-text)' }}
                >
                  Commission Accruals by Booking
                </h3>
                <Button 
                  variant="outline"
                  className="flex items-center gap-2"
                  style={{
                    borderColor: 'var(--gts-portal-border)',
                    color: 'var(--gts-portal-text)'
                  }}
                >
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow style={{ borderColor: 'var(--gts-portal-border)' }}>
                      <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Booking ID</TableHead>
                      <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Client</TableHead>
                      <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Service</TableHead>
                      <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Booking Amount</TableHead>
                      <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Rate</TableHead>
                      <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Commission</TableHead>
                      <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Status</TableHead>
                      <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCommissions.map((commission) => {
                      const statusConfig = commissionStatusConfig[commission.status];
                      const StatusIcon = statusConfig.icon;
                      
                      return (
                        <TableRow 
                          key={commission.id} 
                          style={{ borderColor: 'var(--gts-portal-border)' }}
                        >
                          <TableCell 
                            className="font-mono text-sm"
                            style={{ color: 'var(--gts-portal-text)' }}
                          >
                            {commission.bookingId}
                          </TableCell>
                          <TableCell style={{ color: 'var(--gts-portal-text)' }}>
                            {commission.client}
                          </TableCell>
                          <TableCell style={{ color: 'var(--gts-portal-text)' }}>
                            {commission.service}
                          </TableCell>
                          <TableCell 
                            className="font-medium"
                            style={{ color: 'var(--gts-portal-text)' }}
                          >
                            ₽{commission.bookingAmount.toLocaleString()}
                          </TableCell>
                          <TableCell style={{ color: 'var(--gts-portal-text)' }}>
                            {commission.commissionRate}%
                          </TableCell>
                          <TableCell 
                            className="font-medium"
                            style={{ color: 'var(--gts-portal-success)' }}
                          >
                            ₽{commission.commissionAmount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              className="flex items-center gap-1 text-xs"
                              style={{
                                backgroundColor: `${statusConfig.color}20`,
                                color: statusConfig.color,
                                border: `1px solid ${statusConfig.color}40`
                              }}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {statusConfig.label}
                            </Badge>
                          </TableCell>
                          <TableCell style={{ color: 'var(--gts-portal-text)' }}>
                            {commission.accrualDate}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payouts">
          <Card 
            style={{ 
              backgroundColor: 'var(--gts-portal-card)',
              borderColor: 'var(--gts-portal-border)'
            }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 
                  className="text-lg font-semibold"
                  style={{ color: 'var(--gts-portal-text)' }}
                >
                  Payouts History
                </h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2"
                    style={{
                      borderColor: 'var(--gts-portal-border)',
                      color: 'var(--gts-portal-text)'
                    }}
                  >
                    <FileText className="w-4 h-4" />
                    Download Act
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2"
                    style={{
                      borderColor: 'var(--gts-portal-border)',
                      color: 'var(--gts-portal-text)'
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Statement
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow style={{ borderColor: 'var(--gts-portal-border)' }}>
                      <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Payout ID</TableHead>
                      <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Amount</TableHead>
                      <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Request Date</TableHead>
                      <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Process Date</TableHead>
                      <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Method</TableHead>
                      <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Provider</TableHead>
                      <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Status</TableHead>
                      <TableHead style={{ color: 'var(--gts-portal-muted)' }}>Commissions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPayouts.map((payout) => {
                      const statusConfig = payoutStatusConfig[payout.status];
                      const StatusIcon = statusConfig.icon;
                      
                      return (
                        <TableRow 
                          key={payout.id} 
                          style={{ borderColor: 'var(--gts-portal-border)' }}
                        >
                          <TableCell 
                            className="font-mono text-sm"
                            style={{ color: 'var(--gts-portal-text)' }}
                          >
                            {payout.id}
                          </TableCell>
                          <TableCell 
                            className="font-medium"
                            style={{ color: 'var(--gts-portal-success)' }}
                          >
                            ₽{payout.amount.toLocaleString()}
                          </TableCell>
                          <TableCell style={{ color: 'var(--gts-portal-text)' }}>
                            {payout.requestDate}
                          </TableCell>
                          <TableCell style={{ color: 'var(--gts-portal-text)' }}>
                            {payout.processDate || '-'}
                          </TableCell>
                          <TableCell style={{ color: 'var(--gts-portal-text)' }}>
                            {payout.method}
                          </TableCell>
                          <TableCell style={{ color: 'var(--gts-portal-text)' }}>
                            {payout.provider}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              className="flex items-center gap-1 text-xs"
                              style={{
                                backgroundColor: `${statusConfig.color}20`,
                                color: statusConfig.color,
                                border: `1px solid ${statusConfig.color}40`
                              }}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {statusConfig.label}
                            </Badge>
                          </TableCell>
                          <TableCell style={{ color: 'var(--gts-portal-text)' }}>
                            {payout.commissionCount}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}