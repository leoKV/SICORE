import { SortingModel } from './sorting.model';

export class PaginateModel {
    itemsPage: number = 10;
    page: number = 1;
    filters: any = {};
    sort: any = {};
    total: number;
}
