import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Task } from '../task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class HomePage {
  value: Task = {
    id: '',
    name: '',
    finished: false,
    dueDate: ''
  };
  taskList: Task[] = [];
  
  async addItem() {
    console.log("ae")
  }

  handleClearList() {
    console.log("limpar lista")
  }

  checkAllItens(items: any) {
    // 
  }

  deleteItem(id: string) {
    // 
  }
}
