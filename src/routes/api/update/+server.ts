import {createClient} from "redis";
import axios from "axios";
import type {Item} from '$lib/models/item';
import { env } from "$env/dynamic/private";

export async function POST() {
    const redisClient = createClient({
        url: `redis://${env.REDIS_HOST}:6379`
    });

    await redisClient.connect();

    const response = await axios.get<number[]>('https://hacker-news.firebaseio.com/v0/topstories.json');
    const ids = response.data;
    await redisClient.hSet('top', {ids: ids.join(',')});

    await Promise.all(ids.map(async id => {
        try {

            const response = await axios.get<Item>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);

            if (response.status !== 200) {
                return;
            }

            const { data } = response;

            if(!data) {
                return;
            }

            await redisClient.set(`items:${id}`, JSON.stringify(data));
        } catch (error) {
            console.error(`Error fetching item ${id}`);
        }
    }));

    return new Response('OK');
}
