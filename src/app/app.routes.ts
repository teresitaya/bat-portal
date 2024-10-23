import { Routes } from '@angular/router';
import { BatTestComponent } from './bat-test/bat-test.component';
import { MsalComponent } from './msal/msal.component';

export const routes: Routes = [
    {
        path: '',
        component: BatTestComponent
    },
    {
        path: 'msal',
        component: MsalComponent
    }
];
