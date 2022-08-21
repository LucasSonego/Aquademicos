export interface IQuestion {
  id: string;
  points: number;
  description: string;
  type: "single" | "multi";
  answerOptions?: IAnswerOption[];
}

export interface IAnswerOption {
  id: string;
  text: string;
  selected: boolean;
}
