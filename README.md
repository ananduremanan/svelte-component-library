# GBS Svelte Blocks(Beta)

Svelte Version of GBS Building Block. Version (0.0.18)(unstable).

### Whats New

- Updated Grid With Following Feature and bug fix
	- Bug Fix: Datasource not updating when Asynchronous data fetch happens fixed
	- Search and pagination fix
	- jspdf-autotable issue when installing package fixed

### Installation

```bash
npm i @grampro/svelte-block@latest
```

Additional Installation Steps.

`@grampro/svelte-block` is heavily relies on tailwind for styling, so you need to setup tailwind in your project. Installation for svelte tailwind can be found in [Here](https://tailwindcss.com/docs/guides/sveltekit).

### Mnimal Usage

Import Components from the packge like usual npm import.

eg: `import Grid from '@grampro/svelte-block/Grid.svelte'`

#### Grid

```
<script lang="ts">
	import Grid from '@grampro/svelte-block/Grid.svelte';
	import { dataSource } from '$lib/dataSource';
	import ActionButton from '$lib/ActionButton.svelte';

	const columns = [
		{ field: 'OrderID', width: '200', textAlign: 'Right', filter: true },
		{ field: 'CustomerID', width: '100' },
		{ field: 'EmployeeID', width: '100', textAlign: 'Right' },
		{ field: 'Freight', headerText: 'Frieght', width: '200' },
		{ field: 'ShipCountry', width: '200', clipMode: 'EllipsisWithTooltip', filter: true },
		{ field: 'ShipAddress', width: '150' },
		{ field: 'ShipPostalCode', width: '150' },
		{ field: 'Grid Action', template: ActionButton }
	];
</script>

<Grid {columns} {dataSource} pageSettings={{ pageNumber: 10 }} enableSearch />

```

##### Props

| Property          | Type         | Description                                                                                                                                                       |
| ----------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dataSource        | Object Array | Receives an array of objects and maps it to create the grid columns.                                                                                              |
| columns           | Object Array | Receives an array of objects providing the header part of the grid.                                                                                               |
| pageSettings      | Object       | Provides settings for pagination (both server-side rendering and client-side rendering).                                                                          |
| enableSearch      | Boolean      | Enables a global search box.                                                                                                                                      |
| gridHeight        | Number       | Explicitly changes the height of the grid.                                                                                                                        |
| lazy              | Boolean      | Enables the grid to lazy load data from the server. Certain functionalities such as global search, pagination, etc., may behave differently in lazy loaded grids. |
| enableExcelExport | Boolean      | Exports grid data as an Excel file.                                                                                                                               |
| enablePdfExport   | Boolean      | Exports grid data as a PDF file.                                                                                                                                  |
| excelName         | String       | The name of the exported Excel file.                                                                                                                              |
| pdfName           | String       | The name of the exported PDF file.                                                                                                                                |

#### Select

countries.ts

```
export let countries = [
	{ value: 'us', label: 'United States'},
	{ value: 'fr', label: 'France'},
	{ value: 'gb', label: 'United Kingdom' },
	{ value: 'de', label: 'Germany' },
	{ value: 'jp', label: 'Japan' },
	{ value: 'au', label: 'Australia' },
	{ value: 'cn', label: 'China' },
	{ value: 'in', label: 'India' },
	{ value: 'mx', label: 'Mexico' },
]
```

+page.svelte

```
<script lang="ts">
	import { countries } from '$lib/countries';
	import Select from '@grampro/svelte-block/Select.svelte';

	let selected: any = undefined;
</script>

<div>
	<Select items={countries} bind:value={selected} />
</div>
```

##### Props

| Property    | Type    | Description                                                           |
| ----------- | ------- | --------------------------------------------------------------------- |
| placeholder | String  | The placeholder text displayed when no item is selected.              |
| items       | Array   | An array of items to populate the select dropdown.                    |
| selected    | Any     | The currently selected item.                                          |
| lazy        | Boolean | If set to `true`, the select component enables lazy loading of items. |

#### MultiSelect

countries.ts

```
export let countries = [
	{ value: 'us', label: 'United States'},
	{ value: 'fr', label: 'France'},
	{ value: 'gb', label: 'United Kingdom' },
	{ value: 'de', label: 'Germany' },
	{ value: 'jp', label: 'Japan' },
	{ value: 'au', label: 'Australia' },
	{ value: 'cn', label: 'China' },
	{ value: 'in', label: 'India' },
	{ value: 'mx', label: 'Mexico' },
]
```

+page.svelte

```
<script lang="ts">
	import { countries } from '$lib/countries';
	import Select from '@grampro/svelte-block/MultiSelect.svelte';

	let selected: any = undefined;
</script>

<div>
	<Select items={countries} bind:value={selected} />
</div>
```

##### Props

| Property        | Type      | Description                                                                       |
| --------------- | --------- | --------------------------------------------------------------------------------- |
| placeholder     | String    | The placeholder text displayed when no item is selected.                          |
| items           | Array     | An array of items to populate the select dropdown.                                |
| selected        | Any Array | The currently selected items.                                                     |
| lazy            | Boolean   | If set to `true`, the multi select component enables lazy loading of items.       |
| truncate        | Boolean   | If set to `false`, the multi select component disables truncating selected items. |
| enableSelectAll | Boolean   | If set to `true`, the multi select component enables select all option            |

#### Button

```
<script lang="ts">
	import Select from '@grampro/svelte-block/Button.svelte';
</script>

<div>
	<Button>Submit</Button>
</div>
```

##### Props

| Property | Type     | Description                               |
| -------- | -------- | ----------------------------------------- |
| children | <slot /> | The placeholder text displayed in button. |
| href     | string   | Path for navigation.                      |
| disabled | boolean  | Disabling button.                         |
| target   | string   | Target for navigation.                    |
| outline  | Boolean  | Outline Style.                            |

For bugs, features and code visit [Github Repo](https://github.com/ananduremanan/svelte-component-library)

##### Known Bugs

- Type Error when installing on projects uses typescript:
  - Temporary Fix for this issue is closing the vs code(in case of vs code) and open the project again. (Status: In Progress)
