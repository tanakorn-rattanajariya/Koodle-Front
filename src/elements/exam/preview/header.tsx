import React from "react";
import COLOR from "constants/color";
import { Typography } from "antd";
import moment from "moment";
import { Session } from "model/koodle";
import { ClockCircleOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;
interface ElementExamPreviewHeaderProps {
  session: Session;
  counter: number;
}
const ElementExamPreviewHeader: React.FC<ElementExamPreviewHeaderProps> = ({
  session,
  counter,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: 100,
        backgroundColor: COLOR.LIGHT_GREY,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Title level={4}>{session?.exam?.name}</Title>
      {session?.start_time && (
        <Text>{moment(session?.start_time).format("LLL")}</Text>
      )}
      <Text>
        <ClockCircleOutlined style={{ color: COLOR.RED, marginRight: 8 }} />
        {session?.status === "COMPLETE"
          ? "Time out"
          : `${
              counter > 86400 ? `${Math.floor(counter / 86400)} Day(s)` : ""
            } ${moment.utc(counter * 1000).format("HH:mm:ss")}`}
      </Text>
    </div>
  );
};
export default ElementExamPreviewHeader;
