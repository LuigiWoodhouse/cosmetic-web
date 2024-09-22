import { Component, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UtilService } from '../services/util.service';
import { CommonModule } from '@angular/common';
import { WhatsappButtonComponent } from '../buttons/whatsapp-button/whatsapp-button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    RouterModule,
    CommonModule,
    WhatsappButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(public utils: UtilService,
    private observer: BreakpointObserver) { }
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  // The purpose of this method is to control how the visibility and retraction of the sidenav
  closeSidenav() {
    //==Behaviour 1==//

    //if the screen width is *GREATER* than the value set at max-width, then the sidenav *WILL BE* shown automatically and not retracted
    //when the user clicks a button on the sidenav to display the content associated with that button. This also means that the ability
    //to hide the sidenav will not be available as there is enough space to display the sidenav and the content.

    //==Behaviour 2==//

    //if the screen width is *LESSER* than the value set at max-width then the sidenav *WILL NOT BE* shown automatically and
    //will retract when the user clicks a button on the sidenav to display the content associated with that button. The user
    //will have the ability to reopen the sidenav using the hamburger icon button at the top right of the navbar.

    //==Behaviour 3==//

    //if the screen width is the "SAME" as the value set at max-width. Then Behaviour 1 will be activated.
    this.observer.observe(['(max-width: 1025px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over'
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side'
        //this.sidenav.open();
      }
    })
  }
}
