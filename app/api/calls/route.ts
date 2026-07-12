import { NextResponse } from "next/server";
import { query, insertLlamada } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from") || "2026-07-01";
    const to = searchParams.get("to") || "2026-07-30";

    console.log(`🔍 Consultando llamadas en Postgres desde ${from} hasta ${to}`);

    const queryText = `
      SELECT 
        COALESCE(c.nombre, 'Sin nombre') AS nombre,
        rl.telefono AS numero,
        COUNT(rl.id)::int AS "totalLlamadas",
        rl.fecha::text AS "fechaRegistro"
      FROM registro_llamadas rl
      LEFT JOIN clientes c ON rl.cliente_id = c.id
      WHERE rl.fecha BETWEEN $1 AND $2
      GROUP BY c.nombre, rl.telefono, rl.fecha
      ORDER BY rl.fecha DESC;
    `;

    const result = await query(queryText, [from, to]);

    return NextResponse.json({
      success: true,
      grouped: result.rows || []
    });

  } catch (error: any) {
    console.error("❌ ERROR INTERNO EN GET /api/calls:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error", detalle: error.message }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 💡 CAPTURA CORRECTA: Mapeamos body.nombre (enviado por Flutter) en vez de body.nombre_contacto
    const nombreRecibido = body.nombre || body.nombre_contacto || 'Sin nombre';
    const numeroRecibido = body.numero || '';

    // 🔥 ACTUALIZACIÓN EN CALIENTE: Si el nombre actual en Postgres es "Sin nombre", lo sobreescribimos con el real de Capsule
    if (nombreRecibido !== 'Sin nombre' && numeroRecibido.isNotEmpty) {
      await query(
        `UPDATE clientes SET nombre = $1, actualizado_en = NOW() WHERE telefono = $2 AND (nombre = 'Sin nombre' OR nombre IS NULL)`,
        [nombreRecibido, numeroRecibido]
      );
    }

    // Inserción o mapeo tradicional usando tu función nativa
    await insertLlamada({
      numero: numeroRecibido,
      nombre: nombreRecibido, 
      fecha: body.fecha || '',
      hora: body.hora || '',
      duracion: parseInt(body.duracion || "0", 10),
      estado: body.estado || 'Respondida',
      timestamp: parseInt(body.timestamp || Date.now().toString(), 10),
      deviceId: body.deviceId || body.device_id || 'dispositivo_movil'
    });

    return NextResponse.json({ success: true, message: "Llamada e historial sincronizados correctamente" }, { status: 201 });

  } catch (error: any) {
    console.error("❌ ERROR INTERNO EN POST /api/calls:", error);
    return NextResponse.json(
      { success: false, error: "Error al procesar la llamada", detalle: error.message }, 
      { status: 500 }
    );
  }
}