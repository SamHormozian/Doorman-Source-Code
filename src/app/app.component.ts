import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform, NavController, AlertController } from '@ionic/angular';
import {EventService} from "./services/event.service";
import {LoaderService} from "./services/loader.service";
import {RestApiService} from "./services/rest-api.service";
import {AppConfig} from "./app.config";
import { Storage } from '@ionic/storage-angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
// import { FCM } from '@ionic-native/fcm/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  indecateSideVar = "left";
  public activePage = 0;
  listPages : any = [];
  userData: any = [];
  userId: any = "";
  userLatitude: any = "";
  userLongitude: any = "";
  
  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };
  constructor(
  		private platform: Platform, 
	    private navCtrl: NavController,
	    private splashScreen: SplashScreen,
	    private statusBar: StatusBar,
		private zone: NgZone,
		private storage: Storage,
		private eventServices: EventService,
		private restApi: RestApiService,
		private alertController: AlertController,
		private geolocation: Geolocation,
		private loaderService: LoaderService,
		private push: Push
		// private fcm: FCM
  	) {
  	 this.initializeApp();
  	 this.storage.get("USER_ID").then((res) => {
        if(res != undefined && res != null){
        	this.userId = res;
        	this.navCtrl.navigateRoot(['/tabs/tabs/home']);
        }
        else
        {
        	this.navCtrl.navigateRoot(['landing']);
        }
    });
  }

  initializeApp() {
  		const storage =  this.storage.create();
  		this.listPages = [
		    {
		      title: 'User Feedback',
		      sub_title: 'User Feedback',
		      url: '/user-feedback',
		      icon: 'mail'
		    },
		    {
		        title: 'Terms Of Service',
		        sub_title: 'Terms Of Service',
		        url: '/terms',
		        icon: 'document-text'
		  	},
		  	{
		        title: 'User Agreement',
		        sub_title: 'User Agreement',
		        url: '/user-agreement',
		        icon: 'document-text'
		  	},
		  	{
		        title: 'Share',
		        sub_title: 'Share',
		        url: '/share',
		        icon: 'share-social'
		  	},
		    {
		        title: 'Logout',
		        sub_title: 'Logout',
		        url: '/logout',
		        icon: 'log-out-outline'
		  	}
	  	];

	  	this.platform.ready().then(() => {
	      this.statusBar.styleDefault();
	      this.splashScreen.hide();

	      this.geolocation.getCurrentPosition().then((resp) => {
		      this.userLatitude = resp.coords.latitude;
		      this.userLongitude = resp.coords.longitude;
		      let userPosition = {
		        'latitude': this.userLatitude,
		        'longitude': this.userLongitude
		      };
		      console.log(userPosition);
		      this.storage.set("USER_POSITION", userPosition);
		     }).catch((error) => {
		       console.log('Error getting location', error);
		     });
		    this.proceedPushNotification();
	    });
  	}

  	proceedPushNotification(){
		/*// get FCM token
		this.fcm.getToken().then(token => {
			console.log(token);
			this.storage.set("PUSH_TOKEN", token);
		});
		// ionic push notification example
		this.fcm.onNotification().subscribe(data => {
			console.log(data);
			if (data.wasTapped) {
			  console.log('Received in background');
			} else {
			  console.log('Received in foreground');
			}
		});      
		// refresh the FCM token
		this.fcm.onTokenRefresh().subscribe(token => {
			console.log(token);
			this.storage.set("PUSH_TOKEN", token);
		});
		// unsubscribe from a topic
		// this.fcm.unsubscribeFromTopic('offers');*/

		this.push.hasPermission()
        .then((res: any) => {
            if (res.isEnabled) {
                console.log('We have permission to send push notifications');
            }
            else {
                console.log('We do not have permission to send push notifications');
                this.loaderService.showToast("We do not have permission to send push notifications");
            }
        });
        const options: PushOptions = {
            android: {
                senderID: AppConfig.PUSH_SENDER_ID,
                icon: "notificationicon",
                iconColor: "#bf0606"
            },
            ios: {
                alert: 'true',
                badge: false,
                sound: 'true'
            },
            windows: {},
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            }
        };
        const pushObject: PushObject = this.push.init(options);
        pushObject.on('registration').subscribe((data: any) => {
            console.log('Get device token...' + data.registrationId);
            let deviceType = "";
            if (this.platform.is("android")) {
                deviceType = "Android";
            }
            if (this.platform.is("ios")) {
                deviceType = "iOS";
            }
            this.storage.set("PUSH_TOKEN", data.registrationId);
        });
        pushObject.on('notification').subscribe((data: any) => {
            //if user using app and push notification comes
            if (data.additionalData.foreground) {
                console.log('Push notification in foreground');
                this.loaderService.showToast(data.message);
            }
            else {
                console.log('Push notification in background');
            }
        });
        pushObject.on('error').subscribe((error) => {
            console.error('Error with Push plugin' + error)
        });
  	}
}
