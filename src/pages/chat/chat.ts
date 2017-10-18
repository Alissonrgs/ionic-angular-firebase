import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularfire2/database";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  title: string = "SuperChat"
  dbMessages$: Observable<any[]>
  messages: any[]
  send_message: string
  channel: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    this.channel = this.navParams.get('channel')
    this.dbMessages$ = this.db.list('channels/' + this.channel.key + '/messages').valueChanges();
    this.dbMessages$.subscribe((data)=>{
      this.messages = data
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  send() {
    this.messages.push(this.send_message)
    this.db.list('channels/' + this.channel.key + '/messages').push({
      user: "alissonrgs",
      text: this.send_message
    })
    this.db.object('channels/' + this.channel.key).update({last_message: this.send_message})
  }
}
