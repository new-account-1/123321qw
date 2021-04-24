import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HeaderComponent } from './header/header.component';
import { TitlePageComponent } from './title-page/title-page.component';
import { WorkOnYourselfComponent } from './work-on-yourself/work-on-yourself.component';
import { DietaryComponent } from './dietary/dietary.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { SupplementInfoComponent } from './supplement-info/supplement-info.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TestComponent } from './test/test.component';
import { TaskComponent } from './task/task.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ContactsComponent } from './contacts/contacts.component';

const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: "",
    component: TitlePageComponent,
  },
  {
    path:'work-on-yourself',
    component: WorkOnYourselfComponent,
  },
  {
    path:'dietary',
    component:DietaryComponent,
  },
  {
    path:'exercises',
    component:ExercisesComponent
  },
  {
    path:'supplement-info',
    component:SupplementInfoComponent,
  },
  {
    path:'sign-in',
    component:LoginComponent,
  },
  {
    path:'profile',
    component:ProfileComponent,
  },
  {
    path:'adminpanel',
    component:AdminPanelComponent
  },
  {
    path:'test',
    component: TestComponent
  },
  {
    path:'tasks',
    component:TaskComponent
  },
  {
    path:'main-menu',
    component: MainMenuComponent
  },
  {
    path:'my-account',
    component: MyAccountComponent
  },
  {
    path:'contacts',
    component: ContactsComponent
  }
  // {
  // },
  // {
  //   path: '',
  //   component: '',
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
