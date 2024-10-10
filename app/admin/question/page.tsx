"use client";

import { Button } from "@/components/ui/button";

const QuestionPage = () => {
  return (
    <div>
      <h1 className="text-xl">Question</h1>
      <div className="flex h-screen items-center justify-center rounded-lg border border-dashed shadow-sm">
        <Button className="h-16 w-80 text-xl">Create Question</Button>
      </div>
    </div>
  );
};

export default QuestionPage;
