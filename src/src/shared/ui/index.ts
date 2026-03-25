// 🎨 Shared UI Components - Public API
// ✅ Централизованный экспорт согласно rules.json FSD

// ✅ Основные UI компоненты (временные импорты из legacy)
export { Button } from '../../components/ui/button'
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
export { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
export { Badge } from '../../components/ui/badge'
export { Skeleton } from '../../components/ui/skeleton'
export { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert'
export { Input } from '../../components/ui/input'
export { Label } from '../../components/ui/label'
export { Textarea } from '../../components/ui/textarea'
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
export { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog'
export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField } from '../../components/ui/form'
export { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../../components/ui/table'
export { Toaster } from '../../components/ui/sonner'
export { cn } from '../../components/ui/utils'

// ✅ Custom GTS components (новые FSD компоненты)
export { ErrorBoundary } from './ErrorBoundary'
export { ThemeProvider } from './ThemeProvider'
export { ToastProvider } from './ToastProvider'

// TODO: По мере миграции добавлять полные импорты всех ShadCN компонентов