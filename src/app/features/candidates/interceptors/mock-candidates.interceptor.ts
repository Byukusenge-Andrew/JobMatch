import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Candidate } from '../services/candidate.service';

@Injectable()
export class MockCandidatesInterceptor implements HttpInterceptor {
  private mockCandidate: Candidate = {
    id: 1,
    name: 'Esther Howard',
    title: 'Website Designer (UI/UX)',
    avatar: 'assets/images/avatars/esther-howard.jpg',
    biography: `I've been passionate about graphic design and digital art from an early age with a keen interest in Website and Mobile Application User Interfaces. I can create high-quality and aesthetically pleasing designs in a quick turnaround time. Check out the portfolio section of my profile to see samples of my work and feel free to discuss your designing needs.`,
    coverLetter: `Dear Sir,\n\nI am writing to express my interest in the fourth grade instructional position that is currently available in the Fort Wayne Community School System. I learned of the opening through a notice posted on JobZone, IPFW's job database. I am confident that my academic background and curriculum development skills would be successfully utilized in this teaching position.\n\nI have just completed my Bachelor of Science degree in Elementary Education and have successfully completed Praxis I and Praxis II. During my student teaching experience, I developed and initiated a three-week curriculum sequence on animal species and earth resources. This collaborative unit involved working with three other third grade teachers within my team, and culminated in a field trip to the Indianapolis Zoo Animal Research Unit.\n\nSincerely,\nEsther Howard`,
    dateOfBirth: '14 June, 2021',
    nationality: 'Bangladesh',
    maritalStatus: 'Single',
    gender: 'Male',
    experience: '7 Years',
    education: 'Master Degree',
    website: 'www.estherhoward.com',
    location: {
      address: 'Zone/Block Basement 1 Unit B2, 1372 Spring Avenue',
      city: 'Beverly Hills',
      state: 'California',
      zipCode: '90202'
    },
    contact: {
      phone: '+1-202-555-0141',
      secondaryPhone: '+1-202-555-0189',
      email: 'esther.howard@gmail.com'
    },
    socialMedia: {
      facebook: 'https://facebook.com/estherhoward',
      twitter: 'https://twitter.com/estherhoward',
      linkedin: 'https://linkedin.com/in/estherhoward',
      github: 'https://github.com/estherhoward'
    }
  };

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (request.url.match(/\/api\/candidates\/\d+$/)) {
      return of(new HttpResponse({ status: 200, body: this.mockCandidate })).pipe(delay(500));
    }
    return next.handle(request);
  }
}
