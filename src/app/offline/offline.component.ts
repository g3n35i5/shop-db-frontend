import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data';
import {Router} from "@angular/router";

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.scss']
})
export class OfflineComponent implements OnInit {

  loading: boolean = false;
  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  retry() {
    this.loading = true;
    this.dataService.getStatus().subscribe((res: any) => {
      this.router.navigate(['/']);
    });

    setTimeout(()=>{
      this.loading = false;
    }, 1000)
  }
}
