"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePaperContext } from "@/context/result.context";

const DashboardPage = () => {
  const { answerState, totalScroe } = usePaperContext();

  return (
    <div>
      <h1 className="text-xl">Dashboard</h1>
      <div className="flex h-screen justify-center rounded-lg border border-dashed shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] rounded-l-lg text-center">
                ID
              </TableHead>
              <TableHead className="text-center">ผู้ทำแบบทดสอบ</TableHead>
              <TableHead className="text-center">ชื่อแบบทดสอบ</TableHead>
              <TableHead className="rounded-r-lg text-center">
                คะแนนรวม
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="items-center text-center">
              <TableCell>{answerState?.id}</TableCell>
              <TableCell>{answerState?.name}</TableCell>
              <TableCell>{answerState?.user}</TableCell>
              <TableCell>{totalScroe}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardPage;
