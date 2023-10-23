export class BasePageComponent {
  paginate = {
    start: 0,
    total: 0,
    perPage: 10,
    page: 1
  };
  domainId: any = '';

  prepareType(type: string) {
    if (type == 'first') {
      this.paginate.start = 0;
      this.paginate.page = 1;
    }
    else if (type == 'prev') {
      this.paginate.start = this.paginate.start - this.paginate.perPage;
      this.paginate.page = this.paginate.page - 1;
    }
    else if (type == 'next') {
      this.paginate.start = this.paginate.start + this.paginate.perPage;
      this.paginate.page = this.paginate.page + 1;
    }
    else if (type == 'last') {
      this.paginate.start = this.paginate.total - this.paginate.perPage;
      let temp = Math.ceil(this.paginate.total / this.paginate.perPage);
      this.paginate.page = temp;
    }
  }

  isLastPage(): boolean {
    return this.paginate.total === Math.min(this.paginate.total, (this.paginate.start + this.paginate.perPage));
  }

  isFirstPage(): boolean {
    return this.paginate.start === 0;
  }

  isPaginate(): boolean {
    return this.paginate.total > this.paginate.perPage;
  }

  next() {
    this.paginate.start = this.paginate.start + this.paginate.perPage;
  }

  prev() {
    this.paginate.start = this.paginate.start - this.paginate.perPage;
  }

  setCursorMoney(el: any) {
    setTimeout(function () {
      el.target.selectionStart = 3;
      el.target.selectionEnd = 3;
    }, 200);
  }
  get currentPage() {
    return Math.min(this.paginate.perPage + this.paginate.start, this.paginate.total)
  }
}