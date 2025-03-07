import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then(x => x.HomePageModule)
          },
          {
            path: 'events/:page_type/:cat_id',
            children: [
              {
                path: '',
                loadChildren: () => import('../events/events.module').then( m => m.EventsPageModule)
              }
            ]
          },
          {
            path: 'event-categories',
            children: [
              {
                path: '',
                loadChildren: () => import('../event-categories/event-categories.module').then( m => m.EventCategoriesPageModule)
              }
            ]
          },
          {
            path: 'popular-host',
            children: [
              {
                path: '',
                loadChildren: () => import('../popular-host/popular-host.module').then( m => m.PopularHostPageModule)
              }
            ]
          }
        ]
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () => import('../map/map.module').then(x => x.MapPageModule)
          }
        ]
      },
      {
        path: 'host-event',
        children: [
          {
            path: '',
            loadChildren: () => import('../host-event/host-event.module').then(x => x.HostEventPageModule)
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () => import('../settings/settings.module').then(x => x.SettingsPageModule)
          },
          {
            path: 'hosting-upcoming-events',
            children: [
              {
                path: '',
                loadChildren: () => import('../hosting-upcoming-events/hosting-upcoming-events.module').then( m => m.HostingUpcomingEventsPageModule)
              }
            ]
          },
          {
            path: 'previous-attented-events',
            children: [
              {
                path: '',
                loadChildren: () => import('../previous-attented-events/previous-attented-events.module').then( m => m.PreviousAttentedEventsPageModule)
              }
            ]
          },
          {
            path: 'previous-event-hosted',
            children: [
              {
                path: '',
                loadChildren: () => import('../previous-event-hosted/previous-event-hosted.module').then( m => m.PreviousEventHostedPageModule)
              }
            ]
          },
          {
            path: 'attending-event',
            children: [
              {
                path: '',
                loadChildren: () => import('../attending-event/attending-event.module').then( m => m.AttendingEventPageModule)
              }
            ]
          },
          {
            path: 'contact',
            children: [
              {
                path: '',
                loadChildren: () => import('../contact/contact.module').then( m => m.ContactPageModule)
              }
            ]
          },
          {
            path: 'notification',
            children: [
              {
                path: '',
                loadChildren: () => import('../notification/notification.module').then( m => m.NotificationPageModule)
              }
            ]
          },
          {
            path: 'user-profile/:page_type',
            children: [
              {
                path: '',
                loadChildren: () => import('../user-profile/user-profile.module').then( m => m.UserProfilePageModule)
              }
            ]
          },
          {
            path: 'user-profile-scanner',
            children: [
              {
                path: '',
                loadChildren: () => import('../user-profile-scanner/user-profile-scanner.module').then( m => m.UserProfileScannerPageModule)
              }
            ]
          },
          {
            path: 'user-profile-images',
            children: [
              {
                path: '',
                loadChildren: () => import('../user-profile-images/user-profile-images.module').then( m => m.UserProfileImagesPageModule)
              }
            ]
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
