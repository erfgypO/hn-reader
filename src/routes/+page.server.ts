import {createClient} from "redis";
import { env } from "$env/dynamic/private";

const pageSize = 15;

export async function load({ url }) {
    const query = new URLSearchParams(url.search);
    const page = parseInt(query.get('page') || '0',10) || 0;

    const client = createClient({
        url: `redis://${env.REDIS_HOST}:6379`
    });

    await client.connect();
    const { ids } = await client.hGetAll('top');

    const items = await Promise.all(
        ids.split(',').slice(page * pageSize, (page + 1) * pageSize).map(async id => {
            const itemString = await client.get(`items:${id}`)
            if(itemString != null) {
                return JSON.parse(itemString);
            }
            return undefined;
        })
    );

    return {
        currentPage: page,
        items
    }
}
