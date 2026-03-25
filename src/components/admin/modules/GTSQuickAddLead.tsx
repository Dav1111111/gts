import { useState } from "react";
import { Button } from "../../ui/button";
import { Plus, UserPlus } from "lucide-react";
import { GTSNewLeadForm } from "./GTSNewLeadForm";

interface GTSQuickAddLeadProps {
  variant?: "default" | "icon" | "text";
  className?: string;
  onLeadCreated?: (leadData: any) => void;
}

export function GTSQuickAddLead({ 
  variant = "default", 
  className = "",
  onLeadCreated 
}: GTSQuickAddLeadProps) {
  const [showNewLeadForm, setShowNewLeadForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewLead = async (data: any) => {
    setIsLoading(true);
    try {
      console.log("New lead data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create new lead object
      const newLead = {
        id: `lead-${Date.now()}`,
        name: `${data.firstName} ${data.lastName}`,
        company: data.company || "Неизвестная компания",
        email: data.email,
        phone: data.phone,
        source: data.source,
        status: data.priority === "critical" || data.priority === "high" ? "hot" : 
               data.priority === "medium" ? "warm" : "cold",
        score: data.priority === "critical" ? 95 : 
               data.priority === "high" ? 85 :
               data.priority === "medium" ? 70 : 55,
        owner: data.assignedTo || "System",
        createdAt: new Date().toISOString().split('T')[0],
        lastActivity: "Только что создан",
        priority: data.priority,
        serviceType: data.serviceType,
        expectedBudget: data.expectedBudget,
        preferredContact: data.preferredContact,
        notes: data.notes,
        tags: data.tags
      };
      
      console.log("Created new lead:", newLead);
      
      // Call parent callback if provided
      if (onLeadCreated) {
        onLeadCreated(newLead);
      }
      
      setShowNewLeadForm(false);
    } catch (error) {
      console.error("Error creating lead:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderButton = () => {
    switch (variant) {
      case "icon":
        return (
          <Button
            size="sm"
            onClick={() => setShowNewLeadForm(true)}
            className={`bg-[#91040C] hover:bg-[#91040C]/90 ${className}`}
          >
            <Plus className="h-4 w-4" />
          </Button>
        );
      
      case "text":
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowNewLeadForm(true)}
            className={`border-[#91040C] text-[#91040C] hover:bg-[#91040C] hover:text-white ${className}`}
          >
            Добавить лид
          </Button>
        );
      
      default:
        return (
          <Button
            onClick={() => setShowNewLeadForm(true)}
            className={`bg-[#91040C] hover:bg-[#91040C]/90 ${className}`}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Новый лид
          </Button>
        );
    }
  };

  return (
    <>
      {renderButton()}
      
      <GTSNewLeadForm
        open={showNewLeadForm}
        onClose={() => setShowNewLeadForm(false)}
        onSubmit={handleNewLead}
        isLoading={isLoading}
      />
    </>
  );
}