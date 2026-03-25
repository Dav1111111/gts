import { useState } from "react";
import { 
  Link, 
  QrCode, 
  Settings, 
  Download, 
  Copy, 
  Eye, 
  Plus,
  FileImage,
  Palette,
  MessageSquare,
  ExternalLink
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";

interface PromoLink {
  id: string;
  name: string;
  url: string;
  campaign: string;
  clicks: number;
  conversions: number;
  created: string;
}

const mockPromoLinks: PromoLink[] = [
  {
    id: "PL-001",
    name: "Summer Yacht Promo",
    url: "https://gts-sochi.ru/?ref=agent001&utm_source=social&utm_campaign=summer2024",
    campaign: "Summer 2024",
    clicks: 1247,
    conversions: 89,
    created: "2024-01-15"
  },
  {
    id: "PL-002", 
    name: "Helicopter Experience",
    url: "https://gts-sochi.ru/helicopter?ref=agent001&utm_source=instagram&utm_campaign=luxury",
    campaign: "Luxury Package",
    clicks: 856,
    conversions: 34,
    created: "2024-02-01"
  },
  {
    id: "PL-003",
    name: "Adventure Weekend",
    url: "https://gts-sochi.ru/buggy?ref=agent001&utm_source=telegram&utm_campaign=adventure",
    campaign: "Adventure Series",
    clicks: 634,
    conversions: 67,
    created: "2024-02-10"
  }
];

const mediaKitItems = [
  {
    title: "GTS Logo Pack",
    description: "High-resolution logos in various formats",
    type: "logo",
    formats: ["PNG", "SVG", "EPS"],
    size: "2.1 MB"
  },
  {
    title: "Brand Guidelines",
    description: "Complete brand identity guide and usage rules",
    type: "guide",
    formats: ["PDF"],
    size: "8.5 MB"
  },
  {
    title: "Social Media Banners",
    description: "Ready-to-use banners for social platforms",
    type: "banners",
    formats: ["PNG", "JPG"],
    size: "15.3 MB"
  },
  {
    title: "Fleet Photography",
    description: "Professional photos of all vehicles",
    type: "photos",
    formats: ["JPG", "RAW"],
    size: "127.8 MB"
  }
];

export function GTSPartnerAgentPromoTools() {
  const [linkGeneratorOpen, setLinkGeneratorOpen] = useState(false);
  const [qrGeneratorOpen, setQrGeneratorOpen] = useState(false);
  const [utmBuilderOpen, setUtmBuilderOpen] = useState(false);
  const [specialPromoOpen, setSpecialPromoOpen] = useState(false);
  
  const [linkName, setLinkName] = useState("");
  const [linkDescription, setLinkDescription] = useState("");
  const [utmSource, setUtmSource] = useState("");
  const [utmMedium, setUtmMedium] = useState("");
  const [utmCampaign, setUtmCampaign] = useState("");
  const [promoRequest, setPromoRequest] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const generateQR = (url: string) => {
    // In a real implementation, this would generate a QR code
    console.log("Generating QR for:", url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 
          className="text-2xl font-bold"
          style={{ 
            color: 'var(--gts-portal-text)',
            fontFamily: 'var(--font-heading)'
          }}
        >
          Promo Tools
        </h1>
        <p 
          className="mt-2"
          style={{ color: 'var(--gts-portal-muted)' }}
        >
          Generate promotional materials and track your marketing campaigns
        </p>
      </div>

      {/* Quick Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Partner Link Generator */}
        <Dialog open={linkGeneratorOpen} onOpenChange={setLinkGeneratorOpen}>
          <DialogTrigger asChild>
            <Card 
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
              style={{ 
                backgroundColor: 'var(--gts-portal-card)',
                borderColor: 'var(--gts-portal-border)'
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: 'var(--gts-portal-accent)20' }}
                >
                  <Link 
                    className="w-6 h-6" 
                    style={{ color: 'var(--gts-portal-accent)' }}
                  />
                </div>
                <div>
                  <h3 
                    className="font-semibold"
                    style={{ color: 'var(--gts-portal-text)' }}
                  >
                    Partner Link
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--gts-portal-muted)' }}
                  >
                    Generate trackable links
                  </p>
                </div>
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent 
            style={{ 
              backgroundColor: 'var(--gts-portal-surface)',
              borderColor: 'var(--gts-portal-border)'
            }}
          >
            <DialogHeader>
              <DialogTitle style={{ color: 'var(--gts-portal-text)' }}>
                Generate Partner Link
              </DialogTitle>
              <DialogDescription style={{ color: 'var(--gts-portal-muted)' }}>
                Create a trackable promotional link with your partner code
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label style={{ color: 'var(--gts-portal-text)' }}>Link Name</Label>
                <Input
                  placeholder="Enter link name"
                  value={linkName}
                  onChange={(e) => setLinkName(e.target.value)}
                  style={{
                    backgroundColor: 'var(--gts-portal-surface)',
                    borderColor: 'var(--gts-portal-border)',
                    color: 'var(--gts-portal-text)'
                  }}
                />
              </div>
              <div>
                <Label style={{ color: 'var(--gts-portal-text)' }}>Description</Label>
                <Textarea
                  placeholder="Optional description"
                  value={linkDescription}
                  onChange={(e) => setLinkDescription(e.target.value)}
                  style={{
                    backgroundColor: 'var(--gts-portal-surface)',
                    borderColor: 'var(--gts-portal-border)',
                    color: 'var(--gts-portal-text)'
                  }}
                />
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <p 
                  className="text-sm font-mono"
                  style={{ color: 'var(--gts-portal-text)' }}
                >
                  https://gts-sochi.ru/?ref=agent001
                </p>
              </div>
              <Button 
                className="w-full"
                style={{
                  backgroundColor: 'var(--gts-portal-accent)',
                  color: 'white'
                }}
                onClick={() => setLinkGeneratorOpen(false)}
              >
                Generate Link
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* QR Generator */}
        <Dialog open={qrGeneratorOpen} onOpenChange={setQrGeneratorOpen}>
          <DialogTrigger asChild>
            <Card 
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
              style={{ 
                backgroundColor: 'var(--gts-portal-card)',
                borderColor: 'var(--gts-portal-border)'
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: 'var(--gts-portal-success)20' }}
                >
                  <QrCode 
                    className="w-6 h-6" 
                    style={{ color: 'var(--gts-portal-success)' }}
                  />
                </div>
                <div>
                  <h3 
                    className="font-semibold"
                    style={{ color: 'var(--gts-portal-text)' }}
                  >
                    QR Generator
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--gts-portal-muted)' }}
                  >
                    Create QR codes
                  </p>
                </div>
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent 
            style={{ 
              backgroundColor: 'var(--gts-portal-surface)',
              borderColor: 'var(--gts-portal-border)'
            }}
          >
            <DialogHeader>
              <DialogTitle style={{ color: 'var(--gts-portal-text)' }}>
                Generate QR Code
              </DialogTitle>
              <DialogDescription style={{ color: 'var(--gts-portal-muted)' }}>
                Create a QR code for any of your promotional links
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label style={{ color: 'var(--gts-portal-text)' }}>Select Link</Label>
                <Select>
                  <SelectTrigger 
                    style={{
                      backgroundColor: 'var(--gts-portal-surface)',
                      borderColor: 'var(--gts-portal-border)',
                      color: 'var(--gts-portal-text)'
                    }}
                  >
                    <SelectValue placeholder="Select a promotional link" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPromoLinks.map((link) => (
                      <SelectItem key={link.id} value={link.id}>
                        {link.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <QrCode 
                  className="w-16 h-16 mx-auto mb-4"
                  style={{ color: 'var(--gts-portal-muted)' }}
                />
                <p 
                  className="text-sm"
                  style={{ color: 'var(--gts-portal-muted)' }}
                >
                  QR code will appear here
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                  variant="outline"
                  style={{
                    borderColor: 'var(--gts-portal-border)',
                    color: 'var(--gts-portal-text)'
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  PNG
                </Button>
                <Button 
                  className="flex-1"
                  variant="outline"
                  style={{
                    borderColor: 'var(--gts-portal-border)',
                    color: 'var(--gts-portal-text)'
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  SVG
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* UTM Builder */}
        <Dialog open={utmBuilderOpen} onOpenChange={setUtmBuilderOpen}>
          <DialogTrigger asChild>
            <Card 
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
              style={{ 
                backgroundColor: 'var(--gts-portal-card)',
                borderColor: 'var(--gts-portal-border)'
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: 'var(--gts-portal-warning)20' }}
                >
                  <Settings 
                    className="w-6 h-6" 
                    style={{ color: 'var(--gts-portal-warning)' }}
                  />
                </div>
                <div>
                  <h3 
                    className="font-semibold"
                    style={{ color: 'var(--gts-portal-text)' }}
                  >
                    UTM Builder
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--gts-portal-muted)' }}
                  >
                    Build campaign URLs
                  </p>
                </div>
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent 
            style={{ 
              backgroundColor: 'var(--gts-portal-surface)',
              borderColor: 'var(--gts-portal-border)'
            }}
          >
            <DialogHeader>
              <DialogTitle style={{ color: 'var(--gts-portal-text)' }}>
                UTM Builder
              </DialogTitle>
              <DialogDescription style={{ color: 'var(--gts-portal-muted)' }}>
                Build campaign URLs with UTM parameters for tracking
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label style={{ color: 'var(--gts-portal-text)' }}>UTM Source</Label>
                <Input
                  placeholder="e.g. instagram, telegram, email"
                  value={utmSource}
                  onChange={(e) => setUtmSource(e.target.value)}
                  style={{
                    backgroundColor: 'var(--gts-portal-surface)',
                    borderColor: 'var(--gts-portal-border)',
                    color: 'var(--gts-portal-text)'
                  }}
                />
              </div>
              <div>
                <Label style={{ color: 'var(--gts-portal-text)' }}>UTM Medium</Label>
                <Input
                  placeholder="e.g. social, email, cpc"
                  value={utmMedium}
                  onChange={(e) => setUtmMedium(e.target.value)}
                  style={{
                    backgroundColor: 'var(--gts-portal-surface)',
                    borderColor: 'var(--gts-portal-border)',
                    color: 'var(--gts-portal-text)'
                  }}
                />
              </div>
              <div>
                <Label style={{ color: 'var(--gts-portal-text)' }}>UTM Campaign</Label>
                <Input
                  placeholder="e.g. summer2024, luxury_promo"
                  value={utmCampaign}
                  onChange={(e) => setUtmCampaign(e.target.value)}
                  style={{
                    backgroundColor: 'var(--gts-portal-surface)',
                    borderColor: 'var(--gts-portal-border)',
                    color: 'var(--gts-portal-text)'
                  }}
                />
              </div>
              <div>
                <Label style={{ color: 'var(--gts-portal-text)' }}>Preview</Label>
                <div 
                  className="p-3 rounded-lg bg-gray-100 text-sm font-mono break-all"
                  style={{ color: 'var(--gts-portal-text)' }}
                >
                  https://gts-sochi.ru/?ref=agent001
                  {utmSource && `&utm_source=${utmSource}`}
                  {utmMedium && `&utm_medium=${utmMedium}`}
                  {utmCampaign && `&utm_campaign=${utmCampaign}`}
                </div>
              </div>
              <Button 
                className="w-full"
                style={{
                  backgroundColor: 'var(--gts-portal-accent)',
                  color: 'white'
                }}
                onClick={() => setUtmBuilderOpen(false)}
              >
                Generate UTM Link
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Special Promo Request */}
        <Dialog open={specialPromoOpen} onOpenChange={setSpecialPromoOpen}>
          <DialogTrigger asChild>
            <Card 
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
              style={{ 
                backgroundColor: 'var(--gts-portal-card)',
                borderColor: 'var(--gts-portal-border)'
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: 'var(--gts-portal-muted)20' }}
                >
                  <MessageSquare 
                    className="w-6 h-6" 
                    style={{ color: 'var(--gts-portal-muted)' }}
                  />
                </div>
                <div>
                  <h3 
                    className="font-semibold"
                    style={{ color: 'var(--gts-portal-text)' }}
                  >
                    Special Promo
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--gts-portal-muted)' }}
                  >
                    Request custom promo
                  </p>
                </div>
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent 
            style={{ 
              backgroundColor: 'var(--gts-portal-surface)',
              borderColor: 'var(--gts-portal-border)'
            }}
          >
            <DialogHeader>
              <DialogTitle style={{ color: 'var(--gts-portal-text)' }}>
                Request Special Promo
              </DialogTitle>
              <DialogDescription style={{ color: 'var(--gts-portal-muted)' }}>
                Request a custom promotional campaign for your specific needs
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label style={{ color: 'var(--gts-portal-text)' }}>Promo Brief</Label>
                <Textarea
                  placeholder="Describe your promotional needs, target audience, and campaign goals..."
                  value={promoRequest}
                  onChange={(e) => setPromoRequest(e.target.value)}
                  rows={6}
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
                onClick={() => setSpecialPromoOpen(false)}
              >
                Submit Request
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Existing Promo Links */}
      <Card 
        style={{ 
          backgroundColor: 'var(--gts-portal-card)',
          borderColor: 'var(--gts-portal-border)'
        }}
      >
        <div className="p-6">
          <h3 
            className="text-lg font-semibold mb-4"
            style={{ color: 'var(--gts-portal-text)' }}
          >
            Your Promo Links
          </h3>
          <div className="space-y-4">
            {mockPromoLinks.map((link) => (
              <div 
                key={link.id}
                className="flex items-center justify-between p-4 rounded-lg border"
                style={{ 
                  backgroundColor: 'var(--gts-portal-surface)',
                  borderColor: 'var(--gts-portal-border)'
                }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 
                      className="font-medium"
                      style={{ color: 'var(--gts-portal-text)' }}
                    >
                      {link.name}
                    </h4>
                    <Badge 
                      style={{
                        backgroundColor: 'var(--gts-portal-accent)20',
                        color: 'var(--gts-portal-accent)'
                      }}
                    >
                      {link.campaign}
                    </Badge>
                  </div>
                  <p 
                    className="text-sm font-mono text-gray-600 mb-2 break-all"
                    style={{ color: 'var(--gts-portal-muted)' }}
                  >
                    {link.url}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span style={{ color: 'var(--gts-portal-muted)' }}>
                      {link.clicks} clicks
                    </span>
                    <span style={{ color: 'var(--gts-portal-success)' }}>
                      {link.conversions} conversions
                    </span>
                    <span style={{ color: 'var(--gts-portal-muted)' }}>
                      Created: {link.created}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => copyToClipboard(link.url)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => generateQR(link.url)}
                  >
                    <QrCode className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Media Kit */}
      <Card 
        style={{ 
          backgroundColor: 'var(--gts-portal-card)',
          borderColor: 'var(--gts-portal-border)'
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 
                className="text-lg font-semibold"
                style={{ color: 'var(--gts-portal-text)' }}
              >
                Media Kit & Brand Assets
              </h3>
              <p 
                className="text-sm mt-1"
                style={{ color: 'var(--gts-portal-muted)' }}
              >
                Download logos, banners, and brand guidelines
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mediaKitItems.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border"
                style={{ 
                  backgroundColor: 'var(--gts-portal-surface)',
                  borderColor: 'var(--gts-portal-border)'
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: 'var(--gts-portal-accent)20' }}
                  >
                    <FileImage 
                      className="w-5 h-5" 
                      style={{ color: 'var(--gts-portal-accent)' }}
                    />
                  </div>
                  <div>
                    <h4 
                      className="font-medium"
                      style={{ color: 'var(--gts-portal-text)' }}
                    >
                      {item.title}
                    </h4>
                    <p 
                      className="text-sm"
                      style={{ color: 'var(--gts-portal-muted)' }}
                    >
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {item.formats.map((format) => (
                        <Badge 
                          key={format}
                          variant="outline"
                          className="text-xs"
                          style={{
                            borderColor: 'var(--gts-portal-border)',
                            color: 'var(--gts-portal-muted)'
                          }}
                        >
                          {format}
                        </Badge>
                      ))}
                      <span 
                        className="text-xs"
                        style={{ color: 'var(--gts-portal-muted)' }}
                      >
                        {item.size}
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  style={{
                    backgroundColor: 'var(--gts-portal-accent)20',
                    color: 'var(--gts-portal-accent)',
                    border: 'none'
                  }}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}