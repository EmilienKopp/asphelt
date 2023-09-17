import { isClientSide, isEmpty } from './utils';

import { writable } from 'svelte/store';

export interface Persistable<T>  {
    subscribe: (callback: any) => void;
    set: (data: T) => void;
    update: (data: T) => void;
}

export const persistable = (storageKey: string = '', data: any, storage: Storage | null = isClientSide() ? localStorage : null): Persistable<any> => {
    const { subscribe, set, update } = writable(data);
    if(!storageKey) storageKey = "state"

    const enhancedSet = (value: any) => {
        if(value) {
            set(value);
            persist(storageKey, value, storage);
        }
    };

    return {
        subscribe: (callback: any) => {
            // If data is empty, retrieve from sessionStorage
            if(isEmpty(data)) {
                
                const retrievedData = retrieve(storageKey, storage);
                if(retrievedData) {
                    set(retrievedData);
                }
            }
            return subscribe(callback);
        },
        set: enhancedSet,
        update: (updater) => {
            update((value: any) => {
                const newValue = updater(value);
                enhancedSet(newValue);
                return newValue;
            });
        },
    };
}

function persist(key: string, value: any, storage: Storage | null = localStorage): void {
    if(isClientSide() && storage) {
        storage.setItem(key, JSON.stringify(value));
    }
}

function retrieve(key: string, storage: Storage | null = localStorage): any {
    if(!isClientSide() || !storage) return null;
    
    const item = storage.getItem(key);
    return item ? JSON.parse(item) : null;
}


