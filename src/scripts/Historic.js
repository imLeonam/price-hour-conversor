import { formatDate } from './utils/utils';

function filterAndDistinct(array) {
    const distinctObjects = [];
    const seenObjects = new Set();

    for (const obj of array) {
        const objString = JSON.stringify(obj);
        if (!seenObjects.has(objString)) {
            seenObjects.add(objString);
            distinctObjects.push(obj);
        }
    }

    return distinctObjects;
}

function genDate() {
    const d = new Date();
    return formatDate(d, true);
}

function saveInHistory(newItems, localStorageKey = 'PHCH') {
    const existingItemsJSON = localStorage.getItem(localStorageKey);
    const existingItems = existingItemsJSON ? JSON.parse(existingItemsJSON) : [];


    newItems.created_at = genDate();
    const combinedItems = [...existingItems, newItems];
    const distinctItems = [];

    const seenObjects = new Set();

    for (const item of combinedItems) {
        const itemString = JSON.stringify(item);
        if (!seenObjects.has(itemString)) {
            seenObjects.add(itemString);
            distinctItems.push(item);
        }
    }

    localStorage.setItem(localStorageKey, JSON.stringify(distinctItems));
}

function getHistory() {
    const history = localStorage.getItem('PHCH');
    return history ? JSON.parse(history) : undefined;
}