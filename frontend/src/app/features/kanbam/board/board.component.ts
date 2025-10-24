import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { IconPlus } from '@shared/icons/plus.component';
import { Cards, Columns } from '@type/types';
import { BoardHeaderComponent } from '../../layout/header/board-header.component';
import { UiButtonComponent } from '../../ui/ui-button/ui-button.component';
import { UiInputComponent } from '../../ui/ui-input/ui-input.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { BoardColumnComponent } from '../column/board-column.component';
import { BoardService } from './board.service';


@Component({
  selector: 'app-board',
  imports: [
    BoardHeaderComponent,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    BoardColumnComponent,
    UiInputComponent,
    UiButtonComponent,
    IconPlus,
    ChatbotComponent,

  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  @ViewChild(UiInputComponent) inputNewList!: UiInputComponent;
  @ViewChild('newListContainer') newListContainer!: ElementRef<HTMLDivElement>;

  columns = signal<Columns[]>([]);
  showInput = signal(false);
  newColumnTitle = new FormControl('');

  constructor(private boardService: BoardService, private http: HttpClient) { }

  getBoardData() {
    this.boardService.fetchColumnsWithCards().subscribe({
      next: (data) => {
        this.columns.set(data);
      },
      error: (error) => console.log(error),
    });
  }

  ngOnInit() {
    this.getBoardData();
  }

  enableInput = () => {
    this.showInput.set(true);
  };

  addNewColumn() {
    if (this.newColumnTitle.value) {
      this.http
        .post<Columns>('http://localhost:3000/column', {
          title: this.newColumnTitle.value,
        })
        .subscribe((newColumn) => {
          this.columns.update(cols => [...cols, newColumn]);
          this.newColumnTitle.setValue('');
          this.showInput.set(false);
        });
    }
  }

  dropColumn(event: CdkDragDrop<Columns[]>) {
    moveItemInArray(this.columns(), event.previousIndex, event.currentIndex);
  }

  dropCard(event: CdkDragDrop<Cards[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (
      this.showInput() &&
      this.inputNewList &&
      !this.newListContainer.nativeElement.contains(event.target as Node)
    ) {
      this.showInput.set(false);
      this.newColumnTitle.setValue('');
    }
  }
}
