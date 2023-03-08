import axios from "axios";
import { addNewPoint } from "entities/point/model";
import { Point } from "shared/api/types";

export const onFormSubmit = (dispatcher: any) => (values: Point) => {
  console.log("Success: ", values);
  dispatcher(addNewPoint(values));
};

/* const submitPoint = (point: Point): boolean => {
  let isOk = false;
  try {
    axios
      .post("/api/points/add")
      .then((response) => {
        if (response?.status == 200) savePointLocally(point);
        response.data;
      })
      .then(() => {
        isOk = true;
      });
  } catch (err) {
    console.error("ViaForm::submitPoint", err);
  }
  return isOk;
};

const savePointLocally = (point: Point) => {
  // redux noises 
};
 */
