// src/app/layout.js
import Providers from '../components/providers';

export const metadata = {
    title: 'Next.js',
    description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <title>{process.env.title}</title>
                <link 
                    href="https://cdn.jsdelivr.net/npm/tailwindcss@2.0.2/dist/tailwind.min.css"
                    rel="stylesheet" 
                />
            </head>
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
