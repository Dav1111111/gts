import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Checkbox } from "./ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner@2.0.3";
import { 
  Home, 
  Users, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  ChevronDown,
  ChevronRight,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Star,
  TrendingUp,
  TrendingDown,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  Menu,
  User,
  LogOut,
  HelpCircle,
  ArrowRight,
  MoreHorizontal,
  RefreshCw
} from "lucide-react";

const GTSUILibrary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Demo data
  const tableData = [
    { id: 1, partner: "Marina Yacht Club", status: "active", revenue: "125,000₽", bookings: 45, tier: "platinum" },
    { id: 2, partner: "Adventure Tours LLC", status: "pending", revenue: "89,500₽", bookings: 32, tier: "gold" },
    { id: 3, partner: "Elite Helicopter", status: "active", revenue: "234,000₽", bookings: 67, tier: "platinum" },
    { id: 4, partner: "Mountain Buggies", status: "inactive", revenue: "45,200₽", bookings: 18, tier: "silver" },
  ];

  const showToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    switch (type) {
      case 'success':
        toast.success("Success! Action completed successfully.");
        break;
      case 'error':
        toast.error("Error! Something went wrong.");
        break;
      case 'warning':
        toast.warning("Warning! Please check your input.");
        break;
      case 'info':
        toast.info("Info: New notification received.");
        break;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0B0B0C', color: '#FFFFFF' }}>
      
      {/* Page Header */}
      <div className="p-8 border-b" style={{ borderColor: '#232428' }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
            GTS Partner Portal UI Library
          </h1>
          <p className="text-base" style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>
            Comprehensive component library for the GTS Partner Portal - Dark, Premium, Minimal
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8 space-y-12">

        {/* Color Palette */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
            Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div className="space-y-2">
              <div className="w-full h-16 rounded-lg" style={{ backgroundColor: '#0B0B0C' }}></div>
              <div className="text-xs" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                <p className="font-medium">Background</p>
                <p style={{ color: '#A6A7AA' }}>#0B0B0C</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 rounded-lg" style={{ backgroundColor: '#121214' }}></div>
              <div className="text-xs" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                <p className="font-medium">Surface</p>
                <p style={{ color: '#A6A7AA' }}>#121214</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 rounded-lg" style={{ backgroundColor: '#17181A' }}></div>
              <div className="text-xs" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                <p className="font-medium">Card</p>
                <p style={{ color: '#A6A7AA' }}>#17181A</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 rounded-lg" style={{ backgroundColor: '#A6A7AA' }}></div>
              <div className="text-xs" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                <p className="font-medium">Muted</p>
                <p style={{ color: '#A6A7AA' }}>#A6A7AA</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 rounded-lg" style={{ backgroundColor: '#91040C' }}></div>
              <div className="text-xs" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                <p className="font-medium">Accent</p>
                <p style={{ color: '#A6A7AA' }}>#91040C</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 rounded-lg" style={{ backgroundColor: '#2BB673' }}></div>
              <div className="text-xs" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                <p className="font-medium">Success</p>
                <p style={{ color: '#A6A7AA' }}>#2BB673</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 rounded-lg" style={{ backgroundColor: '#F5A623' }}></div>
              <div className="text-xs" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                <p className="font-medium">Warning</p>
                <p style={{ color: '#A6A7AA' }}>#F5A623</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 rounded-lg" style={{ backgroundColor: '#E5484D' }}></div>
              <div className="text-xs" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                <p className="font-medium">Error</p>
                <p style={{ color: '#A6A7AA' }}>#E5484D</p>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
            Typography
          </h2>
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
                H1 Heading - Nokia.Kokia Bold
              </h1>
              <p className="text-sm" style={{ color: '#A6A7AA' }}>32px / Bold / Nokia.Kokia</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
                H2 Heading - Nokia.Kokia Bold  
              </h2>
              <p className="text-sm" style={{ color: '#A6A7AA' }}>24px / Bold / Nokia.Kokia</p>
            </div>
            <div>
              <p className="text-base mb-2" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                Body Text - Gilroy Regular. This is the primary text used throughout the interface for content, descriptions, and general reading.
              </p>
              <p className="text-sm" style={{ color: '#A6A7AA' }}>16px / Regular / Gilroy</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-2" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                UI Text Medium - Gilroy Medium for labels, buttons, and interface elements.
              </p>
              <p className="text-sm" style={{ color: '#A6A7AA' }}>14px / Medium / Gilroy</p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
            Buttons
          </h2>
          <div className="space-y-8">
            
            {/* Primary Buttons */}
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>Primary</h3>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="font-medium rounded-xl px-6"
                  style={{ 
                    backgroundColor: '#91040C', 
                    fontFamily: 'Gilroy, Inter, sans-serif',
                    border: 'none'
                  }}
                >
                  Default
                </Button>
                <Button 
                  className="font-medium rounded-xl px-6"
                  style={{ 
                    backgroundColor: '#B8050E', 
                    fontFamily: 'Gilroy, Inter, sans-serif',
                    border: 'none'
                  }}
                >
                  Hover
                </Button>
                <Button 
                  className="font-medium rounded-xl px-6"
                  style={{ 
                    backgroundColor: '#7A0309', 
                    fontFamily: 'Gilroy, Inter, sans-serif',
                    border: 'none'
                  }}
                >
                  Pressed
                </Button>
                <Button 
                  disabled
                  className="font-medium rounded-xl px-6"
                  style={{ 
                    backgroundColor: '#333333', 
                    color: '#666666',
                    fontFamily: 'Gilroy, Inter, sans-serif',
                    border: 'none'
                  }}
                >
                  Disabled
                </Button>
                <Button 
                  disabled
                  className="font-medium rounded-xl px-6"
                  style={{ 
                    backgroundColor: '#91040C', 
                    fontFamily: 'Gilroy, Inter, sans-serif',
                    border: 'none'
                  }}
                >
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Loading
                </Button>
              </div>
            </div>

            {/* Secondary Buttons */}
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>Secondary</h3>
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="outline"
                  className="font-medium rounded-xl px-6"
                  style={{ 
                    backgroundColor: '#121214',
                    borderColor: '#232428',
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Default
                </Button>
                <Button 
                  variant="outline"
                  className="font-medium rounded-xl px-6"
                  style={{ 
                    backgroundColor: '#1A1A1C',
                    borderColor: '#232428',
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Hover
                </Button>
                <Button 
                  variant="outline"
                  className="font-medium rounded-xl px-6"
                  style={{ 
                    backgroundColor: '#0F0F10',
                    borderColor: '#232428',
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Pressed
                </Button>
              </div>
            </div>

            {/* Tertiary Buttons */}
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>Tertiary</h3>
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="ghost"
                  className="font-medium rounded-xl px-6"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Default
                </Button>
                <Button 
                  variant="ghost"
                  className="font-medium rounded-xl px-6"
                  style={{ 
                    backgroundColor: '#1A1A1C',
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Hover
                </Button>
              </div>
            </div>

            {/* Destructive Buttons */}
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>Destructive</h3>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="font-medium rounded-xl px-6"
                  style={{ 
                    backgroundColor: '#E5484D',
                    fontFamily: 'Gilroy, Inter, sans-serif',
                    border: 'none'
                  }}
                >
                  Delete
                </Button>
                <Button 
                  variant="outline"
                  className="font-medium rounded-xl px-6"
                  style={{ 
                    borderColor: '#E5484D',
                    color: '#E5484D',
                    backgroundColor: 'transparent',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Inputs */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
            Input Fields
          </h2>
          <div className="space-y-8">
            
            {/* Text Inputs */}
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>Text Input</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                    Default State
                  </label>
                  <Input 
                    placeholder="Enter text here..."
                    className="rounded-xl"
                    style={{ 
                      backgroundColor: '#121214',
                      borderColor: '#232428',
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                    With Icon
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#A6A7AA' }} />
                    <Input 
                      placeholder="Search..."
                      className="pl-10 rounded-xl"
                      style={{ 
                        backgroundColor: '#121214',
                        borderColor: '#232428',
                        color: '#FFFFFF',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                    Focus State
                  </label>
                  <Input 
                    placeholder="Focused input"
                    className="rounded-xl ring-2"
                    style={{ 
                      backgroundColor: '#121214',
                      borderColor: '#91040C',
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif',
                      boxShadow: '0 0 0 2px rgba(145, 4, 12, 0.2)'
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                    Error State
                  </label>
                  <Input 
                    placeholder="Invalid input"
                    className="rounded-xl"
                    style={{ 
                      backgroundColor: '#121214',
                      borderColor: '#E5484D',
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  />
                  <p className="text-xs" style={{ color: '#E5484D' }}>This field is required</p>
                </div>
              </div>
            </div>

            {/* Textarea */}
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>Textarea</h3>
              <div className="max-w-md">
                <Textarea 
                  placeholder="Enter a longer description..."
                  className="rounded-xl min-h-[120px]"
                  style={{ 
                    backgroundColor: '#121214',
                    borderColor: '#232428',
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                />
              </div>
            </div>

            {/* Select */}
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>Select</h3>
              <div className="max-w-md">
                <Select>
                  <SelectTrigger 
                    className="rounded-xl"
                    style={{ 
                      backgroundColor: '#121214',
                      borderColor: '#232428',
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent 
                    style={{ 
                      backgroundColor: '#17181A',
                      borderColor: '#232428',
                      color: '#FFFFFF'
                    }}
                  >
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
            Navigation
          </h2>
          
          {/* Top Bar */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>Top Bar</h3>
              <Card 
                className="p-4 rounded-2xl"
                style={{ backgroundColor: '#121214', borderColor: '#232428' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: '#91040C' }}></div>
                      <span className="font-bold text-lg" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
                        GTS Portal
                      </span>
                    </div>
                    <Select>
                      <SelectTrigger 
                        className="w-40 rounded-lg border-0"
                        style={{ 
                          backgroundColor: '#17181A',
                          color: '#FFFFFF',
                          fontFamily: 'Gilroy, Inter, sans-serif'
                        }}
                      >
                        <SelectValue placeholder="Partner Role" />
                      </SelectTrigger>
                      <SelectContent style={{ backgroundColor: '#17181A', borderColor: '#232428' }}>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-lg relative"
                      style={{ color: '#A6A7AA' }}
                    >
                      <Bell className="w-5 h-5" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ backgroundColor: '#91040C' }}></div>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-lg"
                      style={{ color: '#A6A7AA' }}
                    >
                      <User className="w-5 h-5 mr-2" />
                      John Doe
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Left Sidebar */}
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>Left Sidebar</h3>
              <Card 
                className="p-4 rounded-2xl w-64"
                style={{ backgroundColor: '#121214', borderColor: '#232428' }}
              >
                <div className="space-y-2">
                  <div 
                    className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer"
                    style={{ backgroundColor: '#91040C' }}
                  >
                    <Home className="w-5 h-5" />
                    <span className="font-medium" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>Dashboard</span>
                  </div>
                  <div 
                    className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-800"
                    style={{ color: '#A6A7AA' }}
                  >
                    <Users className="w-5 h-5" />
                    <span className="font-medium" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>Partners</span>
                  </div>
                  <div 
                    className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-800"
                    style={{ color: '#A6A7AA' }}
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span className="font-medium" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>Analytics</span>
                  </div>
                  <div 
                    className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-800"
                    style={{ color: '#A6A7AA' }}
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>Settings</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Breadcrumbs */}
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>Breadcrumbs</h3>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink 
                      href="#" 
                      className="text-base"
                      style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}
                    >
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator style={{ color: '#A6A7AA' }} />
                  <BreadcrumbItem>
                    <BreadcrumbLink 
                      href="#"
                      className="text-base"
                      style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}
                    >
                      Partners
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator style={{ color: '#A6A7AA' }} />
                  <BreadcrumbItem>
                    <BreadcrumbPage 
                      className="text-base"
                      style={{ color: '#FFFFFF', fontFamily: 'Gilroy, Inter, sans-serif' }}
                    >
                      Partner Details
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
            Cards
          </h2>
          <div className="space-y-8">
            
            {/* Base Card */}
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>Base Card</h3>
              <Card 
                className="p-6 max-w-md rounded-2xl"
                style={{ backgroundColor: '#17181A', borderColor: '#232428' }}
              >
                <h4 className="text-lg font-medium mb-2" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
                  Card Title
                </h4>
                <p className="text-sm mb-4" style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  This is a basic card component with some content and actions.
                </p>
                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    className="rounded-lg"
                    style={{ backgroundColor: '#91040C', fontFamily: 'Gilroy, Inter, sans-serif' }}
                  >
                    Primary Action
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="rounded-lg"
                    style={{ borderColor: '#232428', fontFamily: 'Gilroy, Inter, sans-serif' }}
                  >
                    Secondary
                  </Button>
                </div>
              </Card>
            </div>

            {/* KPI Cards */}
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>KPI Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
                <Card 
                  className="p-6 rounded-2xl"
                  style={{ backgroundColor: '#17181A', borderColor: '#232428' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium" style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                      Total Revenue
                    </h4>
                    <TrendingUp className="w-4 h-4" style={{ color: '#2BB673' }} />
                  </div>
                  <div className="text-2xl font-bold mb-1" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
                    ₽2.4M
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium mr-1" style={{ color: '#2BB673', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                      +12.5%
                    </span>
                    <span style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>vs last month</span>
                  </div>
                </Card>

                <Card 
                  className="p-6 rounded-2xl"
                  style={{ backgroundColor: '#17181A', borderColor: '#232428' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium" style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                      Active Partners
                    </h4>
                    <Users className="w-4 h-4" style={{ color: '#F5A623' }} />
                  </div>
                  <div className="text-2xl font-bold mb-1" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
                    47
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium mr-1" style={{ color: '#2BB673', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                      +3
                    </span>
                    <span style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>new this week</span>
                  </div>
                </Card>

                <Card 
                  className="p-6 rounded-2xl"
                  style={{ backgroundColor: '#17181A', borderColor: '#232428' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium" style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                      Conversion Rate
                    </h4>
                    <TrendingDown className="w-4 h-4" style={{ color: '#E5484D' }} />
                  </div>
                  <div className="text-2xl font-bold mb-1" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
                    68.4%
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium mr-1" style={{ color: '#E5484D', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                      -2.1%
                    </span>
                    <span style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>vs last week</span>
                  </div>
                </Card>
              </div>
            </div>

            {/* Table Card */}
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>Table Card</h3>
              <Card 
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: '#17181A', borderColor: '#232428' }}
              >
                <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#232428' }}>
                  <h4 className="text-lg font-medium" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
                    Partner Overview
                  </h4>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="rounded-lg"
                      style={{ borderColor: '#232428', fontFamily: 'Gilroy, Inter, sans-serif' }}
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="rounded-lg"
                      style={{ borderColor: '#232428', fontFamily: 'Gilroy, Inter, sans-serif' }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow style={{ borderColor: '#232428' }}>
                      <TableHead 
                        className="font-medium"
                        style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}
                      >
                        Partner
                      </TableHead>
                      <TableHead 
                        className="font-medium"
                        style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}
                      >
                        Status
                      </TableHead>
                      <TableHead 
                        className="font-medium"
                        style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}
                      >
                        Revenue
                      </TableHead>
                      <TableHead 
                        className="font-medium"
                        style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}
                      >
                        Bookings
                      </TableHead>
                      <TableHead 
                        className="font-medium"
                        style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}
                      >
                        Tier
                      </TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((row, index) => (
                      <TableRow 
                        key={row.id} 
                        className={index % 2 === 0 ? '' : ''}
                        style={{ 
                          borderColor: '#232428',
                          backgroundColor: index % 2 === 0 ? 'transparent' : '#121214'
                        }}
                      >
                        <TableCell 
                          className="font-medium"
                          style={{ color: '#FFFFFF', fontFamily: 'Gilroy, Inter, sans-serif' }}
                        >
                          {row.partner}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={`text-xs rounded-lg ${
                              row.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                              row.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                              'bg-gray-500/20 text-gray-400 border-gray-500/30'
                            }`}
                            style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}
                          >
                            {row.status}
                          </Badge>
                        </TableCell>
                        <TableCell 
                          className="font-medium"
                          style={{ color: '#FFFFFF', fontFamily: 'Gilroy, Inter, sans-serif' }}
                        >
                          {row.revenue}
                        </TableCell>
                        <TableCell style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                          {row.bookings}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={`text-xs rounded-lg ${
                              row.tier === 'platinum' ? 'bg-gray-500/20 text-gray-300 border-gray-500/30' :
                              row.tier === 'gold' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                              'bg-slate-500/20 text-slate-300 border-slate-500/30'
                            }`}
                            style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}
                          >
                            {row.tier}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" style={{ color: '#A6A7AA' }} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
            Badges
          </h2>
          <div className="space-y-6">
            
            {/* Status Badges */}
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>Status</h3>
              <div className="flex flex-wrap gap-3">
                <Badge className="text-xs rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  New
                </Badge>
                <Badge className="text-xs rounded-lg bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  Pending
                </Badge>
                <Badge className="text-xs rounded-lg bg-green-500/20 text-green-400 border border-green-500/30" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  Confirmed
                </Badge>
                <Badge className="text-xs rounded-lg bg-red-500/20 text-red-400 border border-red-500/30" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  Cancelled
                </Badge>
                <Badge className="text-xs rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  Paid
                </Badge>
                <Badge className="text-xs rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  Overdue
                </Badge>
              </div>
            </div>

            {/* Role Badges */}
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>Role</h3>
              <div className="flex flex-wrap gap-3">
                <Badge className="text-xs rounded-lg" style={{ backgroundColor: '#91040C', color: '#FFFFFF', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  Admin
                </Badge>
                <Badge className="text-xs rounded-lg bg-slate-500/20 text-slate-300 border border-slate-500/30" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  Manager
                </Badge>
                <Badge className="text-xs rounded-lg bg-gray-500/20 text-gray-400 border border-gray-500/30" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  Staff
                </Badge>
                <Badge className="text-xs rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  Partner
                </Badge>
              </div>
            </div>

            {/* Tier Badges */}
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>Tier</h3>
              <div className="flex flex-wrap gap-3">
                <Badge className="text-xs rounded-lg bg-amber-600/20 text-amber-400 border border-amber-600/30" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  Bronze
                </Badge>
                <Badge className="text-xs rounded-lg bg-slate-400/20 text-slate-300 border border-slate-400/30" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  Silver
                </Badge>
                <Badge className="text-xs rounded-lg bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  Gold
                </Badge>
                <Badge className="text-xs rounded-lg bg-gray-400/20 text-gray-300 border border-gray-400/30" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  Platinum
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* States */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
            States
          </h2>
          <div className="space-y-8">
            
            {/* Loading States */}
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>Loading</h3>
              <Card 
                className="p-6 rounded-2xl max-w-md"
                style={{ backgroundColor: '#17181A', borderColor: '#232428' }}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#91040C' }} />
                    <span style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>Loading data...</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 rounded animate-pulse" style={{ backgroundColor: '#232428' }}></div>
                    <div className="h-4 rounded animate-pulse w-2/3" style={{ backgroundColor: '#232428' }}></div>
                    <div className="h-4 rounded animate-pulse w-1/2" style={{ backgroundColor: '#232428' }}></div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Empty States */}
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>Empty State</h3>
              <Card 
                className="p-8 rounded-2xl max-w-md text-center"
                style={{ backgroundColor: '#17181A', borderColor: '#232428' }}
              >
                <div className="w-12 h-12 rounded-full mx-auto mb-4" style={{ backgroundColor: '#232428' }}>
                  <Users className="w-6 h-6 m-3" style={{ color: '#A6A7AA' }} />
                </div>
                <h4 className="text-lg font-medium mb-2" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
                  No partners yet
                </h4>
                <p className="text-sm mb-4" style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  Get started by adding your first partner to the system.
                </p>
                <Button 
                  className="rounded-lg"
                  style={{ backgroundColor: '#91040C', fontFamily: 'Gilroy, Inter, sans-serif' }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Partner
                </Button>
              </Card>
            </div>

            {/* Error States */}
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>Error State</h3>
              <Card 
                className="p-6 rounded-2xl max-w-md"
                style={{ backgroundColor: '#17181A', borderColor: '#232428' }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <XCircle className="w-5 h-5" style={{ color: '#E5484D' }} />
                  <h4 className="font-medium" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
                    Failed to load data
                  </h4>
                </div>
                <p className="text-sm mb-4" style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  We couldn't load the partner information. Please check your connection and try again.
                </p>
                <Button 
                  variant="outline" 
                  className="rounded-lg"
                  style={{ borderColor: '#232428', fontFamily: 'Gilroy, Inter, sans-serif' }}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Toasts */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
            Toast Notifications
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => showToast('success')}
              className="rounded-lg"
              style={{ backgroundColor: '#2BB673', fontFamily: 'Gilroy, Inter, sans-serif' }}
            >
              Show Success Toast
            </Button>
            <Button 
              onClick={() => showToast('error')}
              className="rounded-lg"
              style={{ backgroundColor: '#E5484D', fontFamily: 'Gilroy, Inter, sans-serif' }}
            >
              Show Error Toast
            </Button>
            <Button 
              onClick={() => showToast('warning')}
              className="rounded-lg"
              style={{ backgroundColor: '#F5A623', fontFamily: 'Gilroy, Inter, sans-serif' }}
            >
              Show Warning Toast
            </Button>
            <Button 
              onClick={() => showToast('info')}
              className="rounded-lg"
              style={{ backgroundColor: '#91040C', fontFamily: 'Gilroy, Inter, sans-serif' }}
            >
              Show Info Toast
            </Button>
          </div>
        </section>

        {/* Charts Placeholder */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
            Chart Placeholders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              className="p-6 rounded-2xl"
              style={{ backgroundColor: '#17181A', borderColor: '#232428' }}
            >
              <h4 className="text-lg font-medium mb-4" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
                Revenue Trend (Area Chart)
              </h4>
              <div 
                className="h-48 rounded-lg border-2 border-dashed flex items-center justify-center"
                style={{ borderColor: '#232428' }}
              >
                <div className="text-center">
                  <BarChart3 className="w-8 h-8 mx-auto mb-2" style={{ color: '#A6A7AA' }} />
                  <p className="text-sm" style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                    Area Chart Placeholder
                  </p>
                </div>
              </div>
            </Card>
            
            <Card 
              className="p-6 rounded-2xl"
              style={{ backgroundColor: '#17181A', borderColor: '#232428' }}
            >
              <h4 className="text-lg font-medium mb-4" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
                Partner Distribution (Donut Chart)
              </h4>
              <div 
                className="h-48 rounded-lg border-2 border-dashed flex items-center justify-center"
                style={{ borderColor: '#232428' }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full border-4 border-dashed mx-auto mb-2" style={{ borderColor: '#A6A7AA' }}></div>
                  <p className="text-sm" style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                    Donut Chart Placeholder
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Modal Example */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
            Modal/Dialog
          </h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="rounded-lg"
                style={{ backgroundColor: '#91040C', fontFamily: 'Gilroy, Inter, sans-serif' }}
              >
                Open Modal
              </Button>
            </DialogTrigger>
            <DialogContent 
              className="rounded-2xl max-w-md"
              style={{ backgroundColor: '#17181A', borderColor: '#232428', color: '#FFFFFF' }}
            >
              <DialogHeader>
                <DialogTitle 
                  className="text-lg"
                  style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}
                >
                  Confirm Action
                </DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  Are you sure you want to proceed with this action? This cannot be undone.
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  className="rounded-lg"
                  style={{ borderColor: '#232428', fontFamily: 'Gilroy, Inter, sans-serif' }}
                >
                  Cancel
                </Button>
                <Button 
                  className="rounded-lg"
                  style={{ backgroundColor: '#91040C', fontFamily: 'Gilroy, Inter, sans-serif' }}
                >
                  Confirm
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </section>

        {/* Components & Controls */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Nokia.Kokia, Inter, sans-serif' }}>
            Form Controls
          </h2>
          <div className="space-y-6 max-w-md">
            
            {/* Switch */}
            <div className="flex items-center justify-between">
              <label className="font-medium" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                Enable notifications
              </label>
              <Switch />
            </div>

            {/* Checkbox */}
            <div className="flex items-center space-x-3">
              <Checkbox id="terms" />
              <label 
                htmlFor="terms" 
                className="text-sm"
                style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}
              >
                I agree to the terms and conditions
              </label>
            </div>

            {/* Progress */}
            <div>
              <div className="flex justify-between text-sm mb-2" style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                <span>Progress</span>
                <span style={{ color: '#A6A7AA' }}>68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-12 border-t" style={{ borderColor: '#232428' }}>
          <div className="text-center">
            <p style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>
              GTS Partner Portal UI Library v1.0 - Premium Dark Theme
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GTSUILibrary;