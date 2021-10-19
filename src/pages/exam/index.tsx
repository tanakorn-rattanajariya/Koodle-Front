import React from "react";
import Main from "../Main";
import { Button, Typography, Input } from "antd";
import moment from "moment";
const { Title } = Typography;
import { NReduxProps } from "model/nredux";
import { ElementExamList } from "elements/exam";
import router, { useRouter, NextRouter } from "next/router";
import { Exam } from "model/koodle";
interface ExamProps {}
interface ComponentDidMountProps {}
interface MainProps {
  router: NextRouter;
}
function onClickEdit(router: NextRouter, exam: Exam) {
  router.push("/exam/create", {
    pathname: "/exam/create",
    query: {
      id: exam.id,
    },
  });
}
function onClickCreate(router: NextRouter) {
  router.push("/exam/create");
}
function onClickDelete(action: any, exam: Exam) {
  action.koodle.deleteExam(exam.id);
}
function onClickTakeExam(action: any, router: NextRouter, exam: Exam) {
  action.koodle.postSession({ exam_id: exam.id }, null, {
    isback: false,
  });
  // router.push("/exam/preview", {
  //   pathname: "/exam/preview",
  //   query: {
  //     id: exam.id,
  //   },
  // });
}

const ExamPage: React.FC<ExamProps & NReduxProps> = (props) => {
  const router = useRouter();
  return (
    <Main>
      <ComponentDidMount />
      <MainComponent router={router} />
    </Main>
  );
};
function ComponentDidMount({ action }: ComponentDidMountProps & NReduxProps) {
  React.useEffect(() => {
    action.koodle.clearExam();
    action.koodle.listExam();
  }, []);
  return <></>;
}
function MainComponent({ reducer, router, action }: MainProps & NReduxProps) {
  const { exams } = reducer.koodle;
  return (
    <>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
          gap: 16,
        }}
      >
        <div style={{ flexDirection: "row", display: "flex", gap: 16 }}>
          <div>
            <Title level={4}>Exams</Title>
          </div>
        </div>
        <div style={{ flexDirection: "row", display: "flex", gap: 16 }}>
          <div style={{ flexBasis: 400 }}>
            <Input.Search />
          </div>
          <Button type="primary" onClick={() => onClickCreate(router)}>
            Create
          </Button>
        </div>
      </div>
      <ElementExamList
        exams={exams}
        onClickTakeExam={(exam: Exam) => onClickTakeExam(action, router, exam)}
        onClickDelete={(exam: Exam) => onClickDelete(action, exam)}
        onClickEdit={(exam: Exam) => onClickEdit(router, exam)}
      />
    </>
  );
}

export default ExamPage;
