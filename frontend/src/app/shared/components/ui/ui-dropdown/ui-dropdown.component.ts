import { Component } from '@angular/core';
import { IconDotsThree } from '@shared/icons/dots.component';
import { UiButtonComponent } from '../ui-button/ui-button.component';

@Component({
	selector: 'ui-dropdown',
	imports: [IconDotsThree, UiButtonComponent],
	templateUrl: './ui-dropdown.component.html',
	styleUrl: './ui-dropdown.component.scss',
})
export class UiDropdownComponent {
	isMenuOpened = false;

	toggleMenu() {
		this.isMenuOpened = !this.isMenuOpened;
	}

	clickedOutside() {
		this.isMenuOpened = false;
	}

	handleDeleteColumn() {
		console.log('Delete column');
	}
}
