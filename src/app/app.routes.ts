import { Routes } from '@angular/router';
import { BatTestComponent } from './bat-test/bat-test.component';
import { MsalComponent } from './msal/msal.component';
import { AuthFormComponent } from './auth-form/auth-form.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthFormComponent
    },
    {
        path: 'test',
        component: BatTestComponent
    },
    {
        path: 'msal',
        component: MsalComponent
    }
];
