import axios from "axios";
import { addNewAttempt } from "entities/attempt/model";
import { Point } from "shared/api/types";

export const onFormSubmit = (dispatcher: any) => (values: Point) => {
  console.log("Success: ", values);
  dispatcher(addNewAttempt(values));
};
