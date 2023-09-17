import type { Persistable } from './persistable';
import { isClientSide } from './utils';
import { persistable } from './persistable';

export type Sessionable<T> = Persistable<T>;


export const sessionable = <T>(storageKey: string = '', data: T | null = null): Sessionable<T> => {
    if(!storageKey) storageKey = "state";
    const sessionStorage = isClientSide() ? window.sessionStorage : null;
    return persistable( storageKey, data,sessionStorage)
}