"use client";

import { useState, useEffect } from "react";
import CalendarSelection from "./calendar";

// 1. Definimos la misma interfaz para mapear los registros de llamadas
interface CallRow {
  nombre: string;
  numero: string;
  totalLlamadas: number;
  fechaRegistro: string;
}

export default function RoutesPage() {
  // 2. Definimos los estados necesarios para el histórico
  const [allData, setAllData] = useState<CallRow[]>([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // 🔄 3. Opcional: Fetch inicial para cargar todos los totales del mes en el calendario
  useEffect(() => {
    const fetchHistoricoTotales = async () => {
      setLoading(true);
      try {
        // Consultamos un rango amplio (por ejemplo, todo el año o mes actual) 
        // para que el calendario tenga los datos iniciales que pintar
        const res = await fetch("/api/calls?from=2026-01-01&to=2026-12-31");
        if (res.ok) {
          const json = await res.json();
          const dataClean: CallRow[] = (json.grouped || []).map((row: any) => ({
            nombre: row.nombre || "Sin nombre",
            numero: row.numero,
            totalLlamadas: row.totalLlamadas,
            fechaRegistro: row.fechaRegistro,
          }));
          setAllData(dataClean);
        }
      } catch (error) {
        console.error("Error cargando históricos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricoTotales();
  }, []);

  return (
    <main className="min-h-screen p-6 bg-background text-foreground">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Histórico</h1>
          <p className="text-muted-foreground">
            Selecciona un rango de fechas para ver el histórico.
          </p>
        </div>

        {/* 🌟 Inyectamos las propiedades requeridas para solucionar el error de TypeScript */}
        <div className="bg-card border rounded-xl p-4 shadow-sm">
          {loading ? (
            <div className="text-center p-8 text-sm text-muted-foreground">
              Cargando mapa de llamadas...
            </div>
          ) : (
            <CalendarSelection 
              data={allData} 
              onSelectDate={(fecha) => {
                setFechaSeleccionada(fecha);
                console.log("Día seleccionado en histórico con éxito:", fecha);
                // Aquí podrás filtrar o abrir un modal con el detalle de ese día
              }} 
            />
          )}
        </div>
      </div>
    </main>
  );
}