import { Archivo, Inter, JetBrains_Mono } from 'next/font/google';

export const display = Archivo({
  subsets: ['latin'], weight: ['600', '700', '800', '900'],
  variable: '--font-display', display: 'swap',
});
export const body = Inter({
  subsets: ['latin'], weight: ['400', '500', '600'],
  variable: '--font-body', display: 'swap',
});
export const mono = JetBrains_Mono({
  subsets: ['latin'], weight: ['400', '500', '700'],
  variable: '--font-mono', display: 'swap',
});
