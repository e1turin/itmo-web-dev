export const onFinish = (values: any) => {
  console.log("Successfully filled Login form:", values);
};

export const onFinishFailed = (errorInfo: any) => {
  console.log("Failed login form:", errorInfo);
};
