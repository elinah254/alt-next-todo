import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Alt Next TS',
  description: 'Migrated app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="p-4 border-b">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold">Alt Next TS</h1>
            <nav>
              <a className="mr-4" href="/">Home</a>
              <a className="mr-4" href="/todos">Todos</a>
            </nav>
          </div>
        </header>
        <main className="max-w-4xl mx-auto p-4">{children}</main>
      </body>
    </html>
  )
}
