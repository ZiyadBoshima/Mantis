import { Heading } from "@radix-ui/themes"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <div className="pt-[10%] bg-slate-50 h-screen">
        <Heading align="center" size="9" mb="5" className="text-blue-700">Mantis</Heading>
        {children}
      </div>
    </main>
  )
}
