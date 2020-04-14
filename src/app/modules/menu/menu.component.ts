import { Component, OnInit } from '@angular/core';
import { RoutingService } from '~/app/services/routing.service';

@Component({
  selector: 'ns-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    constructor(public routingService: RoutingService) { }

    ngOnInit(): void {
    }

}
