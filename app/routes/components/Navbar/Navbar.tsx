import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react"; // Cambiado a 'Menu' que es el icono de hamburguesa clásico
import { SidebarRoutes } from "../SidebarRoutes";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-background border-b border-border text-foreground">
      
      {/* Bloque Izquierdo: Menú Lateral Desplegable */}
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger className="p-2 rounded-md hover:bg-accent text-foreground transition-colors cursor-pointer flex items-center justify-center">
          
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menú</span>
        </SheetTrigger>
          
          {/* 🌟 side="left" lo abre verticalmente a la izquierda. 
          
              Añadimos text-foreground para asegurar que las palabras por defecto sean negras/oscuras */}
          <SheetContent side="left" className="w-[300px] sm:w-[400px] text-foreground bg-card">
            <div className="flex flex-col h-full pt-6">
              <div className="px-4 py-2 mb-4">
                <span className="text-xl font-bold tracking-tight">Codescrum</span>
              </div>
              <SidebarRoutes />
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo de la Empresa */}
        <div className="font-bold text-xl tracking-tight text-foreground hidden sm:block">
          Codescrum
        </div>
      </div>
    
      

    </nav>
  );
}