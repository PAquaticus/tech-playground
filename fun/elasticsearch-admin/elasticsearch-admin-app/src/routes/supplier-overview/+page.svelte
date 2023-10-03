<script lang="ts">
	import type { SearchTotalHits } from '@elastic/elasticsearch/lib/api/types';
	import type { PageData } from './$types';
	import { createSvelteTable, getCoreRowModel, flexRender } from '@tanstack/svelte-table';

	import type { ColumnDef } from '@tanstack/svelte-table';
	export let data: PageData;
	console.log(data);

	const columns: ColumnDef<any>[] = [
		{
			accessorFn: (row) => row.key['defaultPurchaseInfo.supplierReference.displayName'],
			id: 'Supplier',
			cell: (info) => info.getValue(),
			header: () => 'Supplier',
			footer: (props) => props.column.id
		},
		{
			accessorFn: (row) => row.key['defaultPurchaseInfo.programReference.displayName'],
			id: 'Program',
			cell: (info) => info.getValue(),
			header: () => 'Program',
			footer: (props) => props.column.id
		},
		{
			accessorFn: (row) => row.doc_count,
			id: 'count',
			cell: (info) => info.getValue(),
			header: () => 'Count',
			footer: (props) => props.column.id
		}
	];

	const table = createSvelteTable({
		columns,
		data: data.aggregations,
		getCoreRowModel: getCoreRowModel()
	});
</script>

<div class="bg-gray-900">
	<h1 class="text-gray-400">Supplier Overview</h1>
	<h2 class="text-gray-400">Indexed Documents: {data.searchTotalHits.value}</h2>
	<h2 class="text-gray-400">Distinct Suppliers: {data.distinctSuppliers}</h2>
	<h2 class="text-gray-400">Distinct Programs: {data.distinctPrograms}</h2>

	<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
		<table class="min-w-full text-sm text-gray-400">
			<thead class="bg-gray-800 text-xs uppercase font-medium">
				{#each $table.getHeaderGroups() as headerGroup}
					<tr>
						{#each headerGroup.headers as header}
							<th class="px-6 py-3 text-left tracking-wider" colSpan={header.colSpan}>
								{#if !header.isPlaceholder}
									<div
										class:cursor-pointer={header.column.getCanSort()}
										class:select-none={header.column.getCanSort()}
									>
										<svelte:component
											this={flexRender(header.column.columnDef.header, header.getContext())}
										/>
									</div>
								{/if}
							</th>
						{/each}
					</tr>
				{/each}
			</thead>
			<tbody class="bg-gray-800">
				{#each $table.getRowModel().rows as row, i}
					<tr class={i % 2 === 0 ? 'bg-black bg-opacity-20' : ''}>
						{#each row.getVisibleCells() as cell}
							<td class="px-6 py-4 whitespace-nowrap">
								<svelte:component
									this={flexRender(cell.column.columnDef.cell, cell.getContext())}
								/>
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
