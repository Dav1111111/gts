import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { 
  ArrowLeft, 
  Download, 
  Filter,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  FileText,
  CreditCard,
  Wallet,
  Building,
  Users,
  Handshake,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  Settings,
  Upload,
  Eye,
  ExternalLink
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Progress } from "../../ui/progress";
import { Separator } from "../../ui/separator";

interface GTSFinanceCenterModuleProps {
  onBack: () => void;
  onNavigateToPartners?: () => void;
}

export function GTSFinanceCenterModule({ onBack, onNavigateToPartners }: GTSFinanceCenterModuleProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [timePeriod, setTimePeriod] = useState("month");
  const [reportFilters, setReportFilters] = useState({
    month: new Date().toISOString().slice(0, 7),
    partner: "all",
    product: "all",
    status: "all"
  });

  const revenueData = {
    total: 2300000,
    growth: 12.5,
    byProduct: [
      { name: "Yacht Tours", revenue: 950000, growth: 15.2, margin: 35 },
      { name: "Helicopter Flights", revenue: 780000, growth: 8.7, margin: 42 },
      { name: "Buggy Adventures", revenue: 320000, growth: 22.1, margin: 28 },
      { name: "Slingshot Rides", revenue: 250000, growth: -3.2, margin: 31 }
    ],
    byChannel: [
      { name: "Direct", revenue: 1150000, percentage: 50 },
      { name: "Partner Agents", revenue: 690000, percentage: 30 },
      { name: "Brand Partners", revenue: 345000, percentage: 15 },
      { name: "Corporate", revenue: 115000, percentage: 5 }
    ]
  };

  const costsData = {
    total: 1520000,
    breakdown: [
      { category: "Personnel", amount: 580000, percentage: 38.2 },
      { category: "Fuel & Maintenance", amount: 450000, percentage: 29.6 },
      { category: "Insurance", amount: 230000, percentage: 15.1 },
      { category: "Marketing", amount: 160000, percentage: 10.5 },
      { category: "Operations", amount: 100000, percentage: 6.6 }
    ],
    margin: ((2300000 - 1520000) / 2300000) * 100
  };

  const payoutsData = {
    agents: [
      { name: "Premium Travel Agency", amount: 67500, commission: 15, status: "paid", dueDate: "2024-12-01" },
      { name: "Elite Events Moscow", amount: 33600, commission: 12, status: "pending", dueDate: "2024-12-05" },
      { name: "Luxury Concierge", amount: 45200, commission: 18, status: "processing", dueDate: "2024-12-03" }
    ],
    contractors: [
      { name: "Marine Services Ltd", amount: 125000, type: "Monthly Fee", status: "paid", dueDate: "2024-12-01" },
      { name: "Aviation Support", amount: 180000, type: "Service Contract", status: "pending", dueDate: "2024-12-07" },
      { name: "Safety Training Corp", amount: 45000, type: "Training Services", status: "approved", dueDate: "2024-12-10" }
    ],
    brands: [
      { name: "Luxury Hotels Group", amount: 85000, type: "Cross-promo Bonus", status: "paid", dueDate: "2024-11-30" },
      { name: "Tech Solutions Corp", amount: 45000, type: "Partnership Bonus", status: "pending", dueDate: "2024-12-15" },
      { name: "Fashion Retail Chain", amount: 62000, type: "Campaign Bonus", status: "processing", dueDate: "2024-12-12" }
    ]
  };

  const getStatusColor = (status: string) => {
    const colors = {
      paid: "bg-green-500 text-white",
      pending: "bg-yellow-500 text-white",
      processing: "bg-blue-500 text-white",
      approved: "bg-purple-500 text-white",
      overdue: "bg-red-500 text-white"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500 text-white";
  };

  const formatCurrency = (amount: number) => {
    return `₽${(amount / 1000).toFixed(0)}K`;
  };

  // Extended payouts data with proper structure
  const payoutsTableData = [
    { id: 1, partner: "Premium Travel Agency", type: "Agent Commission", period: "Декабрь 2024", amount: 67500, status: "paid", dueDate: "2024-12-01" },
    { id: 2, partner: "Elite Events Moscow", type: "Agent Commission", period: "Декабрь 2024", amount: 33600, status: "pending", dueDate: "2024-12-05" },
    { id: 3, partner: "Luxury Concierge", type: "Agent Commission", period: "Декабрь 2024", amount: 45200, status: "processing", dueDate: "2024-12-03" },
    { id: 4, partner: "Marine Services Ltd", type: "Monthly Fee", period: "Декабрь 2024", amount: 125000, status: "paid", dueDate: "2024-12-01" },
    { id: 5, partner: "Aviation Support", type: "Service Contract", period: "Декабрь 2024", amount: 180000, status: "pending", dueDate: "2024-12-07" },
    { id: 6, partner: "Luxury Hotels Group", type: "Cross-promo Bonus", period: "Ноябрь 2024", amount: 85000, status: "paid", dueDate: "2024-11-30" },
    { id: 7, partner: "Tech Solutions Corp", type: "Partnership Bonus", period: "Декабрь 2024", amount: 45000, status: "pending", dueDate: "2024-12-15" }
  ];

  // Accounting documents data
  const accountingDocuments = [
    { id: 1, type: "Счет", number: "INV-2024-001247", partner: "Premium Travel Agency", amount: 67500, status: "paid", date: "2024-12-01", dueDate: "2024-12-15" },
    { id: 2, type: "Акт выполненных работ", number: "ACT-2024-000892", partner: "Marine Services Ltd", amount: 125000, status: "signed", date: "2024-11-30", dueDate: "2024-12-10" },
    { id: 3, type: "Закрывающий документ", number: "CLS-2024-000156", partner: "Aviation Support", amount: 180000, status: "pending", date: "2024-12-03", dueDate: "2024-12-17" },
    { id: 4, type: "Счет-фактура", number: "FAC-2024-001098", partner: "Luxury Hotels Group", amount: 85000, status: "processed", date: "2024-11-28", dueDate: "2024-12-12" },
    { id: 5, type: "Договор", number: "CON-2024-000078", partner: "Tech Solutions Corp", amount: 450000, status: "signed", date: "2024-11-15", dueDate: "2024-12-30" },
    { id: 6, type: "Счет", number: "INV-2024-001248", partner: "Elite Events Moscow", amount: 33600, status: "sent", date: "2024-12-02", dueDate: "2024-12-16" }
  ];

  const getDocumentStatusColor = (status: string) => {
    const colors = {
      paid: "bg-green-500/20 text-green-400",
      signed: "bg-blue-500/20 text-blue-400", 
      processed: "bg-purple-500/20 text-purple-400",
      pending: "bg-yellow-500/20 text-yellow-400",
      sent: "bg-orange-500/20 text-orange-400",
      overdue: "bg-red-500/20 text-red-400"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500/20 text-gray-400";
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gts-portal-bg)' }}>
      {/* Header */}
      <div className="border-b" style={{ 
        backgroundColor: 'var(--gts-portal-surface)', 
        borderColor: 'var(--gts-portal-border)' 
      }}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} style={{ color: 'var(--gts-portal-text)' }}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portal
            </Button>
            <div>
              <h1 className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                Finance Center
              </h1>
              <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                Revenue analytics, costs, margins, and payouts
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            {onNavigateToPartners && (
              <Button 
                onClick={onNavigateToPartners}
                variant="outline"
              >
                <Handshake className="h-4 w-4 mr-2" />
                Partners
              </Button>
            )}
            <Button className="bg-green-500 hover:bg-green-600">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Total Revenue</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                    {formatCurrency(revenueData.total)}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-400" />
                    <span className="text-xs text-green-400">+{revenueData.growth}%</span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Total Costs</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                    {formatCurrency(costsData.total)}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingDown className="h-3 w-3 text-blue-400" />
                    <span className="text-xs text-blue-400">-2.3%</span>
                  </div>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Net Margin</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                    {costsData.margin.toFixed(1)}%
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-purple-400" />
                    <span className="text-xs text-purple-400">+3.2%</span>
                  </div>
                </div>
                <PieChart className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Pending Payouts</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>₽342K</p>
                  <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>7 pending</p>
                </div>
                <Wallet className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                <CardHeader>
                  <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Revenue by Product</CardTitle>
                  <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                    Performance breakdown by service type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData.byProduct.map((product, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                            {product.name}
                          </span>
                          <div className="text-right">
                            <span className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                              {formatCurrency(product.revenue)}
                            </span>
                            <div className="flex items-center gap-1">
                              {product.growth >= 0 ? 
                                <TrendingUp className="h-3 w-3 text-green-400" /> :
                                <TrendingDown className="h-3 w-3 text-red-400" />
                              }
                              <span className={`text-xs ${product.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {product.growth > 0 ? '+' : ''}{product.growth}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={(product.revenue / revenueData.total) * 100} className="flex-1 h-2" />
                          <span className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                            {product.margin}% margin
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                <CardHeader>
                  <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Revenue by Channel</CardTitle>
                  <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                    Distribution across sales channels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData.byChannel.map((channel, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                            {channel.name}
                          </span>
                          <div className="text-right">
                            <span className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                              {formatCurrency(channel.revenue)}
                            </span>
                            <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                              {channel.percentage}%
                            </p>
                          </div>
                        </div>
                        <Progress value={channel.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>



          {/* Payouts Tab */}
          <TabsContent value="payouts" className="mt-6">
            <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Partner Payouts</CardTitle>
                    <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                      Manage partner payments and commissions
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b" style={{ borderColor: 'var(--gts-portal-border)' }}>
                        <th className="text-left p-4 font-medium" style={{ color: 'var(--gts-portal-text)' }}>Partner</th>
                        <th className="text-left p-4 font-medium" style={{ color: 'var(--gts-portal-text)' }}>Type</th>
                        <th className="text-left p-4 font-medium" style={{ color: 'var(--gts-portal-text)' }}>Period</th>
                        <th className="text-right p-4 font-medium" style={{ color: 'var(--gts-portal-text)' }}>Amount</th>
                        <th className="text-center p-4 font-medium" style={{ color: 'var(--gts-portal-text)' }}>Status</th>
                        <th className="text-center p-4 font-medium" style={{ color: 'var(--gts-portal-text)' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payoutsTableData.map((payout) => (
                        <tr 
                          key={payout.id} 
                          className="border-b hover:bg-opacity-50" 
                          style={{ 
                            borderColor: 'var(--gts-portal-border)',
                            '&:hover': { backgroundColor: 'var(--gts-portal-card)' }
                          }}
                        >
                          <td className="p-4">
                            <div>
                              <div className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                                {payout.partner}
                              </div>
                              <div className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                                Due: {payout.dueDate}
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className="text-xs">
                              {payout.type}
                            </Badge>
                          </td>
                          <td className="p-4" style={{ color: 'var(--gts-portal-text)' }}>
                            {payout.period}
                          </td>
                          <td className="p-4 text-right font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                            {formatCurrency(payout.amount)}
                          </td>
                          <td className="p-4 text-center">
                            <Badge className={getStatusColor(payout.status)}>
                              {payout.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <CreditCard className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="mt-6">
            <div className="space-y-6">
              {/* Filters */}
              <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                <CardHeader>
                  <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Report Filters</CardTitle>
                  <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                    Configure report parameters and export options
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="month">Month</Label>
                      <Input
                        id="month"
                        type="month"
                        value={reportFilters.month}
                        onChange={(e) => setReportFilters(prev => ({ ...prev, month: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="partner">Partner</Label>
                      <Select 
                        value={reportFilters.partner} 
                        onValueChange={(value) => setReportFilters(prev => ({ ...prev, partner: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Partners</SelectItem>
                          <SelectItem value="premium-travel">Premium Travel Agency</SelectItem>
                          <SelectItem value="elite-events">Elite Events Moscow</SelectItem>
                          <SelectItem value="luxury-concierge">Luxury Concierge</SelectItem>
                          <SelectItem value="marine-services">Marine Services Ltd</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="product">Product</Label>
                      <Select 
                        value={reportFilters.product} 
                        onValueChange={(value) => setReportFilters(prev => ({ ...prev, product: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Products</SelectItem>
                          <SelectItem value="yacht">Yacht Tours</SelectItem>
                          <SelectItem value="helicopter">Helicopter Flights</SelectItem>
                          <SelectItem value="buggy">Buggy Adventures</SelectItem>
                          <SelectItem value="slingshot">Slingshot Rides</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select 
                        value={reportFilters.status} 
                        onValueChange={(value) => setReportFilters(prev => ({ ...prev, status: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center gap-2">
                    <Button>
                      <Search className="h-4 w-4 mr-2" />
                      Apply Filters
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Report Templates */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Monthly P&L Statement", description: "Profit and loss summary", format: "PDF", size: "2.3 MB", icon: BarChart3 },
                  { title: "Revenue Analytics", description: "Detailed revenue breakdown", format: "CSV", size: "1.1 MB", icon: TrendingUp },
                  { title: "Cost Analysis Report", description: "Operating expenses analysis", format: "Excel", size: "3.7 MB", icon: PieChart },
                  { title: "Partner Commission Report", description: "Agent and partner payouts", format: "PDF", size: "1.8 MB", icon: Users },
                  { title: "Tax Preparation Data", description: "Financial data for accounting", format: "CSV", size: "2.1 MB", icon: FileText },
                  { title: "Budget vs Actual", description: "Performance against budget", format: "Excel", size: "2.9 MB", icon: DollarSign }
                ].map((report, index) => (
                  <Card 
                    key={index}
                    style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--gts-portal-card)' }}>
                            <report.icon className="h-5 w-5" style={{ color: 'var(--gts-portal-accent)' }} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                              {report.title}
                            </h4>
                            <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                              {report.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">{report.format}</Badge>
                            <span className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>{report.size}</span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="mt-6">
            <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Accounting Documents</CardTitle>
                    <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                      Invoices, acts, and closing documents management
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b" style={{ borderColor: 'var(--gts-portal-border)' }}>
                        <th className="text-left p-4 font-medium" style={{ color: 'var(--gts-portal-text)' }}>Document</th>
                        <th className="text-left p-4 font-medium" style={{ color: 'var(--gts-portal-text)' }}>Partner</th>
                        <th className="text-right p-4 font-medium" style={{ color: 'var(--gts-portal-text)' }}>Amount</th>
                        <th className="text-left p-4 font-medium" style={{ color: 'var(--gts-portal-text)' }}>Date</th>
                        <th className="text-center p-4 font-medium" style={{ color: 'var(--gts-portal-text)' }}>Status</th>
                        <th className="text-center p-4 font-medium" style={{ color: 'var(--gts-portal-text)' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accountingDocuments.map((doc) => (
                        <tr 
                          key={doc.id} 
                          className="border-b hover:bg-opacity-50" 
                          style={{ borderColor: 'var(--gts-portal-border)' }}
                        >
                          <td className="p-4">
                            <div>
                              <div className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                                {doc.type}
                              </div>
                              <div className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                                {doc.number}
                              </div>
                            </div>
                          </td>
                          <td className="p-4" style={{ color: 'var(--gts-portal-text)' }}>
                            {doc.partner}
                          </td>
                          <td className="p-4 text-right font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                            {formatCurrency(doc.amount)}
                          </td>
                          <td className="p-4" style={{ color: 'var(--gts-portal-text)' }}>
                            <div>
                              <div>{doc.date}</div>
                              <div className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                                Due: {doc.dueDate}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <Badge className={getDocumentStatusColor(doc.status)}>
                              {doc.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1C Integration */}
              <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                <CardHeader>
                  <CardTitle style={{ color: 'var(--gts-portal-text)' }}>1C Integration</CardTitle>
                  <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                    Export financial data to 1C accounting system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--gts-portal-card)' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span style={{ color: 'var(--gts-portal-text)' }}>Connection Status</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">Connected</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Last sync</span>
                      <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>Dec 3, 2024 14:30</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Records synced</span>
                      <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>2,847</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export to 1C
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* МойСклад Integration */}
              <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                <CardHeader>
                  <CardTitle style={{ color: 'var(--gts-portal-text)' }}>МойСклад Integration</CardTitle>
                  <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                    Synchronize with МойСклад inventory management
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--gts-portal-card)' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span style={{ color: 'var(--gts-portal-text)' }}>Connection Status</span>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-400">Setup Required</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>API Status</span>
                      <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>Not configured</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Auto sync</span>
                      <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>Disabled</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Button className="w-full" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Setup Integration
                    </Button>
                    <Button variant="outline" className="w-full" disabled>
                      <Download className="h-4 w-4 mr-2" />
                      Export to МойСклад
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Integration Logs */}
            <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
              <CardHeader>
                <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Integration Logs</CardTitle>
                <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                  Recent integration activity and status updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { time: "14:30", status: "success", message: "1C: Successfully exported 247 financial records", type: "1C Export" },
                    { time: "12:15", status: "info", message: "Automatic backup completed - 2.3GB", type: "System" },
                    { time: "09:45", status: "warning", message: "МойСклад: API rate limit exceeded", type: "МойСклад" },
                    { time: "08:20", status: "success", message: "1C: Data synchronization completed", type: "1C Sync" }
                  ].map((log, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--gts-portal-card)' }}>
                      <div className="flex-shrink-0">
                        {log.status === 'success' && <CheckCircle className="h-4 w-4 text-green-400" />}
                        {log.status === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-400" />}
                        {log.status === 'info' && <Clock className="h-4 w-4 text-blue-400" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>{log.message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{log.type}</Badge>
                          <span className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>{log.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue by Product */}
              <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                <CardHeader>
                  <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Revenue by Product</CardTitle>
                  <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                    Performance breakdown by service type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData.byProduct.map((product, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                            {product.name}
                          </span>
                          <div className="text-right">
                            <span className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                              {formatCurrency(product.revenue)}
                            </span>
                            <div className="flex items-center gap-1">
                              {product.growth >= 0 ? 
                                <TrendingUp className="h-3 w-3 text-green-400" /> :
                                <TrendingDown className="h-3 w-3 text-red-400" />
                              }
                              <span className={`text-xs ${product.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {product.growth > 0 ? '+' : ''}{product.growth}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={(product.revenue / revenueData.total) * 100} className="flex-1 h-2" />
                          <span className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                            {product.margin}% margin
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue by Channel */}
              <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                <CardHeader>
                  <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Revenue by Channel</CardTitle>
                  <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                    Distribution across sales channels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData.byChannel.map((channel, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                            {channel.name}
                          </span>
                          <div className="text-right">
                            <span className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                              {formatCurrency(channel.revenue)}
                            </span>
                            <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                              {channel.percentage}%
                            </p>
                          </div>
                        </div>
                        <Progress value={channel.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Cost Breakdown */}
              <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                <CardHeader>
                  <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Cost Breakdown</CardTitle>
                  <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                    Operational expenses by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {costsData.breakdown.map((cost, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                            {cost.category}
                          </span>
                          <div className="text-right">
                            <span className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                              {formatCurrency(cost.amount)}
                            </span>
                            <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                              {cost.percentage}%
                            </p>
                          </div>
                        </div>
                        <Progress value={cost.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Margin Analysis */}
              <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                <CardHeader>
                  <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Margin Analysis</CardTitle>
                  <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                    Profitability metrics and trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-6 rounded-lg" style={{ backgroundColor: 'var(--gts-portal-card)' }}>
                      <div className="text-4xl font-heading mb-2" style={{ color: 'var(--gts-portal-text)' }}>
                        {costsData.margin.toFixed(1)}%
                      </div>
                      <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Net Profit Margin</p>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-green-400">+3.2% vs last month</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--gts-portal-card)' }}>
                        <div className="text-xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                          {formatCurrency(revenueData.total - costsData.total)}
                        </div>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Net Profit</p>
                      </div>
                      <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--gts-portal-card)' }}>
                        <div className="text-xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                          {((revenueData.total - costsData.total) / revenueData.byProduct.length / 1000).toFixed(0)}K
                        </div>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Avg per Product</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}