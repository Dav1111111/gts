// 🧹 GTS Cleanup Center - AI-Powered File Management Dashboard
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { Alert, AlertDescription } from "../ui/alert";
import { 
  Trash2,
  FileX,
  CheckCircle,
  AlertTriangle,
  Archive,
  RefreshCw,
  BarChart3,
  Clock,
  HardDrive,
  Zap,
  Target,
  ArrowLeft
} from "lucide-react";
import { CleanupManager, CLEANUP_QUEUE } from "../../utils/cleanup-manager";

interface GTSCleanupCenterProps {
  onBack?: () => void;
}

export function GTSCleanupCenter({ onBack }: GTSCleanupCenterProps) {
  const [isCleanupRunning, setIsCleanupRunning] = useState(false);
  const [cleanupProgress, setCleanupProgress] = useState(0);
  const [cleanedFiles, setCleanedFiles] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  const safeFiles = CleanupManager.getSafeToDelete();
  const tempFiles = CleanupManager.getByReason('temp');
  const patchFiles = CleanupManager.getByReason('patch');
  const appendFiles = CleanupManager.getByReason('append');
  const duplicateFiles = CleanupManager.getByReason('duplicate');

  const handleAutoCleanup = async () => {
    setIsCleanupRunning(true);
    setCleanupProgress(0);
    
    // Simulate cleanup process
    const safeToDelete = CleanupManager.getSafeToDelete();
    const totalFiles = safeToDelete.length;
    
    for (let i = 0; i < totalFiles; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setCleanupProgress(((i + 1) / totalFiles) * 100);
      setCleanedFiles(prev => [...prev, safeToDelete[i].path]);
    }
    
    setIsCleanupRunning(false);
  };

  const getFileIcon = (reason: string) => {
    switch (reason) {
      case 'temp': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'patch': return <RefreshCw className="w-4 h-4 text-blue-400" />;
      case 'append': return <Archive className="w-4 h-4 text-purple-400" />;
      case 'duplicate': return <FileX className="w-4 h-4 text-red-400" />;
      default: return <Trash2 className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white">
      {/* Header */}
      <div className="border-b bg-[#121214] border-[#232428]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-[#17181A]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-heading text-white flex items-center gap-3">
                <Trash2 className="h-8 w-8 text-[#91040C]" />
                GTS Cleanup Center
              </h1>
              <p className="text-sm text-[#A6A7AA]">
                AI-powered система очистки временных файлов и дубликатов
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setShowDetails(!showDetails)}
              variant="outline"
              className="border-[#232428] text-white hover:bg-[#17181A]"
            >
              {showDetails ? 'Скрыть детали' : 'Показать детали'}
            </Button>
            <Button 
              onClick={handleAutoCleanup}
              disabled={isCleanupRunning || safeFiles.length === 0}
              className="bg-[#91040C] hover:bg-[#91040C]/90"
            >
              <Zap className="h-4 w-4 mr-2" />
              {isCleanupRunning ? 'Очистка...' : 'Автоочистка'}
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Cleanup Progress */}
        {isCleanupRunning && (
          <Alert className="bg-blue-500/10 border-blue-500/20">
            <Zap className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Выполняется автоматическая очистка...</span>
                  <span>{Math.round(cleanupProgress)}%</span>
                </div>
                <Progress value={cleanupProgress} className="h-2" />
                {cleanedFiles.length > 0 && (
                  <p className="text-xs text-[#A6A7AA]">
                    Последний удаленный файл: {cleanedFiles[cleanedFiles.length - 1]}
                  </p>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Всего файлов</p>
                  <p className="text-2xl font-heading text-white">{CLEANUP_QUEUE.length}</p>
                  <p className="text-xs text-blue-400">в очереди</p>
                </div>
                <Target className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Безопасно удалить</p>
                  <p className="text-2xl font-heading text-green-400">{safeFiles.length}</p>
                  <p className="text-xs text-green-400">файлов</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Требует проверки</p>
                  <p className="text-2xl font-heading text-yellow-400">{CLEANUP_QUEUE.length - safeFiles.length}</p>
                  <p className="text-xs text-yellow-400">файлов</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Освободится места</p>
                  <p className="text-2xl font-heading text-[#91040C]">~2.3MB</p>
                  <p className="text-xs text-[#91040C]">примерно</p>
                </div>
                <HardDrive className="h-8 w-8 text-[#91040C]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* File Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Safe to Delete */}
          <Card className="bg-[#121214] border-[#232428]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                Безопасно удалить ({safeFiles.length})
              </CardTitle>
              <CardDescription className="text-[#A6A7AA]">
                Файлы, которые можно удалить без последствий
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {safeFiles.slice(0, showDetails ? safeFiles.length : 5).map((file) => (
                <div key={file.path} className="flex items-center justify-between p-3 bg-[#17181A] rounded-lg">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.reason)}
                    <div>
                      <p className="text-sm text-white">{file.path}</p>
                      <p className="text-xs text-[#A6A7AA]">{file.reason} - {file.replacedBy || 'больше не нужен'}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/10 text-green-400">
                    {file.reason}
                  </Badge>
                </div>
              ))}
              {!showDetails && safeFiles.length > 5 && (
                <p className="text-xs text-[#A6A7AA] text-center">
                  ...и еще {safeFiles.length - 5} файлов
                </p>
              )}
            </CardContent>
          </Card>

          {/* Categories Breakdown */}
          <Card className="bg-[#121214] border-[#232428]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                Категории файлов
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span className="text-white">Временные файлы</span>
                  </div>
                  <Badge className="bg-yellow-500/10 text-yellow-400">
                    {tempFiles.length}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-blue-400" />
                    <span className="text-white">Patch файлы</span>
                  </div>
                  <Badge className="bg-blue-500/10 text-blue-400">
                    {patchFiles.length}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Archive className="w-4 h-4 text-purple-400" />
                    <span className="text-white">Append файлы</span>
                  </div>
                  <Badge className="bg-purple-500/10 text-purple-400">
                    {appendFiles.length}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileX className="w-4 h-4 text-red-400" />
                    <span className="text-white">Дубликаты</span>
                  </div>
                  <Badge className="bg-red-500/10 text-red-400">
                    {duplicateFiles.length}
                  </Badge>
                </div>
              </div>

              <Separator className="bg-[#232428]" />

              <div className="space-y-2">
                <h4 className="font-medium text-white">Статус очистки:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A6A7AA]">Завершено</span>
                    <span className="text-green-400">{Math.round((cleanedFiles.length / safeFiles.length) * 100) || 0}%</span>
                  </div>
                  <Progress value={(cleanedFiles.length / safeFiles.length) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cleanup Summary */}
        {cleanedFiles.length > 0 && (
          <Card className="bg-[#121214] border-[#232428]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                Результаты очистки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-[#17181A] rounded-lg">
                  <p className="text-2xl font-heading text-green-400">{cleanedFiles.length}</p>
                  <p className="text-sm text-[#A6A7AA]">Файлов удалено</p>
                </div>
                <div className="text-center p-4 bg-[#17181A] rounded-lg">
                  <p className="text-2xl font-heading text-blue-400">~{Math.round(cleanedFiles.length * 0.2)}MB</p>
                  <p className="text-sm text-[#A6A7AA]">Места освобождено</p>  
                </div>
                <div className="text-center p-4 bg-[#17181A] rounded-lg">
                  <p className="text-2xl font-heading text-[#91040C]">100%</p>
                  <p className="text-sm text-[#A6A7AA]">Успешно</p>
                </div>
              </div>

              {showDetails && (
                <div className="space-y-2">
                  <h4 className="font-medium text-white">Удаленные файлы:</h4>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {cleanedFiles.map((file, index) => (
                      <div key={index} className="text-sm text-[#A6A7AA] bg-[#17181A] p-2 rounded">
                        ✓ {file}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default GTSCleanupCenter;