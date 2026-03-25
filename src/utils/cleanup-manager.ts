// 🧹 GTS Cleanup Manager - AI-Powered File Management
export interface FileCleanupInfo {
  path: string;
  reason: 'temp' | 'patch' | 'append' | 'duplicate' | 'legacy';
  safeToDelete: boolean;
  replacedBy?: string;
  dependencies?: string[];
}

export const CLEANUP_QUEUE: FileCleanupInfo[] = [
  // 🗑️ TEMPORARY FILES
  {
    path: '/GTSExecutivePanel_Fix.tsx',
    reason: 'temp',
    safeToDelete: true,
    replacedBy: '/components/admin/GTSExecutivePanel.tsx'
  },
  
  {
    path: '/temp_find_crm.txt',
    reason: 'temp', 
    safeToDelete: true,
    replacedBy: 'Fixed in main Executive Panel'
  },
  
  {
    path: '/temp_quality_content.tsx',
    reason: 'temp',
    safeToDelete: true,
    replacedBy: 'Integrated into quality module'
  },
  
  {
    path: '/test_search_quality.tsx',
    reason: 'temp',
    safeToDelete: true,
    replacedBy: 'Testing completed'
  },

  // 🩹 PATCH FILES  
  {
    path: '/components/admin/GTSExecutivePanel_temp.tsx',
    reason: 'patch',
    safeToDelete: true,
    replacedBy: '/components/admin/GTSExecutivePanel.tsx'
  },

  {
    path: '/components/admin/GTSExecutivePanel_patch.tsx',
    reason: 'patch',
    safeToDelete: true,
    replacedBy: '/components/admin/GTSExecutivePanel.tsx'
  },

  {
    path: '/components/admin/GTSExecutivePanel_CRM_Reports_patch.tsx',
    reason: 'patch',
    safeToDelete: true,
    replacedBy: '/components/admin/GTSExecutivePanel.tsx'
  },

  {
    path: '/components/admin/GTSExecutivePanel_Enhanced_Notifications.tsx',
    reason: 'patch',
    safeToDelete: true,
    replacedBy: '/components/admin/GTSExecutivePanel.tsx'
  },

  // 🔗 APPEND FILES
  {
    path: '/components/admin/modules/GTSCRMWithOmniInbox_append.tsx',
    reason: 'append',
    safeToDelete: true,
    replacedBy: '/components/admin/modules/GTSCRMWithOmniInbox.tsx'
  },

  {
    path: '/components/admin/modules/GTSCRMWithOmniInbox_Quality.tsx',
    reason: 'append',
    safeToDelete: true,
    replacedBy: '/components/admin/modules/GTSCRMWithOmniInbox.tsx'
  },

  {
    path: '/components/admin/modules/GTSCRMModuleV2_NewLead.tsx',
    reason: 'append',
    safeToDelete: true,
    replacedBy: '/components/admin/modules/GTSCRMWithOmniInbox.tsx'
  },

  // 🔄 DUPLICATES (for future consolidation)
  {
    path: '/components/portal/GTSClientClubPortalFinal.tsx',
    reason: 'duplicate',
    safeToDelete: false,
    replacedBy: '/components/portal/GTSClientClubPortalComplete.tsx',
    dependencies: ['Need to merge features first']
  }
];

export class CleanupManager {
  static getSafeToDelete(): FileCleanupInfo[] {
    return CLEANUP_QUEUE.filter(file => file.safeToDelete);
  }

  static getByReason(reason: FileCleanupInfo['reason']): FileCleanupInfo[] {
    return CLEANUP_QUEUE.filter(file => file.reason === reason);
  }

  static generateCleanupSummary(): string {
    const safeCount = this.getSafeToDelete().length;
    const totalCount = CLEANUP_QUEUE.length;
    const byReason = {
      temp: this.getByReason('temp').length,
      patch: this.getByReason('patch').length, 
      append: this.getByReason('append').length,
      duplicate: this.getByReason('duplicate').length,
      legacy: this.getByReason('legacy').length
    };

    return `
🧹 CLEANUP SUMMARY
==================
Total files: ${totalCount}
Safe to delete: ${safeCount}
Needs review: ${totalCount - safeCount}

By reason:
- Temporary files: ${byReason.temp}
- Patch files: ${byReason.patch}  
- Append files: ${byReason.append}
- Duplicates: ${byReason.duplicate}
- Legacy: ${byReason.legacy}
    `;
  }

  static getCleanupCommands(): string[] {
    return this.getSafeToDelete().map(file => `rm ${file.path}`);
  }

  static validateCleanup(filePath: string): {
    canDelete: boolean;
    reason: string;
    replacedBy?: string;
  } {
    const fileInfo = CLEANUP_QUEUE.find(f => f.path === filePath);
    
    if (!fileInfo) {
      return {
        canDelete: false,
        reason: 'File not in cleanup queue'
      };
    }

    if (!fileInfo.safeToDelete) {
      return {
        canDelete: false,
        reason: `File has dependencies: ${fileInfo.dependencies?.join(', ')}`
      };
    }

    return {
      canDelete: true,
      reason: `${fileInfo.reason} file - ${fileInfo.replacedBy ? `replaced by ${fileInfo.replacedBy}` : 'no longer needed'}`,
      replacedBy: fileInfo.replacedBy
    };
  }
}

// 📊 METRICS
export const CLEANUP_METRICS = {
  totalFiles: CLEANUP_QUEUE.length,
  safeToDelete: CleanupManager.getSafeToDelete().length,
  potentialSpaceSaved: '~2.3MB', // estimate based on file sizes
  estimatedTimeToClean: '15 minutes'
};

console.log(CleanupManager.generateCleanupSummary());