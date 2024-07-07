import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SingleItemComponent } from './lingerie-shop/item/single-item/single-item.component';

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
        ]
    },
]