export interface Exam {
  id: string;
  name: string;
  exam_uri: string;
  exam_time: number;
}
export interface Session {
  start_time: string;
  exam: Exam;
  status: STATUS;
}

type STATUS = "WAITING" | "DOING" | "COMPLETE";
