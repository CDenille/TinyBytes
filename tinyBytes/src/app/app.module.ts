import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { RecipeComponent } from './recipe/recipe.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ReviewComponent } from './review/review.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoritesComponent,
    FooterComponent,
    HeaderComponent,
    RecipeComponent,
    SearchComponent,
    CategoriesComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    DocumentationComponent,
    UnauthorizedComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        { path: '', component: HomeComponent },
        { path: 'signup', component: SignupComponent },
        { path: 'categories', component: CategoriesComponent },
        { path: 'favorites', component: FavoritesComponent },
        { path: 'recipe/:recipeId', component: RecipeComponent },
        { path: 'profile/:userId', component: ProfileComponent },
        { path: 'search/:query', component: SearchComponent },
        { path: 'login', component: LoginComponent },
        { path: 'documentation', component: DocumentationComponent },
        { path: 'unauthorized', component: UnauthorizedComponent },
        { path: 'review/:recipeId', component: ReviewComponent },
        { path: '**', redirectTo: '', pathMatch: 'full' },
      ]
    ),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
