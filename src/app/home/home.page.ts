import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Task } from '../task';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task/task.service';
import { LocalNotificationsService } from '../task/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule],
})
export class HomePage {
  taskForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    finished: new FormControl(false),
    dueDate: new FormControl(new Date().toISOString()),
  });
  taskList: Task[] = [];
  editing = false;
  showPending = true;

  taskService: TaskService = inject(TaskService);
  notificationService: LocalNotificationsService = inject(LocalNotificationsService);

  async ngOnInit() {
    await this.refreshList("pending");
  }
  
  async addItem() {
    this.notificationService.createNotification();

    const generatedId = Date.now().toString();
    this.taskService.createTask(generatedId, {
      id: generatedId,
      name: this.taskForm.value.name,
      finished: this.taskForm.value.finished,
      dueDate: this.taskForm.value.dueDate,
    }).then(async() => {
      this.refreshList("pending");
      this.resetForm();
    })
  }

  async deleteItem(id: string) {
    this.taskService.deleteTaskByID(id).then(async() => {
      this.refreshList("pending");
      this.showPending = true;
    })
  }

  async editItem(id: string) {
    const item = await this.taskService.getTaskByID(id);
    this.editing = true;
    this.taskForm.get("id")?.setValue(item.id);
    this.taskForm.get("name")?.setValue(item.name);
    this.taskForm.get("finished")?.setValue(item.finished);
    this.taskForm.get("dueDate")?.setValue(item.dueDate);
  }

  async saveItem() {
    const id = this.taskForm.value.id as string;
    await this.taskService.editTask(id, {
      id: id,
      name: this.taskForm.value.name,
      finished: this.taskForm.value.finished,
      dueDate: this.taskForm.value.dueDate,
    }).then(async() => {
      this.refreshList("pending");
      this.editing = false;
      this.showPending = true;
      this.resetForm();
    });
  }

  async refreshList(filterStatus: string) {
    const taskList =  await this.taskService.getAll();
    if (filterStatus === "finished") {
      this.taskList = taskList.filter(element => element.finished);
    } else if (filterStatus === "pending") {
      this.taskList = taskList.filter(element => !element.finished);
    }
  }

  async updateState(id: string) {
    const taskToUpdate = await this.taskService.getTaskByID(id);
    await this.taskService.editTask(id, {
      id: id,
      name: taskToUpdate.name,
      finished: !taskToUpdate.finished,
      dueDate: taskToUpdate.dueDate,
    }).then(async() => {
      this.refreshList("pending");
    });
  }

  resetForm() {
    this.taskForm.get("id")?.setValue("");
    this.taskForm.get("name")?.setValue("");
    this.taskForm.get("finished")?.setValue(false);
    this.taskForm.get("dueDate")?.setValue(new Date().toISOString());
  }

  async toggleTaskList(show: string) {
    if (show === "finished") {
      await this.refreshList("finished");
      this.showPending = false;
    } else {
      await this.refreshList("pending");
      this.showPending = true;
    }
  }

  cancelEdit() {
    this.resetForm();
    this.editing = false;
  }
}
