import { fetchPoints, selectAllPoints } from "entities/point/model";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { Point } from "shared/api/types";
import { ColumnsType, Table, Spin } from "shared/ui";

const columns: ColumnsType<Point> = [
  {
    title: "X",
    dataIndex: "x",
  },
  {
    title: "Y",
    dataIndex: "y",
  },
  {
    title: "R",
    dataIndex: "r",
  },
];

export const PointsTable = () => {
  //TODO: dirty hack to avoid error https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete
  const dispatch = useDispatch<any>();
  const points = useSelector(selectAllPoints);
  const pointStatus = useSelector((state: any) => state.points.status);
  const error = useSelector((state: any) => state.points.error);

  useEffect(() => {
    if (pointStatus === "idle") {
      dispatch(fetchPoints());
    }
  }, [pointStatus, dispatch]);

  let data: any;
  if (pointStatus === "loading") {
    return <Spin delay={5000} />;
  } else if (pointStatus === "failed") {
    return <>{error}</>;
  } else if (pointStatus === "succeded") {
    data = points;
    return <Table columns={columns} dataSource={data} />;
  }
  return null;
};
