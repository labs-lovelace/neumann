import { useState } from "react";
import {
  LayoutDashboard,
  Watch,
  Settings,
  FileBarChart,
  Shield,
  HelpCircle,
  Activity,
  Users,
  ChevronRight,
  Brain,
  Server,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MonitorCog } from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    active: true,
  },
  {
    title: "Wearables",
    icon: Watch,
    href: "/wearables",
    submenu: [
      { title: "Dispositivos", href: "/wearables/devices" },
      { title: "Funcionários", href: "/wearables/employees" },
      { title: "Análise Ergonômica", href: "/wearables/ergonomics" },
    ],
  },
  {
    title: "IA & Análises",
    icon: Brain,
    href: "/analytics",
    submenu: [
      { title: "Detecção de Anomalias", href: "/analytics/anomalies" },
      { title: "Predições", href: "/analytics/predictions" },
      { title: "Padrões de Risco", href: "/analytics/risk-patterns" },
    ],
  },
  {
    title: "Relatórios",
    icon: FileBarChart,
    href: "/reports",
    submenu: [
      { title: "SESST", href: "/reports/sesst" },
      { title: "RH", href: "/reports/hr" },
      { title: "Analytics Avançado", href: "/reports/advanced" },
    ],
  },
  {
    title: "Sistema",
    icon: MonitorCog,
    href: "/system",
    submenu: [
      { title: "Versões", href: "/system/versions" },
      { title: "Monitoramento", href: "/system/monitoring" },
      { title: "Integrações", href: "/system/integrations" },
    ],
  },
  {
    title: "Intervenções",
    icon: Activity,
    href: "/interventions",
    submenu: [
      { title: "Planos de Ação", href: "/interventions/action-plans" },
      { title: "Follow-up", href: "/interventions/followup" },
      { title: "Biblioteca", href: "/interventions/library" },
    ],
  },
  {
    title: "Configurações",
    icon: Settings,
    href: "/settings",
  },
  {
    title: "Ajuda & Suporte",
    icon: HelpCircle,
    href: "/help",
  },
  {
    title: "Sair",
    icon: LogOut,
    href: "/logout",
    color: "text-red-600",
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    if (isCollapsed) return;
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <div>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "h-[calc(100vh-4rem)] bg-white transition-all duration-300 ease-in-out md:translate-x-0",
          isCollapsed ? "md:w-[75px]" : "md:w-72"
        )}
      >
        <div className="flex h-full flex-col relative">
          {/* User Info */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              {/* <div className="h-10 w-10 gradient-neumann rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div> */}
              <div
                className={cn(
                  "transition-opacity duration-300",
                  isCollapsed ? "opacity-0 truncate" : "opacity-100 truncate"
                )}
              >
                <h3 className="font-semibold text-sm">Dr. Ana Silva</h3>
                <p className="text-xs text-muted-foreground">
                  Administrador SESST
                </p>
                <p className="text-xs text-primary">150 funcionários ativos</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="absolute top-8 right-6 hidden md:flex p-1"
            >
              <ChevronLeft
                className={cn(
                  "h-4 w-4 transition-transform",
                  isCollapsed && "rotate-180"
                )}
              />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-x-hidden p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.title}>
                  <Button
                    variant={item.active ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start h-auto p-3 font-medium transition-smooth",
                      item.active &&
                        "bg-primary/10 text-primary border border-primary/20",
                      item.color && `${item.color} hover:bg-red-50`
                    )}
                    onClick={() => item.submenu && toggleExpanded(item.title)}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    <span
                      className={cn(
                        "flex-1 text-left transition-opacity duration-300",
                        isCollapsed ? "opacity-0" : "opacity-100"
                      )}
                    >
                      {item.title}
                    </span>
                    {item.submenu && !isCollapsed && (
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 transition-transform flex-shrink-0",
                          expandedItems.includes(item.title) && "rotate-90"
                        )}
                      />
                    )}
                  </Button>

                  {/* Submenu */}
                  {item.submenu &&
                    expandedItems.includes(item.title) &&
                    !isCollapsed && (
                      <ul className="ml-12 space-y-1">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.title}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start font-normal text-muted-foreground hover:bg-grey-100 hover:text-foreground"
                            >
                              {subItem.title}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-muted">
            <div
              className={cn(
                "text-center transition-opacity duration-300",
                isCollapsed ? "opacity-0 truncate" : "opacity-100 truncate"
              )}
            >
              <p className="text-xs text-muted-foreground">
                Neumann Platform v1.0
              </p>
              <p className="text-xs text-muted-foreground">
                ISO 27001 • LGPD Compliant
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
