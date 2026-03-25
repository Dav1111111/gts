import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string;
  children?: SidebarItem[];
}

interface GTSSharedSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  activeItemId: string;
  onItemClick: (itemId: string) => void;
  items: SidebarItem[];
  logo?: React.ReactNode;
  className?: string;
}

export function GTSSharedSidebar({
  isCollapsed,
  onToggleCollapse,
  activeItemId,
  onItemClick,
  items,
  logo,
  className = ""
}: GTSSharedSidebarProps) {
  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const isActive = activeItemId === item.id;
    const hasChildren = item.children && item.children.length > 0;
    
    return (
      <div key={item.id} className={`${level > 0 ? 'ml-4' : ''}`}>
        <Button
          variant="ghost"
          onClick={() => {
            if (item.onClick) {
              item.onClick();
            } else {
              onItemClick(item.id);
            }
          }}
          className={`w-full justify-start px-3 py-2 h-auto ${
            isActive 
              ? 'bg-[var(--gts-portal-accent)] text-white hover:bg-[var(--gts-portal-accent)]/90' 
              : 'text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-card)]'
          } ${isCollapsed ? 'px-2' : ''}`}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="flex-shrink-0">
              {item.icon}
            </div>
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="bg-[var(--gts-portal-accent)] text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </div>
        </Button>
        
        {!isCollapsed && hasChildren && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`bg-[var(--gts-portal-surface)] border-r border-[var(--gts-portal-border)] flex flex-col ${className}`}>
      {/* Header with toggle */}
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && logo && (
          <div className="flex items-center gap-2">
            {logo}
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-card)] p-2"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <Separator className="bg-[var(--gts-portal-border)]" />

      {/* Navigation Items */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-2">
          {items.map(item => renderSidebarItem(item))}
        </div>
      </ScrollArea>

      {/* Footer */}
      {!isCollapsed && (
        <>
          <Separator className="bg-[var(--gts-portal-border)]" />
          <div className="p-4">
            <div className="text-xs text-[var(--gts-portal-muted)] text-center">
              GTS Portal v2.0
            </div>
          </div>
        </>
      )}
    </div>
  );
}