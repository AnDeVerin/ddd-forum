import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, Input } from 'antd';
import Title from 'antd/es/typography/Title';

import { useUserSetter } from '@/utils/hooks/useUserSetter';
import { ErrorTexts } from '@/utils/constants/errors';
import {
  UserRegistrationData,
  UserRegistrationResponse,
} from './RegistrationPage.types';

import styles from './RegistrationPage.module.css';

const HOST = import.meta.env.VITE_SERVER_URL;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const onFinish = async (
  values: UserRegistrationData
): Promise<UserRegistrationResponse> => {
  const responce = await fetch(`${HOST}/users/new`, {
    method: 'POST',
    headers: [['Content-Type', 'application/json; charset=utf-8']],
    body: JSON.stringify(values),
  });

  return responce.json();
};

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserSetter();

  const handleSubmit = useCallback(
    async (values: UserRegistrationData) => {
      setIsLoading(true);
      const { success, data, error } = await onFinish(values);

      if (success && data) {
        toast('Success! Redirecting home.', {
          autoClose: 3000,
          type: 'success',
        });
        setUser(data); // setUser is a function that sets the user in the context (App.tsx
        setTimeout(() => navigate('/'), 3000);
      } else {
        const errorMessage = error ? ErrorTexts[error] : 'Unknown error';
        toast(errorMessage, { type: 'error' });
        setIsLoading(false);
      }
    },
    [navigate, setUser]
  );

  return (
    <div className={styles.container}>
      <Form<UserRegistrationData>
        {...formItemLayout}
        name="register"
        onFinish={handleSubmit}
        autoComplete="off"
        disabled={isLoading}
      >
        <Form.Item colon={false} label=" ">
          <Title level={2} style={{ textAlign: 'start', margin: 0 }}>
            Create Account
          </Title>
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="firstName"
          label="First name"
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last name"
          rules={[
            {
              required: true,
              message: 'Please input your last name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item colon={false} label=" ">
          <div style={{ textAlign: 'start' }}>
            Already have an account?
            <br />
            <Button type="link" style={{ padding: 0 }} disabled={false}>
              Login
            </Button>
          </div>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
            disabled={false}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
