import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './unauthorized.component.html',
  styleUrls: ['unauthorized.component.css']
})

export class UnauthorizedComponent implements OnInit {
  title: String = 'Unauthorized'

  ngOnInit(): void {
    setTimeout(()=>{
      window.location.href = "/login"
    }, 9000)
  }
}