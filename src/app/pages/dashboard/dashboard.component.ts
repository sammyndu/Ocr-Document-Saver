import { DocumentInfoEntity } from './../../models/document-info.model';
import {Component, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { forkJoin, Subject } from 'rxjs';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { Log } from '../../models/log.model';
import { Role } from '../../models/role.enum';
import { User } from '../../models/user.model';
import { DocumentService } from '../../services/document.service';
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  value: number;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  private alive = true;

  solarValue: number;
  userCard: CardSettings = {
    title: 'Total Users',
    iconClass: 'nb-person',
    type: 'primary',
    value: 0
  };
  blockedUserCard: CardSettings = {
    title: 'Blocked Users',
    iconClass: 'nb-person',
    type: 'success',
    value: 0
  };
  // wirelessAudioCard: CardSettings = {
  //   title: 'Wireless Audio',
  //   iconClass: 'nb-audio',
  //   type: 'info',
  // };
  // coffeeMakerCard: CardSettings = {
  //   title: 'Coffee Maker',
  //   iconClass: 'nb-coffee-maker',
  //   type: 'warning',
  // };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.userCard,
    this.blockedUserCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.userCard,
        type: 'warning',
      },
      {
        ...this.blockedUserCard,
        type: 'primary',
      },
    ],
    dark: this.commonStatusCardsSet,
  };

  constructor(private themeService: NbThemeService,
              private solarService: SolarData,
              private sessionService: SessionService,
              private router: Router,
              private docService: DocumentService,
              private userService: UserService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });
    const user = this.sessionService.getUserInfo();
    if(user.role != Role.Admin){
      if(user.role == Role.Search) {
        this.router.navigate(['/maps/search']);
      } else if(user.role == Role.Report) {
        console.log('report')
        this.router.navigate(['/pages/maps/report']);
      }else if(user.role == Role.Scan) {
        this.router.navigate(['/maps/scan-form']);
      }
    }
  }

  users: User[] = [];
  blockedUsers: User[] = [];
  userScans: DocumentInfoEntity[] = [];
  logs: Log[] = [];
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

    //this.getUsers();
    this.getDashboardData();
  }

  getUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.users = res.content;
      this.dtTrigger.next();
    });
  }

  getRole(value: number) {
    return Role[value];
  }

  getDashboardData() {
    forkJoin(
      {
        userResponse: this.userService.getUsers(), 
        logsResponse: this.userService.getUserLogs(),
        scansResponse: this.docService.getDocuments()
      }).subscribe(({userResponse, logsResponse, scansResponse}) => {
        this.users = userResponse.content;
        this.logs = logsResponse.content;
        this.userScans = scansResponse.content;
        this.dtTrigger.next();
        this.blockedUsers = this.users.filter(x => x.isBlocked);
        this.userCard.value = this.users.length;
        this.blockedUserCard.value =  this.blockedUsers.length;
    })
  }


  ngOnDestroy() {
    this.alive = false;
  }
}
