import { Form, Input, Button, Row, Card, Spin, Typography, Image, Col } from "antd";
import TextLoop from "react-text-loop";
import { Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { volcano6 } from "@/components/style-variables";
import { useTypedSelector } from "@/client-state/store";
import { sesoLogoGreen100x100 } from "@/components/assets";
import * as ducks from "@/client-state/ducks";
import { actionCreators } from "@/client-state/store";
import SignupForm from "./signup-form";
import "./auth.module.less";

const Orange = ({ children }) => <span style={{ color: volcano6 }}>{children}</span>;
const LoginForm = () => {
  const isFetching = useTypedSelector(ducks.apiClient.selectors.isFetching(ducks.apiClient.actions.loginUser));

  const onLogin = async (values) => {
    return actionCreators.userAccount.loginUser({
      email: values.email,
      password: values.password,
    });
  };
  return (
    <Form layout="vertical" className="seso-flex-col seso-justify-center" onFinish={onLogin}>
      <Typography.Title level={5}>Login</Typography.Title>
      {isFetching ? (
        <Spin size="large" />
      ) : (
        <>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <p className="auth-form-toggle-link text-align-center">
            <Link to="/signup">Need an account?</Link>
          </p>
        </>
      )}
    </Form>
  );
};

const AuthForms = () => {
  return (
    <Row className="auth-page">
      <Col span={8} className="auth-card-container">
        <Card className="auth-form-card">
          <img src={sesoLogoGreen100x100} />
          <Switch>
            <Route path="/signup">
              <SignupForm />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
          </Switch>
        </Card>
      </Col>
      <div className="splash">
        <Row>
          <div className="splash-text margin-bottom-xlarge">Our mission is&nbsp;</div>
        </Row>
        <TextLoop interval={5000} className="margin-bottom-xxlarge">
          <Row>
            <div className="splash-text margin-bottom-xlarge">
              to streamline the <Orange>H-2A</Orange> process.
            </div>
          </Row>
          <Row>
            <div className="splash-text margin-bottom-xlarge">
              to help you manage your <Orange>workforce</Orange>.
            </div>
          </Row>
          <Row>
            <div className="splash-text margin-bottom-xlarge">
              to help you stay <Orange>compliant</Orange>.
            </div>
          </Row>
        </TextLoop>
      </div>
    </Row>
  );
};
export default AuthForms;
