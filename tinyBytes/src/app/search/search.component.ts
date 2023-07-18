import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ISearchResults } from '../interface/searchResults';
import { SearchService } from '../service/searchResults.service';

@Component({
    selector: 'Search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
    searchSub!: Subscription;

    constructor(
        private searchService: SearchService,
        private route: ActivatedRoute,
    ) { }

    results!: ISearchResults;
    query!: any;

    ngOnInit(): void {
        this.searchSub = this.route.paramMap.subscribe(params => {
            console.log(params);
            this.query = params.get('query');
            this.searchService
                .search(this.query)
                .subscribe({
                    next: results => {
                        this.results = results
                    }
                });
        });
    }

    ngOnDestroy() {
        this.searchSub.unsubscribe();
    }
}