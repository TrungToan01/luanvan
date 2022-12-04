import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ShareCoreService } from 'src/app/services/share-core.service';
import { UserManageService } from '../../service/user-manage.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit {
  userId = this.route.snapshot.paramMap.get('id');
  userInfo: any;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private ShareCoreService: ShareCoreService,
    private userManageService: UserManageService
  ) {}

  async ngOnInit() {
    await this.getUserById(this.userId);
  }

  async getUserById(id: any) {
    let response = await this.userManageService.GetUserById(id);
    if (response.ok) {
      this.userInfo = response.data;
    } else {
      alert(response.msg);
    }
  }

  goBack() {
    this.ShareCoreService.goBack();
  }
}
