"use client";

import { IPaper } from "@/types/quiz.type";
import React, { createContext, useContext, useState } from "react";

interface IPaperContext {
  paperState: IPaper | undefined;
  updateAnswerState: (
    questionId: string,
    selectedAnswer: string,
    question: string,
    userName: string
  ) => void;
  answerState: IPaper | undefined;
  updateSocre: (total: number) => void;
  totalScroe: number;
}

const PaperContext = createContext<IPaperContext | undefined>(undefined);

const questions = [
  {
    question: "ฮีโร่ตัวใดในเกม ROV ที่สามารถล่องหนได้?",
    options: ["Wukong", "Nakroth", "Zill"],
    correct: "Wukong",
  },
  {
    question: "ตำแหน่งใดที่เน้นการสร้างความเสียหายสูงสุดในทีม?",
    options: ["Tank", "Mage", "Carry"],
    correct: "Carry",
  },
  {
    question: "ไอเทมใดช่วยเพิ่มความเร็วในการเคลื่อนที่?",
    options: ["Blade of Eternity", "Frost Cape", "Hermes' Select"],
    correct: "Hermes' Select",
  },
  {
    question: "สกิล ultimate ของ Raz คืออะไร?",
    options: ["Explosive K.O.", "Power Surge", "Rising Uppercut"],
    correct: "Rising Uppercut",
  },
  {
    question: "ในโหมด 5v5 ตำแหน่งใดควรจะฟาร์มป่า?",
    options: ["Midlaner", "Jungler", "Support"],
    correct: "Jungler",
  },
];

const convertedPaper: IPaper = {
  id: "1",
  name: "ROV Quiz",
  paper: questions.map((q, index) => ({
    id: (index + 1).toString(),
    question: q.question,
    answer: q.options.map((option, optionIndex) => ({
      id: (index + 1).toString() + "_" + (optionIndex + 1).toString(),
      options: option,
      correct: option === q.correct,
    })),
  })),
};

export function PaperContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [paperState] = useState<IPaper | undefined>(convertedPaper);
  const [answerState, setAnswerState] = useState<IPaper | undefined>({
    id: convertedPaper.id,
    name: convertedPaper.name,
    paper: [],
    user: "",
  });
  const [totalScroe, setTotalScroe] = useState<number>(0);

  const updateAnswerState = (
    questionId: string,
    selectedAnswer: string,
    question: string,
    userName: string
  ) => {
    const currentAnswers = answerState?.paper || [];
    const questionIndex = currentAnswers.findIndex((q) => q.id === questionId);

    if (questionIndex > -1) {
      const updatedAnswers = [...currentAnswers];
      updatedAnswers[questionIndex].answer = [
        {
          id: selectedAnswer,
          options: selectedAnswer,
        },
      ];
      setAnswerState(
        (prev) =>
          prev && {
            ...prev,
            paper: updatedAnswers,
            user: userName,
          }
      );
    } else {
      setAnswerState(
        (prev) =>
          prev && {
            ...prev,
            paper: [
              ...currentAnswers,
              {
                id: questionId,
                question: question,
                answer: [
                  {
                    id: selectedAnswer,
                    options: selectedAnswer,
                  },
                ],
              },
            ],
            user: userName,
          }
      );
    }
  };

  const updateSocre = (total: number) => {
    setTotalScroe(total);
  };

  return (
    <PaperContext.Provider
      value={{ paperState, updateAnswerState, answerState, updateSocre, totalScroe }}
    >
      {children}
    </PaperContext.Provider>
  );
}

export function usePaperContext() {
  const context = useContext(PaperContext);

  if (context === undefined) {
    throw new Error(
      "usePaperContext must be used within a PaperContextProvider"
    );
  }

  return context;
}
