<script lang="ts">
    import type { Item } from '$lib/models/item';

    export let item: Item;

    const hostname = item.url ? new URL(item.url).hostname : '';
    const detailsUrl = `/item/${item.id}`;
</script>

<a href={item.url} target="_blank">
    <div class="card p-4 flex flex-col">
        <p class="text-xs hover-underline">{hostname}</p>
        <h6>{item.title}</h6>
        <a href={detailsUrl} class="hover-underline">
            {item.by} <span class="divider-vertical border-l-8" /> {item.score} points <span class="divider-vertical border-l-8" /> {item.descendants} comments
        </a>
    </div>
</a>
