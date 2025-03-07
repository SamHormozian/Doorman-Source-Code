import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/Camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Push} from '@ionic-native/push/ngx';
// import FCM
// import { FCM } from '@ionic-native/fcm/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
	  	BrowserModule, 
	  	IonicModule.forRoot(), 
      IonicStorageModule.forRoot(),
	  	AppRoutingModule, 
	  	HttpClientModule,
	  	FormsModule,
	    ReactiveFormsModule
  	],
  providers: [
  	Platform,
    StatusBar,
    SplashScreen,
    Camera,
    File,
    FileTransfer,
    Geolocation,
    NativeGeocoder,
    Push,
    // FCM,
	 { 
	  	provide: RouteReuseStrategy, 
	  	useClass: IonicRouteStrategy 
  	}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
