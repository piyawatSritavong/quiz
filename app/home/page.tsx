"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

const HomePage = () => {
  const [name, setName] = useState("");

  return (
    <div className="h-screen grid mx-auto items-center w-1/3">
      <div className="text-center">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-black h-20 text-center text-3xl"
        />

        {name ? (
          <Link href={`/home/quizs?name=${encodeURIComponent(name)}`}>
            <Button variant={"outline"} className="text-2xl h-20 mt-5">
              เริ่มทำแบบทดสอบ
            </Button>
          </Link>
        ) : (
          <Button variant={"outline"} className="text-xl leading-8 h-20 mt-5" disabled>
            ใส่ชื่อของคุณ 
            <br />
            เพื่อเริ่มทำแบบทดสอบ
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
