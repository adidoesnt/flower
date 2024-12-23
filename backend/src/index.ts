import express from "express";
import { json, urlencoded } from "body-parser";
import { router } from "components/router";
import cookies from "cookie-parser";
import { setupCors } from "components/middleware/cors";

const { PORT = 8080 } = process.env;
const app = express();

setupCors(app);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookies());

app.use(router);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
