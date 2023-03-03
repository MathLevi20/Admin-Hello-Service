import Head from 'next/head'
import './globals.css'

export const metadata = {
  title: 'HelloService Admin',
  description: 'Pagina de Administração do aplicativo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
  <link rel="icon" type="image/svg+xml" href="/logo.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <body>{children}</body>
    </html>
  )
}
