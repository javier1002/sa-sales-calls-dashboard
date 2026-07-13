import type { Metadata } from 'next'
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Geist, Geist_Mono, Noto_Sans_Display } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// 🎨 Cargamos Noto Sans Display para un look moderno en títulos y textos del dashboard
const notoSansDisplay = Noto_Sans_Display({ 
  subsets: ['latin'],
  variable: '--font-noto-display'
})

export const metadata: Metadata = {
  title: 'Dashboard de Control de Llamadas',
  description: 'Monitorea y exporta el volumen de gestión comercial B2B',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      {/* 🌟 Inyectamos las fuentes y cambiamos el fondo global a un gris claro/limpio en lugar de negro */}
      <body className={`${geistSans.variable} ${geistMono.variable} ${notoSansDisplay.variable} font-sans bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col`}>
        <ClerkProvider>
          {/* 💻 Barra de navegación superior estilizada */}
          <header className="flex justify-between items-center px-6 bg-white border-b border-slate-200 h-16 shadow-xs sticky top-0 z-50">
            <div className="flex items-center gap-2">
              
            </div>

            <div className="flex items-center gap-4">
              <Show when="signed-out">
                {/* Botón de inicio de sesión limpio */}
                <SignInButton>
                  <button className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
                    Iniciar Sesión
                  </button>
                </SignInButton>
                
                {/* Tu botón rosa de Sign Up estilizado */}
                <SignUpButton>
                  <button className="bg-[#E63380] hover:bg-[#d02870] text-white rounded-lg font-medium text-sm h-10 px-4 transition-all shadow-xs cursor-pointer">
                    Registrarse
                  </button>
                </SignUpButton>
              </Show>
              
              <Show when="signed-in">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-muted-foreground hidden sm:inline-block">
                    {/* 🌟 Mostramos el email del usuario logueado en la barra superior */}
                  </span>
                  <UserButton />
                </div>
              </Show>
            </div>
          </header>

          {/* 🧩 El contenido de cada página (Dashboard, Histórico, 404) se renderiza aquí abajo */}
          <div className="flex-1 w-full">
            {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  )
}