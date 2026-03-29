import type { Metadata } from 'next'
import { MotionProvider } from '@/components/MotionProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Eco Kernelios | Ecological Transformation Narrative',
  description:
    'A single-page ecological architecture presentation through cinematic comparison, reimagined spaces, environmental impact, and student voices.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background font-sans text-text-primary antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
