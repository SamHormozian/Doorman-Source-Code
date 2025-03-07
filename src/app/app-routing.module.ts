import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'user-feedback',
    loadChildren: () => import('./user-feedback/user-feedback.module').then( m => m.UserFeedbackPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'user-agreement',
    loadChildren: () => import('./user-agreement/user-agreement.module').then( m => m.UserAgreementPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'create-profile',
    loadChildren: () => import('./create-profile/create-profile.module').then( m => m.CreateProfilePageModule)
  },
  {
    path: 'share',
    loadChildren: () => import('./share/share.module').then( m => m.SharePageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'host-event',
    loadChildren: () => import('./host-event/host-event.module').then( m => m.HostEventPageModule)
  },
  {
    path: 'events/:page_type/:cat_id',
    loadChildren: () => import('./events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'edit-event/:event_id',
    loadChildren: () => import('./edit-event/edit-event.module').then( m => m.EditEventPageModule)
  },
  {
    path: 'accept-applicant/:event_id',
    loadChildren: () => import('./accept-applicant/accept-applicant.module').then( m => m.AcceptApplicantPageModule)
  },
  {
    path: 'manage-applicant/:event_id',
    loadChildren: () => import('./manage-applicant/manage-applicant.module').then( m => m.ManageApplicantPageModule)
  },
  {
    path: 'event-details/:event_id',
    loadChildren: () => import('./event-details/event-details.module').then( m => m.EventDetailsPageModule)
  },
  {
    path: 'hosting-upcoming-events',
    loadChildren: () => import('./hosting-upcoming-events/hosting-upcoming-events.module').then( m => m.HostingUpcomingEventsPageModule)
  },
  {
    path: 'edit-hosting-event/:event_id',
    loadChildren: () => import('./edit-hosting-event/edit-hosting-event.module').then( m => m.EditHostingEventPageModule)
  },
  {
    path: 'previous-attented-events',
    loadChildren: () => import('./previous-attented-events/previous-attented-events.module').then( m => m.PreviousAttentedEventsPageModule)
  },
  {
    path: 'review-applicants/:event_id',
    loadChildren: () => import('./review-applicants/review-applicants.module').then( m => m.ReviewApplicantsPageModule)
  },
  {
    path: 'previous-attented-event-details/:event_id',
    loadChildren: () => import('./previous-attented-event-details/previous-attented-event-details.module').then( m => m.PreviousAttentedEventDetailsPageModule)
  },
  {
    path: 'attending-event',
    loadChildren: () => import('./attending-event/attending-event.module').then( m => m.AttendingEventPageModule)
  },
  {
    path: 'attending-event-details/:event_id',
    loadChildren: () => import('./attending-event-details/attending-event-details.module').then( m => m.AttendingEventDetailsPageModule)
  },
  {
    path: 'event-filter/:cat_id/:filter_type',
    loadChildren: () => import('./event-filter/event-filter.module').then( m => m.EventFilterPageModule)
  },
  {
    path: 'rate-host/:host_id/:page_type',
    loadChildren: () => import('./rate-host/rate-host.module').then( m => m.RateHostPageModule)
  },
  {
    path: 'edit-profile/:page_type',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'scan-qr',
    loadChildren: () => import('./scan-qr/scan-qr.module').then( m => m.ScanQrPageModule)
  },
  {
    path: 'send-qr',
    loadChildren: () => import('./send-qr/send-qr.module').then( m => m.SendQrPageModule)
  },
  {
    path: 'rate-attendees/:host_id/:event_id',
    loadChildren: () => import('./rate-attendees/rate-attendees.module').then( m => m.RateAttendeesPageModule)
  },
  {
    path: 'rate-attendees-listing/:event_id',
    loadChildren: () => import('./rate-attendees-listing/rate-attendees-listing.module').then( m => m.RateAttendeesListingPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'event-categories',
    loadChildren: () => import('./event-categories/event-categories.module').then( m => m.EventCategoriesPageModule)
  },
  {
    path: 'popular-host',
    loadChildren: () => import('./popular-host/popular-host.module').then( m => m.PopularHostPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'user-profile-images/:user_id/:page_type',
    loadChildren: () => import('./user-profile-images/user-profile-images.module').then( m => m.UserProfileImagesPageModule)
  },
  {
    path: 'host-profile/:host_id/:page_type',
    loadChildren: () => import('./host-profile/host-profile.module').then( m => m.HostProfilePageModule)
  },
  {
    path: 'user-profile/:page_type',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'user-profile-scanner',
    loadChildren: () => import('./user-profile-scanner/user-profile-scanner.module').then( m => m.UserProfileScannerPageModule)
  },
  {
    path: 'previous-event-hosted',
    loadChildren: () => import('./previous-event-hosted/previous-event-hosted.module').then( m => m.PreviousEventHostedPageModule)
  },
  {
    path: 'previous-event-hosted-details/:event_id',
    loadChildren: () => import('./previous-event-hosted-details/previous-event-hosted-details.module').then( m => m.PreviousEventHostedDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
