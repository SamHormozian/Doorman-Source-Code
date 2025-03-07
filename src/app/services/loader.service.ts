import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  constructor(
  		public loadingController: LoadingController,
  		public toastCtrl: ToastController
	) { }

  // Simple loader
  simpleLoader(message: string) {
    this.loadingController.create({
      message: message
    }).then((response) => {
      response.present();
    });
  }
  // Dismiss loader
  dismissLoader() {
    this.loadingController.dismiss().then((response) => {
      console.log('Loader closed!', response);
    }).catch((err) => {
      console.log('Error occured : ', err);
    });
  }
  // Auto hide show loader
  autoLoader(message: string) {
    this.loadingController.create({
      message: message,
      duration: 4000
    }).then((response) => {
      response.present();
      response.onDidDismiss().then((response) => {
        console.log('Loader dismissed', response);
      });
    });
  }   
  // Custom style + hide on tap loader
  showLoader(message: string) {
    this.loadingController.create({
      message: message,
      duration: 2000,
      cssClass:'PageLoader',
      backdropDismiss:true
    }).then((res) => {
      res.present();
    });
  } 
  // show message as toast bar
  async showToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    return await toast.present();
  }  
}