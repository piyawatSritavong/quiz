"use client";

import Link from "next/link";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { usePaperContext } from "@/context/result.context";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const QuizPage = () => {
  const { paperState, updateAnswerState } = usePaperContext();
  const param = useSearchParams();
  const nameParam = param.get("name");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (paperState) {
      const currentQuestion = paperState.paper[currentQuestionIndex];
      updateAnswerState(
        currentQuestion.id,
        selectedAnswer,
        currentQuestion.question,
        nameParam || ""
      );
    }

    setSelectedAnswer("");
    setIsAnswered(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  if (!paperState) {
    return <div>Loading...</div>;
  }

  const currentQuestion = paperState.paper[currentQuestionIndex];

  return (
    <div className="h-screen grid text-center mx-auto items-center w-1/3">
      <div>
        {/* ตรวจสอบว่าข้อปัจจุบันยังมีอยู่ใน paper หรือไม่ */}
        {currentQuestionIndex < paperState.paper.length ? (
          <>
            <h3 className="text-2xl mb-4">{currentQuestion.question}</h3>
            <RadioGroup
              value={selectedAnswer}
              onValueChange={handleAnswerSelect}
              className=" flex justify-between mx-auto"
            >
              {currentQuestion.answer.map((option) => (
                <div key={option.options}>
                  <RadioGroupItem
                    id={option.id}
                    value={option.options}
                    className="me-2"
                  />
                  <Label htmlFor={option.id}>{option.options}</Label>
                </div>
              ))}
            </RadioGroup>

            {currentQuestionIndex < paperState.paper.length - 1 ? (
              <Button
                onClick={handleNextQuestion}
                disabled={!isAnswered}
                className="mt-4"
              >
                ถัดไป
              </Button>
            ) : (
              <Link href={"/results"}>
                <Button onClick={handleNextQuestion} className="mt-4">
                  ผลคะแนน
                </Button>
              </Link>
            )}
          </>
        ) : (
          <div>ไม่พบคำถาม</div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
