import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SongsComponent } from './songs/song-list.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
{path:'songs', component:SongsComponent},
{path:'',component:HomeComponent},
{path:'cart', component:CartComponent},
{path:'', redirectTo:'/', pathMatch:'full'},
{path:'**',redirectTo:'/',pathMatch:'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
