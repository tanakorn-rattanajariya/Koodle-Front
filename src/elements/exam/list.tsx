import { Exam } from "model/koodle";
import React from "react";
import { List, Button } from "antd";
interface ElementExamListProps {
  exams: Array<Exam>;
  onClickTakeExam: (item: Exam) => void;
  onClickDelete: (item: Exam) => void;
  onClickEdit: (item: Exam) => void;
}
const ElementExamList: React.FC<ElementExamListProps> = ({
  exams,
  onClickTakeExam,
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <List
      bordered
      dataSource={exams}
      renderItem={(item: Exam) =>
        renderItem(item, onClickTakeExam, onClickDelete, onClickEdit)
      }
    />
  );
};
function renderItem(
  item: Exam,
  onClickTakeExam: (item: Exam) => void,
  onClickDelete: (item: Exam) => void,
  onClickEdit: (item: Exam) => void
) {
  const _onClickTakeExam = () => {
    onClickTakeExam(item);
  };
  const _onClickDelete = () => {
    onClickDelete(item);
  };
  const _onClickEdit = () => {
    onClickEdit(item);
  };
  const _onClickSession = () => {};
  return (
    <List.Item
      style={{
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
        margin: "8px 0",
      }}
    >
      <div> {item.name}</div>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-evenly",
          gap: 8,
        }}
      >
        <Button onClick={_onClickDelete} type="dashed" size="small">
          Delete
        </Button>
        <Button onClick={_onClickSession} size="small">
          Session
        </Button>
        <Button onClick={_onClickEdit} size="small">
          Edit
        </Button>
        <Button onClick={_onClickTakeExam} size="small">
          Test
        </Button>
      </div>
    </List.Item>
  );
}
export default ElementExamList;
