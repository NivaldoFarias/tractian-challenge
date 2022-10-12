import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { BsPersonBadge } from "react-icons/bs";
import { Button, Form, Input } from "antd";
import { BsBuilding, BsKey } from "react-icons/bs";
import { useEffect, useState } from "react";

import { Axios, routes } from "../hooks/axios";

export default function CreateUser() {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = async (values: any) => {
    const apiKey = values["x-api-key"];
    delete values["x-api-key"];

    try {
      await Axios.post(routes("users").create(), values, {
        headers: {
          "x-api-key": apiKey,
        },
      });
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
        <Form.Item
          name="company"
          rules={[{ required: true, message: "Please input your Company's Id!" }]}
        >
          <Input prefix={<BsBuilding className="site-form-item-icon" />} placeholder="Company Id" />
        </Form.Item>
        <Form.Item
          name="x-api-key"
          rules={[{ required: true, message: "Please input your Company's x-api-key!" }]}
        >
          <Input prefix={<BsKey className="site-form-item-icon" />} placeholder="x-api-key" />
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
              Create User
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
}
