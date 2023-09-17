import { isClientSide, isEmpty, persist, retrieve } from './utils';

import type { Sessionable } from '../types';
import { nanoid } from 'nanoid';
import { writable } from 'svelte/store';

export const sessionable = (data: any, storageKey: string): Sessionable<any> => {
    const { subscribe, set, update } = writable(data);

    const enhancedSet = (value: any) => {
        if(value) {
            console.log("setting state", value);
            set(value);
            persist(storageKey, value);
        }
    };

    return {
        subscribe: (callback: any) => {
            // If data is empty, retrieve from sessionStorage
            if(isEmpty(data)) {
                
                const retrievedData = retrieve(storageKey);
                console.log('Retrieved state from sessionStorage', retrievedData);
                if(retrievedData) {
                    set(retrievedData);
                }
            }
            return subscribe(callback);
        },
        set: enhancedSet,
        update: (updater) => {
            update((value) => {
                const newValue = updater(value);
                enhancedSet(newValue);
                return newValue;
            });
        },
    };
}