import { 
    BarChart4, 
    Building2,
    PanelsTopLeft,
    Settings,
    ShieldCheck,
    CircleHelpIcon,
    Calendar,
    Bot, 
  Sliders, 
  BarChart3,
  LayoutDashboard

} from 'lucide-react';
import calendar from '../calendar/calendar';

export const dataGeneralSidebar = [
    {
        icon: PanelsTopLeft,
        label: "Dashboard",
        href: "/routes",
    },
    {
        icon: Building2,
        label: "Historico",
        href: "/routes/components/ListCallSummary",
    },
    {
        icon: Sliders,
        label: "Calendar",
        href: "/routes/components/calendar",
    }
    
]

export const dataToolsSidebar = [
    {
        
        icon: CircleHelpIcon,
        label: "Faqs",
        href: "/company",
    },
    {
        
        icon: BarChart4,
        label: "Analytics",
        href: "/Analytics",
    }
]