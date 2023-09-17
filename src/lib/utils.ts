import type { SelectOption, SortableObject } from '../types';

export function isClientSide() {
    return typeof window !== "undefined";
}

/**
 * Wrapper to store data in sessionStorage
 * @param key The storage key to use
 * @param value The value to store
 * @returns void
 */
export function persist(key: string, value: any): void {
    // Check if sessionStorage is available or if it is full
    if (!isSessionStorageAvailable()) {
        throw new Error('Session storage is not available or full');
    }

    sessionStorage.setItem(key, JSON.stringify(value));
}

/**
 * Wrapper to retrieve data from sessionStorage.
 * @param key The key to retrieve from sessionStorage
 * @returns the value stored in sessionStorage
 */
export function retrieve(key: string): any {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

/**
 * Check whether an array or object is empty.
 * @param arrOrObj an array or object
 * @returns whether the array or object is empty
 */
export function isEmpty(arrOrObj: Array<any> | object) {
    if (Array.isArray(arrOrObj)) {
        return arrOrObj.length === 0;
    } else {

        if(!arrOrObj || Object.keys(arrOrObj).length === 0) return true;
        return Object.values(arrOrObj).every((obj: any) => {
            isEmpty(obj);
        });
    }
}

/**
 * Does a vertical selection of keys from an object or an array of objects.
 * @param arr an array of objects
 * @param keyList a list of keys to select from each object in the array
 * @returns an object or array of objects with only the selected keys
 */
export function select<T extends SortableObject> (arr: T | T[] , keyList: string[]): T | T[] {
    if(Array.isArray(arr)) {
        return arr.map( item => select(item, keyList)) as T[];
    } else {
        let result = {} as any;
        keyList.forEach(key => {
            if(key in arr)
                result[key] = arr[key];
        });
        return result;
    }
}

/**
 * Does a vertical exclusion of keys from an array of objects.
 * @param obj 
 * @param keys 
 * @returns an object or array of objects with the specified keys removed
 */
export function except<T extends SortableObject>(obj: T | T[], keyList: string[]): T | T[] {
    if(Array.isArray(obj)) {
        return obj.map( item => except(item, keyList)) as T[];
    } else {
        let result = {...obj};
        keyList.forEach(key => {
            if(key in obj)
                delete result[key];
        });
        return result;
    }
}

/**
 * Picks a random element from an array.
 * @param arr the array to pick from
 * @returns a random element from the array
 */
export function random(arr: Array<any>): any {
    return arr[Math.floor(Math.random() * arr.length)];
}


/**
 * Sorts the keys of an Object or an Array of Objects in the specified order.
 * @param input an Object or an Array of Objects
 * @param order an array of keys in the order that they should appear in the output
 * @returns an Object or an Array of Objects with the keys in the specified order
 */
export function sortEntries<T extends SortableObject>(input: T | T[], order: string[]): T | T[] {
    const orderSet = new Set(order);

    const sortObject = (obj: T): T => {
        let orderedObj: SortableObject = {};

        // First, add the properties in the specified order
        for (let key of order) {
            if (obj.hasOwnProperty(key)) {
                orderedObj[key] = obj[key];
            }
        }

        // Then, add the properties not specified in the order
        for (let key in obj) {
            if (!orderSet.has(key)) {
                orderedObj[key] = obj[key];
            }
        }

        return orderedObj as T;
    };

    if (Array.isArray(input)) {
        return input.map(sortObject);
    } else {
        return sortObject(input);
    }
}

/**
 * Turns an array of arrays into an array of objects with the specified keys.
 * Ordering of the headers and the arrays does matter.
 * Anything beyond the length of the headers array will be ignored.
 * @param headers the headers (keys) to use for the new objects (values)
 * @param arr the array of arrays to be mapped into objects
 * @returns an array of objects with the specified keys
 */
export function mapHeaders(headers: Array<any>, arr: Array<any[]>) {
    if (!headers || !arr) throw new Error('mapHeaders requires both headers and array arguments to be truthy');
    return arr.map((row) => {
      let obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
  }

/**
 * Takes an array of objects and converts it to an array of select options (name/value pairs)
 * @param arr the array of objects to convert to select options
 * @param valueKey the key from the objects to use as the value attribute
 * @param nameKey the key from the objects to use as the name attribute
 * @param formatter an optional function to format the name attribute
 * @param concatKey an optional key to concat to the name attribute
 * @param concatPrefix an optional prefix to put before the name attribute
 * @returns an array of select options
 */
export function toSelectOptions(arr: Array<{ [key: string]: any}>, valueKey: string, nameKey: string,
                                formatter: Function | null = null,
                                concatKey: string | null = null,
                                concatPrefix: string = ''): SelectOption[] | Array<any> {
    if (!arr) return [];

    return arr.map(el => {
        let name = formatter ? formatter(el[nameKey]) : el[nameKey];

        if (concatKey) {
            name += (concatKey && el[concatKey]) ? ` (${concatPrefix} ${el[concatKey]})` : '';
        }
        
        return {
            value: el[valueKey],
            name,
        };
    });
}


/**
 * @returns whether the sessionStorage is available or not
 */
function isSessionStorageAvailable(): boolean {
    try {
        const testKey = 'test';
        sessionStorage.setItem(testKey, testKey);
        sessionStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
}