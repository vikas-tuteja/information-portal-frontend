import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ToastrService } from 'ngx-toastr';
import { MESSAGES } from 'src/app/constants/messages';
import { SearchList } from 'src/app/models/content';
import { ContentsService } from 'src/app/services/contents.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  selectedPage!: string;
  isLoggedIn!: boolean;
  searchList!: SearchList;
  currentFocus = -1;
  inp!: HTMLInputElement;
  isMobile!: any;
  isDesktop!: any;

  constructor(
    private deviceService: DeviceDetectorService,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private userService: UserService,
    private contentService: ContentsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    // const isTablet = this.deviceService.isTablet();
    this.isDesktop = this.deviceService.isDesktop();

    this.selectedPage = this.activatedRoute.snapshot.url[0]?.path || 'home';

    // check if login
    this.isLoggedIn = this.sharedService.isLoggedIn();
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      const res = document.getElementById('searchautocomplete-list');
      const inp = document.getElementById('search') as HTMLInputElement;
      if (res) {
        res.style.visibility = 'hidden';
        inp.value = '';
      }
      inp.classList.remove('full-search');
      inp.classList.add('search');
    }
  }
  // sign out
  SignOut() {
    this.userService.removeAuthUser();
    this.toastr.warning(MESSAGES.SIGNOUT_SUCCESS);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  // autosuggest functionalities
  addActive(x: any) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    this.removeActive(x);
    if (this.currentFocus >= x.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[this.currentFocus].classList.add('autocomplete-active');
    return false;
  }

  removeActive(x: any) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove('autocomplete-active');
    }
  }

  closeAllLists(inp: any, elmnt: any) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName('autocomplete-items');
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode?.removeChild(x[i]);
      }
    }
  }

  getSearchList() {
    this.inp = document.getElementById('search') as HTMLInputElement;
    const search_string = this.inp.value;

    // get search result list from BE
    this.contentService.getSearchList(search_string).subscribe((searchList) => {
      this.searchList = searchList;
      const that = this;
      // show search result aurosuggest div
      var a,
        b,
        i,
        val = this.inp.value;
      /*close any already open lists of autocompleted values*/
      this.closeAllLists(this.inp, this);
      if (!val) {
        return;
      }

      /*create a DIV element that will contain the items (values):*/
      a = document.createElement('DIV');
      a.setAttribute('id', this.inp.id + 'autocomplete-list');
      a.setAttribute('class', 'autocomplete-items');
      /*append the DIV element as a child of the autocomplete container:*/
      this.inp.parentNode?.appendChild(a);
      /*for each item in the that.searchListay...*/
      let getHighlightedRow = this.sharedService.highlightText(val);
      for (i = 0; i < this.searchList.count; i++) {
        /*create a DIV element for each matching element:*/
        b = document.createElement('DIV');
        /*make the matching letters bold:*/
        // b.innerHTML =
        //   '<span class="strong">' +
        //   this.searchList.results[i].name.substr(0, val.length) +
        //   '</span>';
        b.innerHTML += getHighlightedRow(this.searchList.results[i].title);
        b.innerHTML +=
          '<span class="float-right strong"> in ' +
          this.searchList.results[i].sub_category__name +
          '</span>';
        /*insert a input field that will hold the current that.searchListay item's value:*/
        b.innerHTML +=
          "<input type='hidden' value='" +
          this.searchList.results[i].href +
          "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener('click', function (e) {
          /*insert the value for the autocomplete text field:*/
          const url = this.getElementsByTagName('input')[0].value;
          window.location.href = url;
        });

        // this.inp.addEventListener<any>(e) {}
        a.appendChild(b);
      }
    });
  }

  // add full search class on mobile
  cssSetUp() {
    const inp = document.getElementById('search') as HTMLInputElement;
    if (this.isMobile || true) {
      inp.classList.remove('search');
      inp.classList.add('full-search');
    }
  }

  // close autosuggest div if open
  @HostListener('document:click', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  closeAutosuggest(elem: any) {
    const inp = document.getElementById('search') as HTMLInputElement;
    const autosugg = document.getElementById(
      'searchautocomplete-list'
    ) as HTMLDivElement;

    if (elem.target.id !== 'search' && autosugg) {
      inp.value = '';
      inp.classList.remove('full-search');
      inp.classList.add('search');
      autosugg.style.visibility = 'hidden';
    }
  }
}
