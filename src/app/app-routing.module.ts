import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'memory', loadChildren: () => import('./pages/memory/memory.module').then(m => m.MemoryModule) },
  { path: '**', redirectTo: '' } // If No path exists redirect home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
