<script lang="ts">
	import type {Item} from "$lib/models/item";
	import PostPreview from "../components/PostPreview.svelte";

	interface PageData {
		items: Item[];
		currentPage: number;
	}

	export let data: PageData;
</script>

<ul>
	{#each data.items as item}
		<li class="my-5">
			<PostPreview {item} />
		</li>
	{/each}
</ul>
<div class="flex justify-center">
	<div class="btn-group variant-outline">
		{#if data.currentPage > 0}
			<a class="btn" href={`/?page=${data.currentPage - 1}`}>&lt;&lt;</a>
		{:else}
			<button class="btn disabled">&lt;&lt;</button>
		{/if}
		<button>{data.currentPage + 1}</button>
		<a class="btn" href={`?page=${data.currentPage + 1}`}>&gt;&gt;</a>
	</div>
</div>


