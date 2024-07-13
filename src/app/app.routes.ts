import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SingleItemComponent } from './lingerie-shop/single-item/single-item.component';
import { GuestPlaceOrderComponent } from './order/guest-place-order/guest-place-order.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: '',
        component: NavbarComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'item-details/:itemId',
                component: SingleItemComponent
            },
            {
                path: 'cart/guest-place-order',
                component: GuestPlaceOrderComponent
              },
        ]
    },
]