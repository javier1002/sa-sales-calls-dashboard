// Este archivo maneja los dos campos de fecha, la barra de búsqueda con su lupa y el botón de exportación.
"use client";

import { Search, Download, Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  startDate: string;
  endDate: string;
  searchQuery: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onExportCSV: () => void;
}

export function FilterBar({
  startDate,
  endDate,
  searchQuery,
  onStartDateChange,
  onEndDateChange,
  onSearchChange,
  onExportCSV,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-card border rounded-xl shadow-sm md:flex-row md:items-end justify-between text-foreground">
      
      {/* Rango de Fechas e Input de búsqueda */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 flex-1 max-w-4xl">
        
        {/* Fecha Inicio */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <CalendarIcon className="h-3.5 w-3.5" /> Fecha Inicio
          </label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="w-full bg-background"
          />
        </div>

        {/* Fecha Fin */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <CalendarIcon className="h-3.5 w-3.5" /> Fecha Fin
          </label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="w-full bg-background"
          />
        </div>

        {/* Buscador con Lupa */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <Search className="h-3.5 w-3.5" /> Buscar Cliente
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Nombre o teléfono..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 w-full bg-background"
            />
          </div>
        </div>

      </div>

      {/* Botón de Exportar */}
      <div className="md:mb-0">
        <Button 
          onClick={onExportCSV}
          variant="outline"
          className="w-full md:w-auto flex items-center gap-2 border-dashed border-primary text-primary hover:bg-primary/10 cursor-pointer"
        >
          <Download className="h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

    </div>
  );
}