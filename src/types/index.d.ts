export type Step = {
    title: string;
    component?: any;
    text?: string;
    props?: any;
}

export type SortableObject = { [key: string]: any };

/**
 * A sessionable is a custom Svelte store that can be subscribed to, set, and updated.
 * Used to add sessionStorage fallback to a Svelte store.
 * @param T The type of data that the sessionable will hold.
 */
export interface Sessionable<T> {
    subscribe: (callback: any) => void;
    set: (data: T) => void;
    update: (data: T) => void;
}

/**
 * A select option is an object with a name and a value, typically used to populate a select dropdown.
 */
export type SelectOption = {
    name: string | number;
    value: string | number;
};