import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SingleItemComponent } from './lingerie-shop/single-item/single-item.component';
import { GuestPlaceOrderComponent } from './order/guest-place-order/guest-place-order.component';
import { DeliveryPolicyComponent } from './policies/delivery-policy/delivery-policy.component';
import { OrderPolicyComponent } from './policies/order-policy/order-policy.component';
import { PrivacyPolicyComponent } from './policies/privacy-policy/privacy-policy.component';
import { RefundPolicyComponent } from './policies/refund-policy/refund-policy.component';
import { ContactComponent } from './contact/contact.component';
import { SupportComponent } from './support/support.component';


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
            {
                path: 'privacy-policy',
                component: PrivacyPolicyComponent
            },
            {
                path: 'refund-policy',
                component: RefundPolicyComponent
            },
            {
                path: 'delivery-policy',
                component: DeliveryPolicyComponent
            },
            {
                path: 'order-policy',
                component: OrderPolicyComponent
            },
            {
                path: 'contact',
                component: ContactComponent
            },
            {
                path: 'support',
                component: SupportComponent
            },
        ]
    },
]