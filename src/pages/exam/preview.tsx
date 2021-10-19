import React from "react";
import Main from "../Main";
import { NReduxProps } from "model/nredux";
import { Exam } from "model/koodle";
import { Spin, Button } from "antd";
import { useRouter, NextRouter } from "next/router";
import { ElementExamPreviewHeader } from "elements/exam";
import { Session } from "model/koodle";
import moment from "moment";
interface ExamProps {}
interface ComponentDidMountProps {
  router: NextRouter;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  counter: number;
}
interface MainComponentProps {
  counter: number;
  router: NextRouter;
}

function onClickStart(action: any, router: NextRouter) {
  action.koodle.putSession(
    { start_time: moment().toISOString(), status: "DOING" },
    router.query.id
  );
}
function onTimeout(action: any, router: NextRouter) {
  action.koodle.putSession({ status: "COMPLETE" }, router.query.id);
}

const ExamPreview: React.FC<ExamProps & NReduxProps> = (props) => {
  const router = useRouter();
  const [counter, setCounter] = React.useState<number>(-1);
  return (
    <Main>
      <ComponentDidMount
        counter={counter}
        setCounter={setCounter}
        router={router}
      />
      <MainComponent router={router} counter={counter} />
    </Main>
  );
};
function ComponentDidMount({
  action,
  router,
  setCounter,
  counter,
  reducer,
}: ComponentDidMountProps & NReduxProps) {
  const session: Session = reducer.koodle.session;
  React.useEffect(() => {
    if (router.query?.id) {
      action.koodle.getSession(null, router.query?.id);
    }
  }, [router.query?.id]);
  React.useEffect(() => {
    if (session?.exam) {
      if (session?.status === "DOING") {
        setCounter(
          session?.exam?.exam_time -
            moment
              .duration(moment().diff(moment(session?.start_time)))
              .asSeconds()
        );
      } else {
        setCounter(session?.exam.exam_time);
      }
    }
  }, [session]);
  React.useEffect(() => {
    if (counter > 0 && session?.status === "DOING") {
      setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    } else if (counter <= 0 && session?.status === "DOING") {
      onTimeout(action, router);
    }
    return () => {};
  }, [counter, session]);
  return <></>;
}
function MainComponent({
  action,
  reducer,
  counter,
  router,
}: MainComponentProps & NReduxProps) {
  const session: Session = reducer.koodle.session;
  return session?.exam?.exam_uri ? (
    <div>
      <ElementExamPreviewHeader counter={counter} session={session} />
      {session?.status === "WAITING" && (
        <Button
          onClick={() => onClickStart(action, router)}
          type="primary"
          size="large"
          style={{ width: "100%", marginTop: 16 }}
        >
          Start Exam
        </Button>
      )}
      {session?.status === "DOING" && (
        <div
          style={{
            height: "calc(100vh - 200px)",
            position: "relative",
            marginTop: 24,
          }}
          dangerouslySetInnerHTML={{
            __html: session?.exam?.exam_uri,
          }}
        />
      )}
    </div>
  ) : (
    <Spin />
  );
}
export default ExamPreview;
