import { Form, Input } from "antd";

import { Field, useField } from "formik";

const TextField = ({ label, type, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form
      isInvalid={meta.touched && meta.error}
      layout="vertical"
      requiredMark="optional"
    >
      <Form.Item
        name={label}
        rules={[
          {
            type: type,
            required: true,
            message: meta.error,
          },
        ]}
      >
        <Input as={Field} {...field} {...props} />
      </Form.Item>
    </Form>
  );
};

export default TextField;
