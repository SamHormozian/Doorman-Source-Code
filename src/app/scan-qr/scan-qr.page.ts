import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {

  scannedData: any;
  encodedData: '';
  encodeData: any;
  inputData: any;

  constructor(private qrcodescanner: BarcodeScanner) { }

  ngOnInit() {
  }

  scanQRcode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a qr code inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.qrcodescanner.scan(options).then(qrCodeData => {
      console.log('QR Code data', qrCodeData);
      this.scannedData = qrCodeData;

    }).catch(err => {
      console.log('Error', err);
    });
  }

}
