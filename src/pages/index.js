import React from "react";
import { Card } from "antd";
import Main from "./Main";
export default function Home() {
  return (
    <Main>
      <Card title="wow">Test</Card>
      <ComponentDidMount />
      <MainComponent />
    </Main>
  );
}

function ComponentDidMount(props){
  const { action } = props;
  React.useEffect(() => {
    action.koodle.listExam();
  }, []);
  return <></>;
}
function MainComponent(props) {
  return <></>;
}