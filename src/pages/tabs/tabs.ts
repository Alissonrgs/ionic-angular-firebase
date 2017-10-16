import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ChatPage } from '../chat/chat';
import { ChannelPage } from '../channel/channel';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ChatPage;
  tab3Root = ChannelPage;

  constructor() {

  }
}
