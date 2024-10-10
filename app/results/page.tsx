"use client";

import { Button } from "@/components/ui/button";
import { usePaperContext } from "@/context/result.context";
import Link from "next/link";

const ResultPage = () => {
  const { paperState, answerState, updateSocre } = usePaperContext();

  if (!paperState || !answerState) {
    return <div>Loading...</div>;
  }

  const calculateScore = () => {
    let score = 0;

    paperState.paper.forEach((question, index) => {

      const correctOption = question.answer.find((option) => option.correct);

      if (correctOption) {
        const correctAnswer = correctOption.options;

        const userSelected = answerState.paper[index].answer[0].options;

        if (userSelected === correctAnswer) {
          score += 1;
        }
      }
    });

    return score;
  };

  const totalScore = calculateScore();
  updateSocre(totalScore)

  return (
    <div className="h-screen grid text-center mx-auto items-center w-1/3">
      <h1 className="text-3xl mb-4">ผลคะแนน</h1>
      {paperState.paper.map((question, index) => {

        const correctOption = question.answer.find((option) => option.correct);
        const correctAnswer = correctOption
          ? correctOption.options
          : "ไม่มีคำตอบที่ถูกต้อง";

        const userSelected = answerState.paper[index].answer[0].options;

        const isCorrect = userSelected === correctAnswer;

        return (
          <div key={question.id} className="mb-4">
            <h3 className="text-2xl">
              {index + 1}. {question.question}
            </h3>
            <p>คำตอบของคุณ: {userSelected}</p>
            <p>
              คำตอบที่ถูกต้อง: {correctAnswer}{" "}
              <span
                className={`${isCorrect ? "text-green-600" : "text-red-600"}`}
              >
                {isCorrect ? "(ถูก)" : "(ผิด)"}
              </span>
            </p>
          </div>
        );
      })}

      <h2 className="text-2xl mt-6">
        คะแนนรวม: {totalScore} / {paperState.paper.length}
      </h2>

      <Link href={"/admin/dashboard"}>
        <Button>ดูลำดับของคุณ</Button>
      </Link>
    </div>
  );
};

export default ResultPage;
