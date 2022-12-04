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

  loggedInUser: string = 'Guest'
  loggedIn: boolean = false; 

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  fetchAllTracks(){

  }

  playlistHandler(){

  }

  fetchAllPlaylists(){

  }

  modifyPlaylist(){

  }

  searchObjects(event: any) {
  }

  globalSearch(input: any, event: any) {
  }

  resetSearch(value: string, event: any) {
    // this.enableCheckBox = false;
    event.stopPropagation();
    // trigger.closePanel();

    this.searchInput = '';
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

}


}
