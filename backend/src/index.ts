import express from "express";
import { json, urlencoded } from "body-parser";
import { router } from "components/router";

const { PORT = 8080 } = process.env;
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
