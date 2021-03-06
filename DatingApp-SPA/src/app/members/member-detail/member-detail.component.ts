import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/User.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Resolve } from '@angular/router';
import { User } from 'src/app/_models/User';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        imageAnimation: NgxGalleryAnimation.Slide,
        thumbnailsColumns: 4,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }
  getImages() {
    const imgUrls = [];
    for (const photo of this.user.photos) {
      imgUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
    }
    return imgUrls;
  }

  // members/4

  // loadUser() {
  // this.userService.getUser(+this.route.snapshot.params['id']).subscribe(
  // (user: User) => {
  // this.user = user;
  // },
  // error => {
  // this.alertify.error(error);
  // }
  // ) ;
  // }
}
