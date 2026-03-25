import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { ScrollArea } from '../ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  BarChart3,
  Activity,
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Zap,
  RefreshCw,
  Settings,
  Anchor,
  Plane,
  Car,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ResourceUtilization {
  date: string;
  resource_utilization: { [resourceId: string]: number };
  crew_utilization: { [crewId: string]: number };
  total_bookings: number;
  calculated_at: string;
}

interface AutoPlanningRecommendation {
  type: 'resource_rebalance' | 'crew_reassign' | 'maintenance_schedule' | 'capacity_alert';
  resource_id: string;
  resource_name: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  estimated_impact: string;
  action_required: boolean;
}

interface GTSResourcePlanningPanelProps {
  utilization?: ResourceUtilization | null;
  recommendations?: AutoPlanningRecommendation[];
  loading?: boolean;
  onRefresh?: () => void;
  onApplyRecommendation?: (recommendation: AutoPlanningRecommendation) => void;
}

const resourceTypes = {
  boat: { icon: Anchor, name: 'Катера', color: 'text-blue-400' },
  helicopter: { icon: Plane, name: 'Вертолёты', color: 'text-green-400' },
  buggy: { icon: Car, name: 'Багги', color: 'text-orange-400' },
  staff: { icon: User, name: 'Персонал', color: 'text-purple-400' }
};

export function GTSResourcePlanningPanel({
  utilization,
  recommendations = [],
  loading = false,
  onRefresh,
  onApplyRecommendation
}: GTSResourcePlanningPanelProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('utilization');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-4 h-4" />;
      case 'medium':
        return <TrendingUp className="w-4 h-4" />;
      case 'low':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'resource_rebalance':
        return <BarChart3 className="w-4 h-4 text-blue-400" />;
      case 'crew_reassign':
        return <Users className="w-4 h-4 text-green-400" />;
      case 'maintenance_schedule':
        return <Settings className="w-4 h-4 text-orange-400" />;
      case 'capacity_alert':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getUtilizationLevel = (hours: number): { level: string; color: string; text: string } => {
    if (hours >= 8) return { level: 'high', color: 'text-red-400', text: 'Высокая' };
    if (hours >= 6) return { level: 'medium', color: 'text-yellow-400', text: 'Средняя' };
    if (hours >= 3) return { level: 'low', color: 'text-green-400', text: 'Низкая' };
    return { level: 'idle', color: 'text-gray-400', text: 'Простой' };
  };

  const formatUtilizationData = () => {
    if (!utilization?.resource_utilization) return [];
    
    return Object.entries(utilization.resource_utilization).map(([resourceId, hours]) => {
      const utilizationInfo = getUtilizationLevel(hours);
      return {
        id: resourceId,
        hours,
        percentage: Math.min((hours / 10) * 100, 100), // Assuming 10 hours max
        ...utilizationInfo
      };
    });
  };

  const formatCrewData = () => {
    if (!utilization?.crew_utilization) return [];
    
    return Object.entries(utilization.crew_utilization).map(([crewId, hours]) => {
      const utilizationInfo = getUtilizationLevel(hours);
      return {
        id: crewId,
        hours,
        percentage: Math.min((hours / 8) * 100, 100), // Assuming 8 hours max for crew
        ...utilizationInfo
      };
    });
  };

  const highPriorityCount = recommendations.filter(r => r.priority === 'high').length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`text-white hover:bg-[#121214] p-2 relative ${
            highPriorityCount > 0 ? 'text-red-400' : ''
          }`}
        >
          <Zap className="w-4 h-4" />
          <AnimatePresence>
            {highPriorityCount > 0 && (
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-medium"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {highPriorityCount}
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="bg-[#121214] border-[#232428] text-white max-w-4xl max-h-[85vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#91040C]" />
              Автоматическое планирование
            </DialogTitle>
            
            <div className="flex items-center gap-2">
              {onRefresh && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRefresh}
                  disabled={loading}
                  className="text-white hover:bg-[#17181A]"
                >
                  <motion.div
                    animate={loading ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: "linear" }}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </motion.div>
                </Button>
              )}
            </div>
          </div>
          <DialogDescription className="text-[#A6A7AA]">
            Анализ загруженности ресурсов, экипажа и автоматические рекомендации по оптимизации планирования
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#17181A]">
            <TabsTrigger value="utilization" className="text-white">
              <BarChart3 className="w-4 h-4 mr-1" />
              Загруженность
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="text-white">
              <Activity className="w-4 h-4 mr-1" />
              Рекомендации
              {highPriorityCount > 0 && (
                <Badge className="ml-2 bg-red-500 text-white">
                  {highPriorityCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white">
              <TrendingUp className="w-4 h-4 mr-1" />
              Аналитика
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="utilization">
              <div className="space-y-6">
                {/* Resource Utilization */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#91040C]" />
                    <h3 className="text-lg font-medium">Загруженность ресурсов</h3>
                    {utilization && (
                      <Badge className="bg-[#17181A] text-white">
                        {utilization.total_bookings} бронирований
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formatUtilizationData().map((resource) => (
                      <Card key={resource.id} className="bg-[#17181A] border-[#232428] p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#91040C]/20 rounded-lg flex items-center justify-center">
                              <BarChart3 className="w-4 h-4 text-[#91040C]" />
                            </div>
                            <div>
                              <div className="font-medium text-white text-sm">{resource.id}</div>
                              <div className={`text-xs ${resource.color}`}>{resource.text}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-white">{resource.hours}ч</div>
                            <div className="text-xs text-[#A6A7AA]">{resource.percentage.toFixed(0)}%</div>
                          </div>
                        </div>
                        <Progress value={resource.percentage} className="h-2" />
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Crew Utilization */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#91040C]" />
                    <h3 className="text-lg font-medium">Загруженность экипажа</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {formatCrewData().map((crew) => (
                      <Card key={crew.id} className="bg-[#17181A] border-[#232428] p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-400" />
                            </div>
                            <div>
                              <div className="font-medium text-white text-sm">{crew.id}</div>
                              <div className={`text-xs ${crew.color}`}>{crew.text}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-white">{crew.hours}ч</div>
                            <div className="text-xs text-[#A6A7AA]">{crew.percentage.toFixed(0)}%</div>
                          </div>
                        </div>
                        <Progress value={crew.percentage} className="h-2" />
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recommendations">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-[#91040C]" />
                  <h3 className="text-lg font-medium">Рекомендации системы</h3>
                </div>

                <ScrollArea className="max-h-[50vh]">
                  <div className="space-y-3 pr-4">
                    <AnimatePresence>
                      {recommendations.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center py-12"
                        >
                          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                          <p className="text-[#A6A7AA]">Все ресурсы оптимально распределены</p>
                        </motion.div>
                      ) : (
                        recommendations.map((recommendation, index) => (
                          <motion.div
                            key={`${recommendation.resource_id}-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card className="bg-[#17181A] border-[#232428] p-4">
                              <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1">
                                  {getRecommendationIcon(recommendation.type)}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    <div className="flex items-center gap-2">
                                      <Badge className={`${getPriorityColor(recommendation.priority)} text-xs`}>
                                        {getPriorityIcon(recommendation.priority)}
                                        <span className="ml-1">
                                          {recommendation.priority === 'high' ? 'Высокий' :
                                           recommendation.priority === 'medium' ? 'Средний' : 'Низкий'}
                                        </span>
                                      </Badge>
                                    </div>
                                    <div className="text-xs text-[#A6A7AA]">
                                      {recommendation.resource_name}
                                    </div>
                                  </div>
                                  
                                  <p className="text-sm text-white mb-2">
                                    {recommendation.message}
                                  </p>
                                  
                                  <div className="text-xs text-[#A6A7AA] mb-3">
                                    Ожидаемый эффект: {recommendation.estimated_impact}
                                  </div>
                                  
                                  {recommendation.action_required && onApplyRecommendation && (
                                    <Button
                                      size="sm"
                                      onClick={() => onApplyRecommendation(recommendation)}
                                      className="bg-[#91040C] hover:bg-[#91040C]/90 text-white"
                                    >
                                      <CheckCircle className="w-4 h-4 mr-1" />
                                      Применить
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        ))
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#91040C]" />
                  <h3 className="text-lg font-medium">Аналитика планирования</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-[#17181A] border-[#232428] p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {utilization?.total_bookings || 0}
                        </div>
                        <div className="text-sm text-[#A6A7AA]">Общий объём</div>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-[#17181A] border-[#232428] p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Activity className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {recommendations.filter(r => r.priority === 'high').length}
                        </div>
                        <div className="text-sm text-[#A6A7AA]">Критических проблем</div>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-[#17181A] border-[#232428] p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {utilization?.calculated_at ? 
                            new Date(utilization.calculated_at).toLocaleTimeString('ru-RU', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            }) : '--:--'
                          }
                        </div>
                        <div className="text-sm text-[#A6A7AA]">Последний расчёт</div>
                      </div>
                    </div>
                  </Card>
                </div>

                {utilization && (
                  <div className="text-xs text-[#A6A7AA]">
                    Данные обновлены: {new Date(utilization.calculated_at).toLocaleString('ru-RU')}
                  </div>
                )}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default GTSResourcePlanningPanel;