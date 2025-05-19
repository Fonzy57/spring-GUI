import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[ImgSecured]',
})
export class ImgSecuredDirective implements OnInit {
  @Input() src: string = '';
  el = inject(ElementRef);
  http: HttpClient = inject(HttpClient);

  ngOnInit(): void {
    this.http.get(this.src, { responseType: 'blob' }).subscribe((data) => {
      this.el.nativeElement.src = URL.createObjectURL(data);
    });
  }
}
