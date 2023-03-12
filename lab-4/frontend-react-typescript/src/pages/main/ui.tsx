import { fetchAttempts } from "entities/attempt";
import { Select, Present } from "features/attempts";
import { Logout } from "features/auth/logout";
import { PageTemplate } from "pages/template";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space, Spin } from "shared/ui";

export const MainPage = () => {
  const dispatch = useDispatch<any>();
  const attemptStatus = useSelector((state: any) => state.attempts.status);
  const error = useSelector((state: any) => state.attempts.error);

  useEffect(() => {
    if (attemptStatus === "idle") {
      dispatch(fetchAttempts());
    }
  }, [attemptStatus, dispatch]);

  let errorBlock = null;

  if (attemptStatus === "loading") {
    return <Spin delay={5000} />;
  } else if (attemptStatus === "failed") {
    errorBlock = <>{error}</>;
  } //else if (attemptStatus === "succeded")

  return (
    <PageTemplate header={<Logout />}>
      <Space direction={"horizontal"} wrap>
        {errorBlock}
        <Select.ViaGraph />
        <Select.ViaForm
          x={{ min: -3, max: 5 }}
          y={{ min: -3, max: 5 }}
          r={{ min: 1, max: 5 }}
        />
        <Present.ViaTable />
      </Space>
    </PageTemplate>
  );
};
