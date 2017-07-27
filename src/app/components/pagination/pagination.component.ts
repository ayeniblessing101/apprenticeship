import { Component, Output, EventEmitter } from '@angular/core';

@Component ({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Output() currentPage: number = 1;
  @Output() itemsPerPage: number;
  @Output() totalItems: number;
  @Output() pageChange: EventEmitter<any> = new EventEmitter<any>();

  emitPageChange(event) {
    this.pageChange.emit(event);
  }
}
