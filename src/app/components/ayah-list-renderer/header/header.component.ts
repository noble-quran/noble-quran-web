import { Component, Input } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { asyncTimer } from 'src/app/utils';

@Component({
  selector: 'read-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class ReadHeaderComponent {
  constructor(public navigator: NavigationService) {}

  @Input() menuList: any;
  @Input() currentMenuItemIndex: number;

  public menuOpen = false;

  async navigateToHome(event: MouseEvent) {
    if (!event.shiftKey && !event.ctrlKey) {
      event.preventDefault();
      this.navigator.navigateToHome();
    }
  }

  scrollToActiveMenuItem() {
    // scroll to list-item-active
    const listItems = document.querySelectorAll('.list-item-active');
    listItems
      .item(0)
      ?.scrollIntoView({ behavior: 'instant' as any, block: 'center', inline: 'center' });
  }

  async onMenuOpened() {
    console.log('menu opened');

    await asyncTimer(0);
    this.scrollToActiveMenuItem();

    // just to be sure
    await asyncTimer(20);
    this.scrollToActiveMenuItem();
  }
}
