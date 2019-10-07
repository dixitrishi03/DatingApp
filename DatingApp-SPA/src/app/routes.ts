import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from '././members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResover } from './_resolvers/member-detail.resolver';
import { MemberListResover } from './_resolvers/member-list.resolver';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'member-list',
        component: MemberListComponent,
        resolve: {
          users: MemberListResover
        }
      },
      {
        path: 'member-list/:id',
        component: MemberDetailComponent,
        resolve: {
          user: MemberDetailResover
        }
      },
      { path: 'lists', component: ListsComponent },

      { path: 'messages', component: MessagesComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
