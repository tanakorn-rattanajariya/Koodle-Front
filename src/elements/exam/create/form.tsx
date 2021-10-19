import React from "react";
import { Input, Form, InputNumber, Button, Row, Col, Typography } from "antd";
const { Text } = Typography;
import { FormInstance } from "antd/lib/form";
import { NextRouter } from "next/router";
import { Exam } from "model/koodle";
import moment from "moment";
interface ElementExamCreateFormProps {
  examForm: FormInstance<any>;
  onClickCreate: () => void;
  exam: Exam;
  router: NextRouter;
}
const ElementExamCreateForm: React.FC<ElementExamCreateFormProps> = ({
  examForm,
  onClickCreate,
  exam,
  router,
}) => {
  return (
    <Form
      layout="vertical"
      form={examForm}
      initialValues={
        exam
          ? {
              ...exam,
              day: Math.floor(exam?.exam_time / 86400),
              hour: Math.floor((exam?.exam_time % 86400) / 3600),
              minute: Math.floor(((exam?.exam_time % 86400) % 3600) / 60),
              second: Math.floor((exam?.exam_time % 86400) % 60),
            }
          : {}
      }
      style={{ width: "100%", maxWidth: 350 }}
    >
      <Form.Item label="Name" name="name">
        <Input size="large" placeholder="React Frontend Test" />
      </Form.Item>
      <Form.Item label="iframe" name="exam_uri">
        <Input.TextArea
          autoSize
          size="large"
          placeholder={`<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdyxSeE-abpucBgulyat8Nz_inE1YVW8LTMfouteN0yXXwY0A/viewform?embedded=true" width="640" height="375" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>`}
        />
      </Form.Item>
      <div style={{ marginBottom: 8 }}>
        <Text>Examination Time</Text>
      </div>

      <Row gutter={8}>
        <Col span={6}>
          <Form.Item name="day">
            <InputNumber
              style={{ width: "100%" }}
              size="large"
              placeholder={"day"}
              min={0}
              max={100}
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item name="hour">
            <InputNumber
              style={{ width: "100%" }}
              size="large"
              placeholder={"hour"}
              min={0}
              max={24}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="minute">
            <InputNumber
              style={{ width: "100%" }}
              size="large"
              placeholder={"minute"}
              min={0}
              max={60}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="second">
            <InputNumber
              style={{ width: "100%" }}
              size="large"
              placeholder={"second"}
              min={0}
              max={60}
            />
          </Form.Item>
        </Col>
      </Row>

      <Button
        onClick={onClickCreate}
        type="primary"
        size="large"
        style={{ width: "100%" }}
      >
        {`${router.query?.id ? "Save" : "Create New"}`}
      </Button>
    </Form>
  );
};
export default ElementExamCreateForm;
