import { all } from "redux-saga/effects";
import { interact } from "./interact";
import { koodle } from "./koodle";
export default function* saga() {
  yield all([interact(), koodle()]);
}
