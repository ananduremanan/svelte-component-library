declare module 'siema' {
	interface SiemaOptions {
		selector?: string | HTMLElement;
		duration?: number;
		easing?: string;
		perPage?: number | object;
		startIndex?: number;
		draggable?: boolean;
		multipleDrag?: boolean;
		threshold?: number;
		loop?: boolean;
		rtl?: boolean;
		onInit?(): void;
		onChange?(): void;
	}

	class Siema {
		constructor(options?: SiemaOptions);
		next(index?: number, callback?: () => void): void;
		prev(index?: number, callback?: () => void): void;
		goTo(index: number, callback?: () => void): void;
		remove(index: number, callback?: () => void): void;
		insert(item: HTMLElement, index: number, callback?: () => void): void;
		prepend(item: HTMLElement, callback?: () => void): void;
		append(item: HTMLElement, callback?: () => void): void;
		destroy(restoreMarkup?: boolean, callback?: () => void): void;
	}

	export default Siema;
}
