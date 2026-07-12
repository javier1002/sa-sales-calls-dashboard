
CREATE TABLE IF NOT EXISTS clientes (
     id SERIAL PRIMARY KEY, 
     nombre VARCHAR(150) NOT NULL,
     telefono VARCHAR(30),
     origen_datos VARCHAR(50) DEFAULT 'android_app'
     creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    
     CONSTRAINT unco_cliente_data UNIQUE (telefono)
);


CREATE TABLE IF NOT EXISTS registro_llamadas (
    id SERIAL PRIMARY KEY,
    cliente_id VARCHAR(100) REFERENCES clientes(id) ON DELETE CASCADE,
    telefono VARCHAR(30) NOT NULL,
    fecha DATE NOT NULL,
    hora TIME,
    duracion_segundos INT DEFAULT 0,
    estado VARCHAR(50),
    timestamp BIGINT,
    device_id VARCHAR(100) DEFAULT '',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unco_cliente_fecha_hora UNIQUE (telefono, timestamp)
);

CREATE INDEX IF NOT EXISTS idx_llamadas_fecha ON registro_llamadas(fecha);
CREATE INDEX IF NOT EXISTS idx_clientes_nombre ON clientes(LOWER(nombre));
CREATE INDEX IF NOT EXISTS idx_llamadas_telefono ON registro_llamadas(telefono);