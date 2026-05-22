"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();
  return(
    <div className="flex-row justify-center gap-y-10">
      <Image
        src={theme === "light" ? "/theme_white.png" : "/theme.png"}
        alt="Logo"
        width={1200}
        height={750}
        className="h-auto w-screen"
      />
      <p className="px-8 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio commodi quibusdam, voluptas nihil vitae maiores id reprehenderit nemo omnis doloribus aliquid hic nam recusandae quos quod quia qui, iure sapiente?
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis inventore voluptatibus consequatur velit quo delectus quia sunt, hic placeat possimus magni cum assumenda aspernatur magnam molestiae nostrum ad impedit quis.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima, magni iusto ipsum nulla vero non exercitationem ipsa voluptatibus id fuga aliquid at fugit quaerat eos quasi, illum totam alias natus?
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda consequatur neque, saepe molestias recusandae tempora est, deserunt dignissimos, temporibus impedit similique esse! Natus, dignissimos praesentium quaerat facilis eius mollitia itaque.
      </p>
    </div>
      
  ) 
}
