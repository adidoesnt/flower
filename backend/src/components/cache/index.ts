import { CACHE_URL } from "constants/cache";
import { createClient } from "redis";

const client = await createClient({
    url: CACHE_URL,
})
    .on("error", (err) => {
        console.error("Redis Client Error", err);
    })
    .connect();

export type GetCommandParams = string;

const get = async (key: GetCommandParams) => {
    return await client.get(key);
};

export type SetCommandParams = {
    key: string;
    value: string;
    expiresIn?: number;
};

const set = async ({ key, value, expiresIn }: SetCommandParams) => {
    return await client.set(key, value, {
        EX: expiresIn,
    });
};

export default { get, set };
