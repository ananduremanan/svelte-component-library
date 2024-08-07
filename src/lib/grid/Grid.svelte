<!-- Extended Documentation for Grid can be found at 
https://psychedelic-step-e70.notion.site/Svelte-GBS-Component-Library-20ff97c899d24bc590215a6196435fa3 -->

<script lang="ts">
	import AngleLeftOutline from '../assets/icons/AngleLeftOutline.svelte';
	import AngleRightOutline from '../assets/icons/AngleRightOutline.svelte';
	import FilterOutline from '../assets/icons/FilterOutline.svelte';
	import SearchOutline from '../assets/icons/SearchOutline.svelte';
	import ChevronDoubleRightOutline from '../assets/icons/ChevronDoubleRightOutline.svelte';
	import ChevronDoubleLeftOutline from '../assets/icons/ChevronDoubleLeftOutline.svelte';
	import FilterPopUp from './FilterPopUp.svelte';
	import {
		handleApplyFilterHelper,
		clearFilterHelper,
		exportToExcelHelper,
		exportToPDFHelper,
		handleEditActionHelper
	} from './GridHelperFunctions.js';
	import { onMount, afterUpdate } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import EditingToolbar from './EditingToolbar.svelte';
	import { createEventDispatcher } from 'svelte';

	interface PageSettingsProps {
		pageNumber: number;
	}

	// Props To Grid Component
	export let dataSource: any[];
	export let columns: any[];
	export let pageSettings: PageSettingsProps;
	export let enableSearch = false;
	export let lazy: boolean = false;
	export let enableExcelExport: boolean = false;
	export let excelName: string = 'data';
	export let enablePdfExport: boolean = false;
	export let pdfName: string = 'data';
	export let gridContainerClass: string = '';
	export let gridButtonClass: string =
		'px-1 py-2 bg-white border rounded-lg text-xs text-black dark:bg-black dark:text-white';
	export let gridHeaderClass: string = '';
	export let gridGlobalSearchButtonClass: string = '';
	export let gridPaginationButtonClass: string = '';
	export let pdfOptions: any = {};
	export let enableEditingBox: boolean = false;
	export let isFetching: boolean = false;
	export let showPagination: boolean = true;

	let currentPage = 0;
	let pageStart = 0;
	let pageEnd = 10;
	$: workingDataSource = [...dataSource];
	let searchParam: string | number;
	let isFilterApplied: boolean = false;
	let isSearchApplied: boolean = false;
	let totalPages = 0;
	let selectedRowIndex: number | undefined = undefined;
	let actionMode: string = '';
	let newEntry: any = {};
	let isEditModeActive: boolean = false;
	let gridClassContainer =
		'flex flex-col min-w-screen border rounded-md overflow-hidden dark:text-white';
	const dispatch = createEventDispatcher();

	// Function to handle Asynchronous data fetching on parent.
	function afterUpdateFunctions() {
		// Total Number Of Pages Calculation
		if (workingDataSource.length > 0) {
			totalPages = Math.ceil(workingDataSource.length / pageSettings.pageNumber);
		}
		if (!isFilterApplied && !isSearchApplied) {
			workingDataSource = [...dataSource];
		}
	}

	onMount(afterUpdateFunctions);
	afterUpdate(afterUpdateFunctions);

	// Added an additional column to show filter menu popup for each Column
	columns = columns.map((column) => ({
		...column,
		showFilterPopup: false,
		isFilterActive: false
	}));

	// Function to reset datasource when search cleared
	function resetSearch(event: any) {
		if (event.target.value === '') {
			isSearchApplied = false;
			workingDataSource = dataSource;
			goToPage(0);
		}
	}

	// Function For Serching the Grid
	function handleSearch(searchParam: any) {
		if (!lazy) {
			isSearchApplied = true;
			workingDataSource = dataSource.filter((item: any) => {
				for (const key in item) {
					if (item[key].toString().toLowerCase().includes(searchParam.toLowerCase())) {
						return true;
					}
				}
				return false;
			});
			goToPage(0);
		}
	}

	// *** Filtering Helper Methods Starts Here
	function handleApplyFilter(event: any) {
		isFilterApplied = true;
		const { columns: updatedColumns, workingDataSource: updatedFullDataSource } =
			handleApplyFilterHelper(event, columns, dataSource);
		columns = updatedColumns;
		workingDataSource = updatedFullDataSource;
		goToPage(0);
	}

	function clearFilter(event: any) {
		const {
			columns: updatedColumns,
			workingDataSource: updatedDataSource,
			hasActiveFilters: hasActiveFilters
		} = clearFilterHelper(event, columns, dataSource);
		hasActiveFilters ? (isFilterApplied = true) : (isFilterApplied = false);
		columns = updatedColumns;
		workingDataSource = updatedDataSource;
	}
	// Filtering Helper Methods Ends  ***

	// *** Page Navigation Helper Methods Starts Here
	function nextPage() {
		if (currentPage < totalPages - 1) {
			currentPage++;
			if (currentPage >= pageEnd) {
				pageStart += 10;
				pageEnd += 10;
			}
		}
	}

	function prevPage() {
		if (currentPage > 0) {
			currentPage--;
			if (currentPage < pageStart) {
				pageStart -= 10;
				pageEnd -= 10;
			}
		}
	}

	function goToEndPage(): void {
		currentPage = totalPages - 1;
		pageStart = Math.floor((totalPages - 1) / 10) * 10;
		pageEnd = pageStart + 10;
	}

	function goToFirstPage(): void {
		currentPage = 0;
		pageStart = 0;
		pageEnd = 10;
	}

	export function goToPage(page: number): void {
		currentPage = pageStart + page;
	}
	// Page Navigation Helper Methods Ends Here ***

	// Grid Edit Action Handler Functions
	function handleEditAction(event: any) {
		const { dataSourceUpdate, isEditModeActiveUpdate, actionModeUpdate, newEntryUpdate } =
			handleEditActionHelper(
				event,
				isEditModeActive,
				actionMode,
				newEntry,
				workingDataSource,
				goToFirstPage,
				selectedRowIndex
			);

		dataSource = dataSourceUpdate;
		isEditModeActive = isEditModeActiveUpdate;
		actionMode = actionModeUpdate;

		// Dispatch events to parent component
		const { mode } = event.detail;
		if (mode === 'update' && Object.keys(newEntry).length > 0) {
			dispatch('entryAdded', { newEntry: newEntry });
		} else if (mode === 'delete' && selectedRowIndex !== undefined) {
			dispatch('entryDeleted', { deletedIndex: selectedRowIndex });
		}

		newEntry = newEntryUpdate;
		selectedRowIndex = undefined;
	}

	// Function to handle input for Grid Edit
	function handleInputChange(event: any, field: any, type: string) {
		let value = event.target.value;
		if (type === 'number') {
			value = parseInt(value);
		} else if (type === 'boolean') {
			value = event.target.checked;
		}
		newEntry[field] = value;
	}

	// Function to set rowindex
	function handleSelect(rowIndex: number) {
		if (selectedRowIndex === rowIndex) {
			selectedRowIndex = undefined;
		} else {
			selectedRowIndex = rowIndex;
		}
	}
</script>

<div class={twMerge(gridContainerClass, gridClassContainer)}>
	{#if workingDataSource}
		{#if columns}
			<!-- Grid Header Options -->
			{#if enableSearch || enableExcelExport || enablePdfExport || enableEditingBox}
				<div class="min-w-full flex justify-between items-center">
					<!-- Grid Editing Tool Box -->
					{#if enableEditingBox}
						<EditingToolbar on:edit={handleEditAction} {isEditModeActive} {selectedRowIndex} />
					{/if}
					<!-- Utility Tools -->
					<div
						class="px-1 py-3 flex-grow"
						class:show={enableSearch || enableExcelExport || enablePdfExport}
					>
						<div class={twMerge('flex justify-end gap-2', gridHeaderClass)}>
							{#if enableExcelExport}
								<button
									on:click={() => exportToExcelHelper(workingDataSource, columns, excelName)}
									class={gridButtonClass}>Export as Excel</button
								>
							{/if}
							{#if enablePdfExport}
								<button
									on:click={() =>
										exportToPDFHelper(workingDataSource, columns, pdfName, pdfOptions)}
									class={gridButtonClass}>Export as PDF</button
								>
							{/if}
							{#if enableSearch}
								<div class="flex gap-1">
									<input
										type="search"
										bind:value={searchParam}
										on:input={resetSearch}
										class="outline-none p-2 text-sm font-normal bg-gray-50 rounded-lg max-sm:hidden dark:bg-gray-700"
										placeholder="Search"
									/>
									<button
										class={twMerge(
											'bg-white border rounded-lg text-black w-10 flex items-center justify-center dark:bg-black',
											gridGlobalSearchButtonClass
										)}
										on:click={() => {
											handleSearch(searchParam);
										}}><SearchOutline class="dark:text-white" /></button
									>
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/if}

			<!-- Data Table -->
			<div class="overflow-x-auto">
				<table class="min-w-full">
					<thead>
						<tr>
							{#each columns as columnHeader}
								<th
									class="border-b border-t bg-gray-50 px-2 py-4 dark:bg-gray-700"
									style="width: {columnHeader.width ? `${columnHeader.width}px` : 'auto'};"
								>
									<div class="flex items-center gap-2 text-sm">
										{#if columnHeader.headerText}
											{columnHeader.headerText}
										{:else}
											{columnHeader.field}
										{/if}
										{#if columnHeader.mandatory}
											<span class="text-red-500">*</span>
										{/if}
										<!-- Filter Logic -->
										{#if columnHeader.filter && !columnHeader.template}
											<button
												on:click={() =>
													(columnHeader.showFilterPopup = !columnHeader.showFilterPopup)}
												><FilterOutline
													size="sm"
													class={`${columnHeader.isFilterActive ? 'text-red-400' : ''}`}
												/></button
											>
											<!-- Filter Pop Up Component For Showing Filtering Options -->
											<FilterPopUp
												bind:show={columnHeader.showFilterPopup}
												on:cancel={(event) => {
													if (event.type === 'cancel') {
														columnHeader.showFilterPopup = !columnHeader.showFilterPopup;
													}
												}}
												on:apply={handleApplyFilter}
												bind:columnHeader={columnHeader.field}
												on:clearFilter={clearFilter}
											/>
										{/if}
									</div>
								</th>
							{/each}
						</tr>

						{#if actionMode === 'add'}
							<tr>
								{#each columns as columnHeader}
									<td class="border-b px-2 py-2">
										{#if columnHeader.type === 'boolean'}
											<input
												type="checkbox"
												class="border p-1"
												on:change={(event) =>
													handleInputChange(event, columnHeader.field, columnHeader.type)}
											/>
										{:else if !columnHeader.template}
											<input
												class="border p-1 w-full rounded-lg outline-none"
												on:input={(event) =>
													handleInputChange(event, columnHeader.field, columnHeader.type)}
												placeholder={`Enter ${columnHeader.field}`}
												type={columnHeader.type ? columnHeader.type : 'text'}
											/>
										{/if}
									</td>
								{/each}
							</tr>
						{/if}
					</thead>
					<tbody>
						<!-- Data From Datsource Shows Here -->
						{#if workingDataSource.length > 0}
							{#each workingDataSource.slice(currentPage * pageSettings.pageNumber, (currentPage + 1) * pageSettings.pageNumber) as rowData, rowIndex}
								<tr
									class={`hover:bg-gray-50 dark:hover:bg-gray-900 ${selectedRowIndex === rowIndex + currentPage * pageSettings.pageNumber ? 'bg-gray-50' : ''}`}
								>
									{#each columns as column}
										<td
											class={`border-b p-2 text-sm dark:text-white ${column.template ? '' : ''}`}
											style="width: {column.width ? `${column.width}px` : 'auto'};"
											on:click={() => {
												enableEditingBox &&
													handleSelect(rowIndex + currentPage * pageSettings.pageNumber);
											}}
										>
											{#if column.template}
												<div class="flex">
													<svelte:component
														this={column.template}
														{rowData}
														rowIndex={rowIndex + currentPage * pageSettings.pageNumber}
													/>
												</div>
											{:else}
												{rowData[column.field]}
											{/if}
										</td>
									{/each}
								</tr>
							{/each}
						{:else}
							<!-- Shows if workingDataSource array is empty -->
							<tr>
								<td colspan={columns.length} class="border p-2 text-center"
									>{isFetching ? 'Loading Data...' : 'No Data Found'}</td
								>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>
			<!-- Pagination Logic -->
			{#if showPagination}
				<div class="flex p-2 justify-between dark:text-white">
					<div class="flex gap-4">
						<button class="-mr-2" on:click={goToFirstPage}
							><ChevronDoubleLeftOutline
								class={`${currentPage === 0 ? 'text-gray-200 dark:text-gray-700' : ''}`}
							/></button
						>
						<button on:click={prevPage}
							><AngleLeftOutline
								class={`${currentPage === 0 ? 'text-gray-200 dark:text-gray-700' : ''}`}
							/></button
						>
						<div class="flex flex-row gap-3 items-center">
							{#if pageStart > 0}
								<button
									class="p-1 w-5 h-5 flex items-center justify-center rounded-full"
									on:click={() => {
										pageStart -= 10;
										pageEnd -= 10;
										currentPage = pageStart;
									}}>...</button
								>
							{/if}
							{#each Array(Math.min(10, Math.ceil(workingDataSource.length / pageSettings.pageNumber) - pageStart)) as _, i}
								<button
									on:click={() => goToPage(i)}
									class={`${pageStart + i === currentPage ? twMerge('font-bold text-white p-2 h-6 bg-black flex items-center justify-center rounded-md w-auto dark:bg-white dark:text-black', gridPaginationButtonClass) : ''}`}
									>{pageStart + i + 1}</button
								>
							{/each}
							{#if pageEnd < Math.ceil(workingDataSource.length / pageSettings.pageNumber)}
								<button
									class="p-1 w-5 h-5 flex items-center justify-center rounded-full"
									on:click={() => {
										pageStart += 10;
										pageEnd += 10;
										currentPage = pageStart;
									}}>...</button
								>
							{/if}
						</div>
						<button on:click={nextPage} disabled={workingDataSource.length <= 0}
							><AngleRightOutline
								class={`${currentPage === totalPages - 1 || workingDataSource.length <= 0 ? 'text-gray-200 dark:text-gray-700' : ''}`}
							/></button
						>
						<button class="-ml-2" on:click={goToEndPage} disabled={workingDataSource.length <= 0}
							><ChevronDoubleRightOutline
								class={`${currentPage === totalPages - 1 || workingDataSource.length <= 0 ? 'text-gray-200 dark:text-gray-700' : ''}`}
							/></button
						>
					</div>

					<!-- Shows Total Pages and Items In Grid -->
					<div class="flex text-sm">
						{currentPage + 1} of {totalPages} pages ({workingDataSource.length} items)
					</div>
				</div>
			{/if}
		{/if}
	{/if}
</div>

<!--
## Usage Guide
@component
[Go to docs](https://gbs-svelte-bblock.netlify.app/components/Grid) for more information.
## Props
```javascript
let columns: any[];
let dataSource: any[];
let pageSettings: PageSettingsProps;
let enableSearch = false;
let lazy: boolean = false;
let enableExcelExport: boolean = false;
let excelName: string = 'data';
let enablePdfExport: boolean = false;
let pdfName: string = 'data';
let gridContainerClass: string = '';
let gridButtonClass: string = 'px-1 py-2 bg-white border rounded-lg text-xs text-black';
let gridHeaderClass: string = '';
let gridGlobalSearchButtonClass: string = '';
let gridPaginationButtonClass: string = '';
let pdfOptions: any = {};
let enableEditingBox: boolean = false;
let isFetching: boolean = false;
```

## Usage
```svelte
<script>
	import { Grid } from '@grampro/svelte-block';
	import Input from '$lib/Input.svelte';
	import SerialNumber from '$lib/SerialNumber.svelte';
	import { dataSource } from '$lib/dataSource';

	const columns = [
		{ field: 'Sl. No', width: '80', textAlign: 'Right', template: SerialNumber },
		{ field: 'OrderID', width: '100', textAlign: 'Right' },
		{ field: 'CustomerID', width: '100' },
		{ field: 'EmployeeID', width: '100', textAlign: 'Right' },
		{ field: 'Freight', headerText: 'Frieght', width: '100' },
		{ field: 'ShipCountry', width: '100' },
		{ field: 'ShipAddress', width: '150' },
		{ field: 'Remarks', headerText: 'Remarks', template: Input, width: '200' }
	];
</script>

<div class="m-4">
	<Grid2 {columns} {dataSource} pageSettings={{ pageNumber: 10 }} />
</div>
```
-->
