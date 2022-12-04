import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  searchInput: string = '';
  myControl = new FormControl('');


  @Output() loginEmitter: EventEmitter<any> = new EventEmitter();
  @Output() home: EventEmitter<any> = new EventEmitter();

  // horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  // verticalPosition: MatSnackBarVerticalPosition = 'top';


  loggedInUser: string = 'Guest'
  loggedIn: boolean = false; 

  // subscription: Subscription;


  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  //depricated
  searchObjects(event: any) {
    // console.log('event', event)
    // let typedValue = event.target.value.toLowerCase();
    
    // if( this.radioValue === 'all') {
    //   this.allObjects = this.referenceAllObjects.filter(
    //     ( object: any ) => {
    //       return object.name.toLowerCase().includes(typedValue);
    //     }
    //   )
    // } else if( this.radioValue === 'standard') {
    //   this.allObjects = this.standardObjects.filter(
    //     ( object: any ) => {
    //       return object.name.toLowerCase().includes(typedValue);
    //     }
    //   )
    // } else {
    //   this.allObjects = this.customObjects.filter(
    //     ( object: any ) => {
    //       return object.name.toLowerCase().includes(typedValue);
    //     }
    //   )
    // }
  }

  globalSearch(input: any, event: any) {
    // this.enableCheckBox = true;
    // console.log('DropDown val ---------', this.selectedValue)
    // event.stopPropagation();
    // trigger.closePanel();
    // const payload = {
    //   pagination: {
    //     offset: 0,
    //     limit: 12
    //   },
    //   searchInput: this.searchInput,
    //   searchParameter: this.selectedValue
    // }
    // console.log('Search payload ---> ', payload)
    // this.getAllObjectsWithDetails(payload)

  }

  resetSearch(value: string, event: any) {
    // this.enableCheckBox = false;
    event.stopPropagation();
    // trigger.closePanel();

    this.searchInput = '';

    // const payload = {
    //   pagination: {
    //     offset: 0,
    //     limit: 12
    //   },
    //   type: this.selectedRadio,
    // }
    // this.getAllObjectsWithDetails(payload)

    // if(this.radioValue === 'all') {
    //   this.allObjects = this.referenceAllObjects;
    // //   this.allObjects = this.referenceAllObjects.map(a => {return {...a}});
    // } else if (this.radioValue === 'standard') {
    //   this.allObjects = this.standardObjects;
    // } else
    //   this.allObjects = this.customObjects;
  }


  homeHandler(tab: string) {
    this.home.emit(true)
    this.router.navigate(['/home']);
    
  }

  loginHandler(tab: string) {
    // this.tabEmitter.emit(tab)
    this.router.navigate(['/login']);

  }
  aboutHandler(tab: string) {
    // this.tabEmitter.emit(tab)
    this.router.navigate(['/about']);
    
  }

  logoutHandler(tab: string) {
    // this._snackBar.open(this.loggedInUser + ' has been logged out!', 'Close', {
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,
    //   duration: 2000,
    // });
    // this.mainService.logout();
    this.loggedInUser = 'Guest';  
    this.loggedIn = false;
    this.home.emit(true)
    this.router.navigate(['/home']);
    
  }

  adminHandler(tab: string) {
    // this.tabEmitter.emit(tab)
    this.router.navigate(['/admins']);
    
  }

  registerAdmin(tab: string) {
    // this.tabEmitter.emit(tab)
    this.router.navigate(['/register-admin']);
    
  }

  handler () {
    
  }
  
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    // this.subscription.unsubscribe();
}


}
