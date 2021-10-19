import React from "react";
import Main from "../Main";
import { Form } from "antd";
import { FormInstance } from "antd/lib/form";
import { ElementExamCreateForm, ElementExamCreateHeader } from "elements/exam";
import { NReduxProps } from "model/nredux";
import { NextRouter, useRouter } from "next/router";
interface ExamCreateProps {}
interface MainComponentProps {
  examForm: FormInstance<any>;
  router: NextRouter;
}
interface ComponentDidMountProps {
  router: NextRouter;
}
function onClickCreate(
  examForm: FormInstance<any>,
  action: any,
  router: NextRouter
) {
  const { day, hour, minute, second } = examForm.getFieldsValue();
  const exam_time =
    (day || 0) * 86400 +
    (hour || 0) * 3600 +
    (minute || 0) * 60 +
    (second || 0);
  if (router.query?.id) {
    action.koodle.putExam(
      { ...examForm.getFieldsValue(), exam_time },
      router.query.id
    );
  } else {
    action.koodle.postExam({ ...examForm.getFieldsValue(), exam_time });
  }
}

const ExamCreate: React.FC<ExamCreateProps> = (props) => {
  const [examForm] = Form.useForm();
  const router = useRouter();
  return (
    <Main>
      <ComponentDidMount router={router} />
      <MainComponent router={router} examForm={examForm} />
    </Main>
  );
};

function ComponentDidMount({
  action,
  router,
}: ComponentDidMountProps & NReduxProps) {
  React.useEffect(() => {
    if (router.query?.id) {
      action.koodle.getExam(null, router.query.id);
    }
  }, [router.query?.id]);
  return <></>;
}
function MainComponent({
  examForm,
  action,
  router,
  reducer,
}: MainComponentProps & NReduxProps) {
  const { exam } = reducer.koodle;
  const { loading_exam } = reducer.component;
  return (
    <div
      style={{
        flexDirection: "column",
        alignItems: "center",
        display: "flex",
      }}
    >
      <ElementExamCreateHeader router={router} />
      {router.query.id ? (
        !loading_exam && exam?.id ? (
          <ElementExamCreateForm
            router={router}
            onClickCreate={() => onClickCreate(examForm, action, router)}
            examForm={examForm}
            exam={exam}
          />
        ) : null
      ) : (
        <ElementExamCreateForm
          router={router}
          onClickCreate={() => onClickCreate(examForm, action, router)}
          examForm={examForm}
          exam={exam}
        />
      )}
    </div>
  );
}
export default ExamCreate;
