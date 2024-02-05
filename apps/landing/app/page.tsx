import { Button, Container, Flex } from "@radix-ui/themes";
import Navbar from "./Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Container className="pt-12 px-4 md:px-0">
        <div className="flex flex-col md:flex-row justify-between">
          <Flex className="relative flex-grow gap-2 md:gap-5 mb-3" direction="column">
            <h1 className="text-5xl md:text-7xl font-bold">Manage Your Projects Efficiently</h1>
            <p className="text-lg md:text-xl text-zinc-500 font-medium">Keep track of your issues and tasks in one place.</p>
            <Link href={process.env.MANTIS_URL || ''} target="_blank">
              <Button className="w-fit text-lg md:text-xl p-5" radius="large">Get Early Access</Button>
            </Link>
          </Flex>
          <Image src='/hero.svg' width={1000} height={800} alt="hero" objectFit="cover"/>
        </div>
      </Container>
      <Container className="text-center relative  px-4 md:px-0">
        <div className="border-t-2 border-b-2 border-blue-600 left-0 bg-slate-100 w-full h-[55%] absolute z-[-1]"/>
        <Flex className="py-8 md:py-16" direction="column" gap="5">
          <h2 className="text-3xl md:text-6xl font-bold">An Intuitive Interface</h2>
          <p className="text-lg md:text-xl text-zinc-500 font-medium">Get a glimpse of our intuitive and user-friendly interface. Designed to make project management a breeze.</p>
          <div className="mt-1 md:mt-5 mx-auto rounded-md overflow-hidden">
            <Image src='/dashboard.png' width={1200} height={500} alt="dashboard" objectFit="cover"/>
          </div>            
        </Flex> 
      </Container>
      <div className="border-t-2 border-b-2 border-blue-600 left-0 bg-slate-100 p-4 md:p-5">
        <Container>
          <Flex justify="between" className="flex-col md:flex-row">
            <p className="text-sm text-zinc-500">© 2024 Mantis. All rights reserved.</p>
            <Flex className="mt-2 md:mt-0 text-sm text-zinc-500 underline gap-1 md:gap-4 flex-col md:flex-row">
              <Link href="#">Terms of Service</Link>
              <Link href="#">Privacy</Link>
              <Link href="http://www.freepik.com">Hero image designed by slidesgo / Freepik</Link>
            </Flex>
          </Flex>
        </Container>
      </div>
    </main>
  );
}
