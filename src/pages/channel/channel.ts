import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularfire2/database";
import { ChatPage } from '../chat/chat';

/**
 * Generated class for the ChannelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-channel',
  templateUrl: 'channel.html',
})
export class ChannelPage {
  title: string = "Channels"
  dbChannel$: Observable<any[]>
  channels: any[] = []
  new_channel: string

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    this.dbChannel$ = this.db.list('channels').snapshotChanges()
    this.dbChannel$.subscribe((data: any[])=>{
      this.channels = []
      for (let channel of data) {
        this.channels.push({
          channel: channel.payload.val(),
          key: channel.key
        })
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  create_channel() {
    this.db.list('channels').push({
      'name': this.new_channel
    })
  }

  open(channel) {
    this.navCtrl.push(ChatPage, {
      channel: channel
    });
  }
}
