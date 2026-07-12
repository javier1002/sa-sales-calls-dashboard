import React from 'react'

export default function LayoutAuth({ children}: {children: React.ReactNode}) {
    return (
    <div className="flex flex-col justify-center h-full items-center">
        <p className="text-2xl mb-3" style={{ color: '#E63380' }}>
          CodeScrum Dashboard
        </p>
        <h1 className="text-3xl font-bold my-2">Bienvenido al Dashboard!</h1>
        {/* <p className="text-2xl mb-3">Inicia sesión para acceder a tu cuenta</p> */}
        <h2 className="text-2xl mb-3">Inicia sesión para acceder a tu cuenta</h2>
    
    {children}
    </div>
    )
}