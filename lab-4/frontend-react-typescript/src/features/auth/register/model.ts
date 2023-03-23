export const onFinish = (values: any) => {
  console.log("Success:", values);
};

export const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
