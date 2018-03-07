import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appSetRequestHeaderIcon]',
})
export class SetRequestHeaderIconDirective implements OnInit {
  @Input() headerName: string;
  @Input() showAlphabeticIcon = true;
  @Input() activeSortCategory: string;
  @Input() sortCategoryValues = {};

  iconsUrls = {
    alphabetic: {
      ascending: {
        active: '../../../../assets/images/sort-a-z-active.png',
        inactive: '../../../../assets/images/sort-a-z-inactive.png',
      },
      descending: {
        active: '../../../../assets/images/sort-z-a-active.png',
        inactive: '../../../../assets/images/sort-z-a-inactive.png',
      },
    },

    nonAlphabetic: {
      ascending: {
        active: '../../../../assets/images/sort-asc-active.png',
        inactive: '../../../../assets/images/sort-asc-inactive.png',
      },
      descending: {
        active: '../../../../assets/images/sort-desc-active.png',
        inactive: '../../../../assets/images/sort-desc-inactive.png',
      },
    },
  };

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.setHeaderIconBySortingStatus();
  }

  /**
   * Sets the display icon for a request header based on the sorted request category values.
   * Category here refers to any of the requests header's names
   */
  setHeaderIconBySortingStatus() {
    const sortingOrder = this.sortCategoryValues[this.headerName];

    if (this.activeSortCategory === this.headerName && sortingOrder === 'asc') {
      this.elementRef.nativeElement.src = this.showAlphabeticIcon ?
        this.iconsUrls.alphabetic.ascending.active : this.iconsUrls.nonAlphabetic.ascending.active;
    } else if (this.activeSortCategory === this.headerName && sortingOrder === 'desc') {
      this.elementRef.nativeElement.src = this.showAlphabeticIcon ?
        this.iconsUrls.alphabetic.descending.active : this.iconsUrls.nonAlphabetic.descending.active;
    } else if (sortingOrder === 'asc') {
      this.elementRef.nativeElement.src = this.showAlphabeticIcon ?
        this.iconsUrls.alphabetic.ascending.inactive : this.iconsUrls.nonAlphabetic.ascending.inactive;
    } else {
      this.elementRef.nativeElement.src = this.showAlphabeticIcon ?
        this.iconsUrls.alphabetic.descending.inactive : this.iconsUrls.nonAlphabetic.descending.inactive;
    }

  }
}
