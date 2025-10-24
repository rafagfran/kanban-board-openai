import { Component } from '@angular/core';

@Component({
	selector: 'board-header',
	imports: [],
	templateUrl: './board-header.component.html',
	styleUrl: './board-header.component.scss',
})
export class BoardHeaderComponent {
	currentDate = new Date().toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
    
	});
}
