import { Pool } from 'pg';

console.log(' DATABASE_URL:', process.env.DATABASE_URL?.replace(/:([^@]+)@/, ':***@'));

const pool = new Pool({
  connectionString: "postgresql://javier_admin:javier2026@localhost:5433/codescrum_marketing",
});

export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
};

export const upsertCliente = async (numero: string, nombre: string): Promise<number> => {
  const res = await query(
    `INSERT INTO clientes (nombre, telefono) 
     VALUES ($1, $2) 
     ON CONFLICT (telefono) DO UPDATE 
     SET nombre = EXCLUDED.nombre, 
         actualizado_en = CURRENT_TIMESTAMP
     RETURNING id`,
    [nombre || 'Sin nombre', numero]
  );
  return res.rows[0].id;
};

// 💡 ASEGÚRATE DE QUE ESTA FUNCIÓN ESTÉ AQUÍ ADENTRO:
export const insertLlamada = async (call: any) => {
  const clienteId = await upsertCliente(call.numero, call.nombre);

  await query(
    `INSERT INTO registro_llamadas 
        (cliente_id, telefono, fecha, hora, duracion_segundos, estado, timestamp, device_id) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
     ON CONFLICT (telefono, timestamp) DO NOTHING`,
    [
      clienteId,
      call.numero,
      call.fecha,
      call.hora,
      call.duracion,
      call.estado,
      call.timestamp,
      call.deviceId || '',
    ]
  );
};