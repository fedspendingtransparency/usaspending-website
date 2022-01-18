import BaseSubagencySpendingRow from './BaseSubagencySpendingRow';

const BaseSubagencySpendingRowChildren = Object.create(BaseSubagencySpendingRow);

BaseSubagencySpendingRowChildren.populate = function populate(data) {
    this.populateCore(data);
    this.name = `${data?.name} (${data?.code})`;
};

export default BaseSubagencySpendingRowChildren;
