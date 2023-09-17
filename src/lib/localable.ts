import { persistable, type Persistable } from "./persistable";
import { isClientSide } from './utils';

export type Localable<T> = Persistable<T>;

export const localable = <T>( storageKey: string = '', data: T | null = null): Localable<T> => {
    if(!storageKey) storageKey = "state";
    if(!data) data = {} as T;
    const localStorage = isClientSide() ? window.localStorage : null;
    return persistable( storageKey, data, localStorage)
}