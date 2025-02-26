import { CorsOptions } from "cors";

const allowedOrigins = ["*"];

export const corsOptions: CorsOptions = {
  credentials: true,
  origin: function (origin, callback: Function) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(console.error("CORS Error: Blocked by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
