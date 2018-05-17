import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  templateUrl: './homepage.component.html',
  selector: 'app-homepage',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  tweets: any;
  tweet = {created_by: '', message: '', created_at: Date()};
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(encodeURI('http://192.168.136.145:3000/tweets'))
      .subscribe(data => {
        this.tweets = data;
        console.log(this.tweets);
      });
  }

  OnSubmit(form: NgForm) {
    this.tweet.created_by = form.value.userName;
    this.tweet.message = form.value.message;
    this.tweet.created_at = Date();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http.post('http://192.168.136.145:3000/tweet/post', this.tweet, {headers: headers})
      .subscribe(data => {
        this.tweets.push(data);
      });
    this.tweet = {created_by: '', message: '', created_at: ''};
    form.value.userName = '';
    console.log(this.tweet);
  }
}
