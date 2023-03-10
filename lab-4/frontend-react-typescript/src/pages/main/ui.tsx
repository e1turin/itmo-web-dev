import { fetchAttempts } from "entities/attempt";
import { Select, Present } from "features/attempts";
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
    <PageTemplate>
      <Space direction={"horizontal"} wrap>
        {errorBlock}
        <Select.ViaGraph />
        <Select.ViaForm
          x={{ min: 0, max: 0 }}
          y={{ min: 0, max: 0 }}
          r={{ min: 0, max: 0 }}
        />
        <Present.ViaTable />
      </Space>
    </PageTemplate>
  );
};
