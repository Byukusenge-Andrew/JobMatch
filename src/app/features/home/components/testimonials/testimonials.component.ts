import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class TestimonialsComponent implements OnInit {
  currentTestimonial = 0;
  testimonials = [
    {
      name: 'Sarah Johnson',
      position: 'Frontend Developer at Airbnb',
      text: 'JobMatch transformed my job search! The AI-powered matching system connected me with opportunities that perfectly aligned with my skills and career goals. Within two weeks, I landed my dream job at a tech company.',
      avatar: 'assets/images/testimonial-1.jpg',
      rating: 5
    },
    {
      name: 'David Chen',
      position: 'Head of Recruitment at Spotify',
      text: 'As a hiring manager, JobMatch has been a game-changer. The platform\'s detailed candidate profiles and skill matching have saved us countless hours in the recruitment process. We\'ve found exceptional talent that fits our company culture perfectly.',
      avatar: 'assets/images/testimonial-2.jpg',
      rating: 5
    },
    {
      name: 'Maria Rodriguez',
      position: 'Product Manager at Shopify',
      text: 'I was skeptical about using yet another job platform, but JobMatch exceeded my expectations. The personalized recommendations and intuitive interface made job hunting enjoyable. Three interviews and one job offer later, I\'m now at my ideal company!',
      avatar: 'assets/images/testimonial-3.jpg',
      rating: 5
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Optional: Auto-rotate testimonials
    setInterval(() => {
      this.nextTestimonial();
    }, 5000);
  }

  setCurrentTestimonial(index: number): void {
    this.currentTestimonial = index;
  }

  nextTestimonial(): void {
    this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
  }

  prevTestimonial(): void {
    this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
  }
}
