"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface CallRow {
  nombre: string;
  numero: string;
  totalLlamadas: number;
  fechaRegistro: string;
}

interface CalendarSelectionProps {
  data: CallRow[];
  onSelectDate: (fecha: string) => void;
}

export default function CalendarSelection({ data, onSelectDate }: CalendarSelectionProps) {
  
  // 📊 1. Agrupar la suma total de llamadas globales que hay por cada fecha única
  const llamadasPorDia = data.reduce((acc: Record<string, number>, curr) => {
    // Aseguramos limpiar espacios o formatos raros de la fecha
    const fecha = curr.fechaRegistro.trim(); 
    acc[fecha] = (acc[fecha] || 0) + curr.totalLlamadas;
    return acc;
  }, {});

  // 🖱️ 2. Manejador al hacer clic en un cuadro/día del calendario
  const handleDateClick = (info: any) => {
    // Al hacer clic, info.dateStr nos da la fecha en formato "YYYY-MM-DD"
    onSelectDate(info.dateStr);
  };

  // 🎨 3. Función que renderiza e inyecta los estilos y números en cada celda del mes
  const handleDayCellDidMount = (info: any) => {
    // FullCalendar da la fecha del recuadro actual en info.date
    const año = info.date.getFullYear();
    const mes = String(info.date.getMonth() + 1).padStart(2, "0");
    const dia = String(info.date.getDate()).padStart(2, "0");
    const fechaCelda = `${año}-${mes}-${dia}`;

    const totalLlamadasHoy = llamadasPorDia[fechaCelda] || 0;

    // Solo si hay llamadas registradas en ese día, alteramos su diseño
    if (totalLlamadasHoy > 0) {
      // Si las llamadas globales del día son menores a 10, pintamos de rojo suave
      if (totalLlamadasHoy < 10) {
        info.el.style.backgroundColor = "rgba(239, 68, 68, 0.15)"; // Rojo Tailwind con opacidad
        info.el.style.border = "1px solid rgba(239, 68, 68, 0.4)";
      } else {
        // Opcional: Pintar de verde o azul si alcanzaron la meta comercial de >= 10
        info.el.style.backgroundColor = "rgba(34, 197, 94, 0.1)"; 
      }

      // Creamos la etiqueta de texto flotante para mostrar la sumatoria abajo del número del día
      const indicadorElemento = document.createElement("div");
      indicadorElemento.className = "text-[11px] font-bold mt-2 text-center text-foreground bg-background/60 rounded px-1 py-0.5 mx-2 shadow-sm border";
      indicadorElemento.innerText = `📞 ${totalLlamadasHoy} calls.`;
      
      // Inyectamos el elemento en el contenedor interno del día
      const dayFrame = info.el.querySelector(".fc-daygrid-day-frame");
      if (dayFrame) {
        dayFrame.appendChild(indicadorElemento);
      }
    }
  };

  return (
    <div className="p-4 bg-card rounded-xl shadow text-foreground">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="es" // Fuerza los meses y días a español automáticamente
        
        // Manejador de eventos y clics
        dateClick={handleDateClick} 
        dayCellDidMount={handleDayCellDidMount}
        
        themeSystem="standard"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "" // Limpiamos botones extras para mantenerlo compacto
        }}
      />
    </div>
  );
}