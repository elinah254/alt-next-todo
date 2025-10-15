import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "LynTasks",
  description: "Manage tasks and chat beautifully with LynTasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-[#fff8f0] via-[#fef3e2] to-[#fdecd4] min-h-screen text-[#4a2e16]">
        <Navbar />
        <main className="px-6 py-10">{children}</main>
      </body>
    </html>
  );
}





// import './globals.css'
// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Todo Next',
//   description: 'Todo app with Next.js App Router + Tailwind',
// }

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//           {children}
//         </main>
//       </body>
//     </html>
//   )
// }

