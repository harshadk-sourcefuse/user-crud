import { Component, OnInit } from '@angular/core';
import { UserModel } from '../shared/class/UserModel';
import { Constants, Role } from '../shared/Constants';
import { User } from '../shared/interface/User';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  state: any = {
    0: "Load Data",
    1: "Refresh Data"

  }
  currentState: number = 0;
  users: UserModel<String, Number>[] = [];
  roles: string[] = Object.values(Role);
  showAddNewRow: Boolean = true;

  constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.currentState = 0;
  }

  loadInitialData() {
    if (this.currentState == 0)
      this.currentState = 1;
    this.spinner.show;
    this.httpClient.get('/users').subscribe({
      next: (response: any) => {
        this.users = response.map((user: any) => ((<any>Object).assign(new UserModel(), user)));
      },
      complete: () => {
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
      }
    });
  }

  editUser(userToEdit: User<String, Number>) {
    delete userToEdit.currentState;
    userToEdit.currentState = ((<any>Object).assign(new UserModel(), userToEdit));
  }

  cancelEditUser(userToEdit: User<String, Number>) {
    this.users = this.users.map(user => {
      if (user.id === userToEdit.id && userToEdit.currentState) {
        user = ((<any>Object).assign(new UserModel(), userToEdit.currentState));
        delete user.currentState;
      } return user;
    });
  }

  addUser() {
    let user: UserModel<String, Number> = ((<any>Object).assign(new UserModel(), {}));
    user.currentState = user;
    this.users.push(user);
    this.showAddNewRow = false;
  }

  saveUserDetails(user: User<String, Number>) {
    if (user.email && user.role && user.firstName) {
      delete user.currentState;
    }
    this.spinner.show();
    if (user.id) {
      this.httpClient.patch('/users/' + user.id, user).subscribe({
        next: (response: any) => {
        },
        complete: () => {
          this.spinner.hide();
        },
        error: (error) => {
          this.spinner.hide();
        }
      });
    } else {
      this.httpClient.post('/users', user).subscribe({
        next: (response: any) => {
          user.id = response.id;
        },
        complete: () => {
          this.showAddNewRow = true;
          this.spinner.hide();
        },
        error: (error) => {
          this.spinner.hide();
        }
      });
    }

  }

  deleteUser(userToDelete: User<String, Number>) {
    this.users = this.users.filter(user => user.id !== userToDelete.id);
    if (userToDelete.id) {
      this.spinner.show();
      this.httpClient.delete('/users/' + userToDelete.id).subscribe({
        next: (response: any) => {
        },
        complete: () => {
          this.spinner.hide();
        },
        error: (error) => {
          this.spinner.hide();
        }
      });
    }
  }
}
