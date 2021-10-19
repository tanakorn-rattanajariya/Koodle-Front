import React from "react";
import { Typography } from "antd";
const { Title } = Typography;
import COLOR from "constants/color";
import { NextRouter } from "next/router";
interface ElementExamCreateHeaderProps {
  router: NextRouter;
}
const ElementExamCreateHeader: React.FC<ElementExamCreateHeaderProps> = ({
  router,
}) => {
  return (
    <div
      style={{
        backgroundColor: COLOR.LIGHT_GREY,
        width: "100%",
        marginBottom: 24,
        height: 100,
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Title level={2}>{`${
        router.query?.id ? "Edit" : "Create"
      } an Examination`}</Title>
    </div>
  );
};
export default ElementExamCreateHeader;
