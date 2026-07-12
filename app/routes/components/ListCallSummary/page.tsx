"use client";

import { useState, useEffect } from "react";
import CalendarSelection from "../calendar/calendar";
import { FilterBar } from "./FilterBar";
import { CallTable } from "./CallTable";
import { blob } from "stream/consumers";

interface CallRow {
  nombre: string;
  numero: string;
  totalLlamadas: number;
  fechaRegistro: string;
}

export default function RoutesPage() {
  // 🕒 Función interna para obtener la fecha de hoy local en formato "YYYY-MM-DD"
  const obtenerFechaHoy = () => {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    return `${año}-${mes}-${dia}`;
  };

  // 1. Inicializamos 'endDate' dinámicamente con el día de hoy
  const [startDate, setStartDate] = useState("2026-07-01");
  const [endDate, setEndDate] = useState(obtenerFechaHoy());
  const [searchQuery, setSearchQuery] = useState("");
  const [allData, setAllData] = useState<CallRow[]>([]);
  const [filteredData, setFilteredData] = useState<CallRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🛡️ VALIDACIÓN EN CALIENTE: Si la fecha de inicio supera a la fecha fin,
  // ajustamos la fecha fin de inmediato para mantener la concordancia.
  useEffect(() => {
    if (startDate > endDate) {
      setEndDate(startDate);
    }
  }, [startDate]);

  // Fetch desde PostgreSQL cuando cambian las fechas
  useEffect(() => {
    const fetchCalls = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/calls?from=${startDate}&to=${endDate}`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const json = await res.json();

        const dataClean: CallRow[] = (json.grouped || []).map((row: any) => ({
          nombre: row.nombre || "Sin nombre",
          numero: row.numero,
          totalLlamadas: row.totalLlamadas,
          fechaRegistro: row.fechaRegistro,
        }));

        setAllData(dataClean);
        setFilteredData(dataClean);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
  }, [startDate, endDate]);

  // Filtro local por búsqueda adaptado a los campos en español
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData(allData);
      return;
    }
    const q = searchQuery.toLowerCase();
    setFilteredData(
      allData.filter(
        (row) =>
          row.nombre.toLowerCase().includes(q) || row.numero.includes(searchQuery)
      )
    );
  }, [searchQuery, allData]);

  // Exportar CSV adaptado a la nueva estructura
  const handleExportCSV = () => {
  const headers = "Fecha;Nombre;Telefono;Numero de Llamadas\n";
  const rows = filteredData
    .map(
      (item) =>
        `${item.fechaRegistro};"${item.nombre}";"${item.numero}";${item.totalLlamadas}`
    )
    .join("\n");
  const contenidoCSV = "sep=;\n" + headers + rows;

  const blob = new Blob(["\uFEFF" + contenidoCSV], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `reporte_llamadas_${startDate}_a_${endDate}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <main className="min-h-screen p-4 md:p-6 bg-background space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard de Control de Llamadas
        </h1>
        <p className="text-sm text-muted-foreground">
          Monitorea y exporta el volumen de gestión comercial B2B.
        </p>
      </div>

      <FilterBar
        startDate={startDate}
        endDate={endDate}
        searchQuery={searchQuery}
        onStartDateChange={setStartDate}
        // Pasamos un interceptor en el cambio para asegurar doble validación manual en UI
        onEndDateChange={(fechaSeleccionada) => {
          if (fechaSeleccionada >= startDate) {
            setEndDate(fechaSeleccionada);
          }
        }}
        onSearchChange={setSearchQuery}
        onExportCSV={handleExportCSV}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CalendarSelection 
            data={allData} 
            onSelectDate={(fecha) => {
            setStartDate(fecha);
            setEndDate(fecha);
    }}
          />
        </div>

        <div className="lg:col-span-2">
          {loading && (
            <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
              Cargando llamadas...
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center h-40 text-red-500 text-sm">
              Error al cargar: {error}
            </div>
          )}
          {!loading && !error && <CallTable data={filteredData} />}
        </div>
      </div>
    </main>
  );
}