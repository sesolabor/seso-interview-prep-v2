import { useCallback, useRef } from "react";
import { Form, Input, Button, Spin, Typography, Row, Col, Carousel, Select } from "antd";
import { Link } from "react-router-dom";
import { PhoneNumberInput, PlacesAutocompleteInput } from "@/components/inputs";
import { usePlacesAutocompleteValidatorRule } from "@/components/inputs/places-autocomplete";
import { sizes } from "@/components/style-variables";
import { useTypedSelector } from "@/client-state/store";
import { orgTypes } from "@/repositories/constants";
import * as ducks from "@/client-state/ducks";
import { actionCreators } from "@/client-state/store";

const emailNamePath = ["user", "email"];
const passwordNamePath = ["user", "password"];
const passwordConfirmationNamePath = ["user", "passwordConfirmation"];
const firstNamePath = ["user", "firstName"];
const lastNamePath = ["user", "lastName"];
const userDetailFormItemFields = [
  firstNamePath,
  lastNamePath,
  emailNamePath,
  passwordNamePath,
  passwordConfirmationNamePath,
];

const UserDetailFormItems = () => {
  return (
    <>
      <Row gutter={sizes.small}>
        <Col span={12}>
          <Form.Item
            label="First Name"
            name={["user", "firstName"]}
            rules={[{ required: true, message: "Please input your first name." }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Last Name"
            name={["user", "lastName"]}
            rules={[{ required: true, message: "Please input your last name." }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Email" name={emailNamePath} rules={[{ required: true, message: "Please input your email!" }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name={passwordNamePath}
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Password Confirmation"
        name={passwordConfirmationNamePath}
        rules={[
          { required: true, message: "Please input your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue(["user", "password"]) === value) {
                return Promise.resolve();
              }
              return Promise.reject("The two passwords that you entered do not match!");
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
    </>
  );
};

const BusinessDetailFormItems = () => {
  const placesAutocompleteValidatorRule = usePlacesAutocompleteValidatorRule("Please select a valid address.");
  return (
    <>
      <Form.Item
        label="Business name"
        name={["enterprise", "legalName"]}
        rules={[{ required: true, message: "Please input your business name." }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Business type"
        name={["enterprise", "orgType"]}
        rules={[{ required: true, message: "Please input your business type." }]}
      >
        <Select>
          <Select.Option value={orgTypes.FLC}>FLC</Select.Option>
          <Select.Option value={orgTypes.GROWER}>Grower</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Business address" name={["enterprise", "address"]} rules={[placesAutocompleteValidatorRule]}>
        <PlacesAutocompleteInput />
      </Form.Item>

      <Row gutter={sizes.small}>
        <Col span={12}>
          <Form.Item
            label="Job Title"
            name={["user", "jobTitle"]}
            rules={[{ required: true, message: "Please input your job title." }]}
          >
            <Input placeholder="eg. Foreman" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Phone Number"
            name={["user", "phoneNumber"]}
            rules={[{ required: true, message: "Please input your phone number." }]}
          >
            <PhoneNumberInput />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

const SignupForm = () => {
  const isFetching = useTypedSelector(
    ducks.apiClient.selectors.isFetching(ducks.apiClient.actions.createUserAndEnterprise)
  );
  const carouselRef = useRef({ slider: null });
  const [form] = Form.useForm();

  const onSignup = async (values) => {
    values.enterprise.addressDescription = values.enterprise.address.description;
    values.enterprise.addressPlaceId = values.enterprise.address.placeId;
    return actionCreators.userAccount.createUserAndEnterprise({
      user: values.user,
      enterprise: values.enterprise,
    });
  };

  const goToNext = useCallback(() => {
    form
      .validateFields(userDetailFormItemFields)
      .then(() => {
        carouselRef.current.slider.goTo(1);
      })
      .catch((errorInfo) => {
        if (errorInfo.errorFields.length) {
          form.scrollToField(errorInfo.errorFields[0].name);
        }
      });
  }, [form, carouselRef]);

  const goBack = useCallback(() => {
    carouselRef.current.slider.goTo(0);
  }, [carouselRef]);

  return (
    <Form layout="vertical" className="seso-flex-col seso-justify-center" form={form} onFinish={onSignup}>
      <Typography.Title level={5}>Sign up</Typography.Title>
      {isFetching ? (
        <Spin size="large" />
      ) : (
        <>
          <Carousel
            className="carousel-container"
            ref={(ref) => {
              carouselRef.current.slider = ref;
            }}
          >
            <div>
              <div className="seso-flex-col seso-justify-center">
                <UserDetailFormItems />
                <Button className="align-self__end" type="primary" onClick={goToNext}>
                  Next
                </Button>
              </div>
            </div>
            <div>
              <div className="seso-flex-col seso-justify-center">
                <BusinessDetailFormItems />
                <div className="align-self__end">
                  <Button className="align-self__end margin-right-xsmall" type="default" onClick={goBack}>
                    Back
                  </Button>
                  <Button className="align-self__end" type="primary" htmlType="submit">
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </Carousel>
          <p className="auth-form-toggle-link text-align-center">
            <Link to="/login">Already have an account?</Link>
          </p>
        </>
      )}
    </Form>
  );
};
export default SignupForm;
