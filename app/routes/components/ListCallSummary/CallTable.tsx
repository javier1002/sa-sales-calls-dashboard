// Muestra de forma organizada los datos filtrados: Nombre, Teléfono, Número de llamadas por día y la Fecha.
"use client";

// 1. Modificamos la interfaz para que coincida EXACTAMENTE con el JSON de tu API de Postgres
interface CallData {
  nombre: string;
  numero: string;
  totalLlamadas: number;
  fechaRegistro: string;
  duracionTotal?: number; // Opcional, por si quieres usarlo luego
}

interface CallTableProps {
  data: CallData[];
}

export function CallTable({ data }: CallTableProps) {
  return (
    <div className="w-full overflow-hidden border rounded-xl bg-card shadow-sm text-foreground">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-muted text-muted-foreground font-medium border-b">
            <tr>
              <th className="p-4">Nombre del Cliente</th>
              <th className="p-4">Teléfono</th>
              <th className="p-4 text-center">Llamadas / Día</th>
              <th className="p-4">Fecha Registro</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                  No se encontraron registros de llamadas para los filtros seleccionados.
                </td>
              </tr>
            ) : (
              // 2. Usamos 'numero' (el teléfono) como key única ya que no viene un ID por el GROUP BY
              data.map((row) => (
                <tr 
        key={`${row.numero}-${row.fechaRegistro}`} 
        className="hover:bg-accent/40 transition-colors"
      >
        {/* Mapeamos las propiedades en español */}
        <td className="p-4 font-medium text-foreground">{row.nombre}</td>
        <td className="p-4 text-muted-foreground">{row.numero}</td>
        <td className="p-4 text-center">
          <span className="inline-flex items-center justify-center bg-primary/10 text-primary font-semibold text-xs px-2.5 py-1 rounded-full">
            {row.totalLlamadas} llamadas
          </span>
        </td>
        <td className="p-4 text-muted-foreground">{row.fechaRegistro}</td>
      </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}