import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from '././members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResover } from './_resolvers/member-detail.resolver';
import { MemberListResover } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResover } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members',
        component: MemberListComponent,
        resolve: {
          users: MemberListResover
        }
      },
      {
        path: 'members/:id',
        component: MemberDetailComponent,
        resolve: {
          user: MemberDetailResover
        }
      },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        resolve: {
          user: MemberEditResover
        },
        canDeactivate: [PreventUnsavedChanges]
      },

      { path: 'lists', component: ListsComponent, resolve : {users : MemberListResover} },

      { path: 'messages', component: MessagesComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
