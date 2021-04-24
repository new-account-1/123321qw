import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ClassProvider } from '@angular/core';
import {FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HeaderComponent } from './header/header.component';
import { TitlePageComponent } from './title-page/title-page.component';
import { WorkOnYourselfComponent } from './work-on-yourself/work-on-yourself.component';
import { DietaryComponent } from './dietary/dietary.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { SupplementInfoComponent } from './supplement-info/supplement-info.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProviderService } from './shared/services/provider.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './AuthInterceptor';
import { ProfileComponent } from './profile/profile.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TestComponent } from './test/test.component';
import { TaskComponent } from './task/task.component';
import { FooterComponent } from './footer/footer.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HeaderComponent,
    TitlePageComponent,
    WorkOnYourselfComponent,
    DietaryComponent,
    ExercisesComponent,
    SupplementInfoComponent,
    LoginComponent,
    ResetPasswordComponent,
    ProfileComponent,
    AdminPanelComponent,
    TestComponent,
    TaskComponent,
    FooterComponent,
    MainMenuComponent,
    MyAccountComponent,
    ContactsComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    ProviderService,
    <ClassProvider> {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent,HeaderComponent,TitlePageComponent,SignUpComponent,WorkOnYourselfComponent,DietaryComponent,ExercisesComponent,SupplementInfoComponent]
})
export class AppModule { }
