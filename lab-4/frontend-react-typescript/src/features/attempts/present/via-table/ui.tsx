import { AttemptsTable, selectAllAttempts } from "entities/attempt";
import { useSelector } from "react-redux";

export const PresentViaTable = () => {
  const data = useSelector(selectAllAttempts);
  return <AttemptsTable data={data} />;
};
