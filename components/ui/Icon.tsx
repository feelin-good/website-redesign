import {
  Zap, Building2, ClipboardList, Map, Settings, Layers,
  FlaskConical, Factory, Server, Cross, Bolt, Building,
  ShieldCheck, Leaf, Award, BadgeCheck, HardHat,
  CheckCircle, ArrowRight, ArrowUpRight, ChevronRight,
  ChevronDown, Menu, X, Phone, Mail, MapPin, Clock,
  Star, Quote, Play, Download, ExternalLink, Users,
  Target, TrendingUp, Globe, Briefcase,
  LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  'building-2': Building2,
  'clipboard-list': ClipboardList,
  map: Map,
  settings: Settings,
  layers: Layers,
  'flask-conical': FlaskConical,
  factory: Factory,
  server: Server,
  cross: Cross,
  bolt: Bolt,
  building: Building,
  'shield-check': ShieldCheck,
  leaf: Leaf,
  award: Award,
  badge: BadgeCheck,
  'hard-hat': HardHat,
  'check-circle': CheckCircle,
  'arrow-right': ArrowRight,
  'arrow-up-right': ArrowUpRight,
  'chevron-right': ChevronRight,
  'chevron-down': ChevronDown,
  menu: Menu,
  x: X,
  phone: Phone,
  mail: Mail,
  'map-pin': MapPin,
  clock: Clock,
  star: Star,
  quote: Quote,
  play: Play,
  download: Download,
  'external-link': ExternalLink,
  users: Users,
  target: Target,
  'trending-up': TrendingUp,
  globe: Globe,
  briefcase: Briefcase,
}

interface IconProps {
  name: string
  size?: number
  className?: string
}

export function Icon({ name, size = 20, className }: IconProps) {
  const IconComponent = iconMap[name]
  if (!IconComponent) return null
  return <IconComponent size={size} className={cn(className)} />
}
