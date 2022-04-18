import { comparePasswords } from "./helpers/bcrypt.helper.js";

let a = "admin",
  b = "$2b$10$3N.KBKyTyC9g6Wt179m4T.W2TNZbGl8IpmxWr1bFceuqdyZvy6Lk6";
const go = async () => {
  const res = await comparePasswords(a, b);
  console.log(res);
  return res;
};
go();
