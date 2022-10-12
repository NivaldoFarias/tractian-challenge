import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { BsPersonBadge } from "react-icons/bs";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";

import { Axios } from "./../hooks/axios";

export default function Authentication() {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = async (values: any) => {
    try {
      await Axios.post("/auth/sign-in", values);
    } catch (error: any) {
      console.log(error);
      alert(
        (error.response?.data?.message ?? "Something went wrong") +
          ". " +
          (error.response?.data?.detail ?? "Please try again"),
      );
    }
  };

  return (
    <>
      <Form form={form} name="vertical-forms" layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="full_name"
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input
            prefix={<BsPersonBadge className="site-form-item-icon" />}
            placeholder="Full Name"
          />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Sign In
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
}
