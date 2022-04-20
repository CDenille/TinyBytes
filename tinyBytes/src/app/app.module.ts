import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { RecipeComponent } from './recipe/recipe.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    RecipeComponent,
    SearchComponent,
    CategoriesComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(
      [
        { path: '', component: HomeComponent },
        { path: 'signup', component: SignupComponent },
        { path: 'categories', component: CategoriesComponent},
        { path: 'recipe/:recipeId', component: RecipeComponent },
        { path: 'search/:query', component: SearchComponent},
        { path: '**', redirectTo: '', pathMatch: 'full' },
      ]
    ),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
