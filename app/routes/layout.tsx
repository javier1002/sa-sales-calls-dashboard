import React from 'react';
import { Navbar } from './components/Navbar/Navbar'; // Asegúrate de que esta ruta relativa sea correcta

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}