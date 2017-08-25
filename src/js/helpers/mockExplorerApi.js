import { random } from 'lodash';

import { dropdownScopes } from 'dataMapping/explorer/dropdownScopes';
import { sidebarTypes } from 'dataMapping/explorer/sidebarStrings';

class MockedAPI {
    constructor() {
        this.totalSpending = random(1000000000000, 10000000000000);
        this.totalHistory = [this.totalSpending];
        this.resultHistory = [];
        this.typeHistory = [];
        this.root = '';
    }

    respondToRequest(type, filters) {
        let path = this.root;
        if (Object.keys(filters).length <= 1) {
            this.root = type;
            this.totalHistory = [this.totalSpending];
            this.resultHistory = [this.generateResponse(this.totalSpending, type)];
            this.typeHistory = [type];
            path = type;

            return this.resultHistory[0];
        }

        // find the index position within the path
        const depth = dropdownScopes[path].indexOf(type);
        if (depth < this.totalHistory.length) {
            // we are rewinding in the tree
            this.typeHistory = this.typeHistory.splice(0, depth);
            return this.resultHistory[depth];
        }

        const previousResponse = this.resultHistory[this.resultHistory.length - 1];
        const previousType = this.typeHistory[this.typeHistory.length - 1];
        const filterId = filters[previousType];
        // get the ID item
        let previousTotal = 0;
        for (let i = 0; i < previousResponse.results.length; i++) {
            if (previousResponse.results[i].id === filterId) {
                previousTotal = previousResponse.results[i].amount;
                break;
            }
        }

        if (previousTotal === 0) {
            previousTotal = this.totalHistory[this.totalHistory.length - 1];
        }

        const response = this.generateResponse(previousTotal, type);

        this.totalHistory.push(previousTotal);
        this.resultHistory.push(response);
        this.typeHistory.push(type);

        return response;
    }

    generateResponse(total, type) {
        const typeName = sidebarTypes[type];

        const count = random(5, 10);
        const items = [];
        let remaining = 1;
        for (let i = 0; i < count - 1; i++) {
            const percent = random((1 / (count + 20)), (1 / count), true);
            remaining -= percent;
            const amount = total * percent;
            const item = {
                type,
                amount,
                id: random(1, 9999),
                name: `${typeName} Instance ${i + 1}`,
                code: `${type}_${i + 1}`,
                total: amount + 100
            };

            items.push(item);
        }

        // final item
        const finalPercent = 1 - remaining;
        const finalItem = {
            type,
            id: random(1, 9999),
            name: `${typeName} Instance ${count}`,
            code: `${type}_${count}`,
            amount: (finalPercent * total),
            total: (finalPercent * total) + 100
        };

        items.push(finalItem);

        return {
            total,
            end_date: '2017-06-30',
            results: items
        };
    }

}

const mockApiInstance = new MockedAPI();

export default mockApiInstance;
