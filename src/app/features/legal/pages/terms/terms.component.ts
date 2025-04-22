import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Section {
  id: string;
  title: string;
  content: string[];
}

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="terms-container">
      <div class="page-header">
        <h1>Terms & Conditions</h1>
        <p class="breadcrumb">Home / Terms & Conditions</p>
      </div>

      <div class="content-wrapper">
        <!-- Table of Contents -->
        <aside class="table-of-contents">
          <h2>TABLE OF CONTENTS</h2>
          <ul>
            <li *ngFor="let section of sections">
              <a [href]="'#' + section.id">{{ section.title }}</a>
            </li>
          </ul>
        </aside>

        <!-- Main Content -->
        <div class="main-content">
          <section *ngFor="let section of sections" [id]="section.id">
            <h2>{{ section.title }}</h2>
            <p *ngFor="let paragraph of section.content">{{ paragraph }}</p>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .terms-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .page-header {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .page-header h1 {
      font-size: 2rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .breadcrumb {
      color: #6b7280;
      font-size: 0.875rem;
    }

    .content-wrapper {
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 3rem;
      margin-top: 2rem;
    }

    .table-of-contents {
      position: sticky;
      top: 2rem;
      height: fit-content;
      padding: 1.5rem;
      background-color: #f9fafb;
      border-radius: 0.5rem;
    }

    .table-of-contents h2 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #4b5563;
      margin-bottom: 1rem;
      letter-spacing: 0.05em;
    }

    .table-of-contents ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .table-of-contents li {
      margin-bottom: 0.75rem;
    }

    .table-of-contents a {
      color: #6b7280;
      text-decoration: none;
      font-size: 0.875rem;
      transition: color 0.2s;
    }

    .table-of-contents a:hover {
      color: #2563eb;
    }

    .main-content section {
      margin-bottom: 3rem;
    }

    .main-content h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1.5rem;
    }

    .main-content p {
      color: #4b5563;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    @media (max-width: 768px) {
      .content-wrapper {
        grid-template-columns: 1fr;
      }

      .table-of-contents {
        position: relative;
        top: 0;
        margin-bottom: 2rem;
      }
    }
  `]
})
export class TermsComponent {
  sections: Section[] = [
    {
      id: 'terms-condition',
      title: '01. Terms & Condition',
      content: [
        'Praesent placerat dictum elementum. Nam pulvinar urna vel lectus maximus, eget faucibus turpis hendrerit. Sed lacus molestie arcu, et accumsan nisi. Quisque molestie velit vitae fugiat luctus bibendum. Duis sit amet eros viverra ipsum sed, convallis sapien. Donec justo erat, pulvinar vitae dui ut, finibus euismod enim. Donec velit tortor mollis eu tortor euismod, gravida lacinia arcu.',
        'In ac turpis mi. Donec quis semper neque. Nulla cursus gravida interdum.',
        'Curabitur luctus sapien augue, mattis faucibus nisi vehicula nec. Mauris at scelerisque lorem. Nullam tempus felis ipsum, sagittis malesuada nulla vulputate et.',
        'Aenean vel metus leo. Vivamus nec neque a libero sodales aliquam a et dolor.',
        'Vestibulum rhoncus sagittis dolor vel finibus.',
        'Integer feugiat lacus ut efficitur mattis. Sed quis molestie velit.'
      ]
    },
    {
      id: 'limitations',
      title: '02. Limitations',
      content: [
        'In pretium est sit amet diam feugiat pretend. Curabitur consectetur fringilla metus. Morbi hendrerit facilisis tincidunt. Sed condimentum lacinia arcu. Ut ut luctus metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel erat est. In vitae turpis tempor, accumsan sapien vitae, rutrum eros. Integer pulvinar mattis turpis, ac fermentum leo ullamcorper a. Nam finibus eros libero, sit amet mattis lacus tristique eu. Donec nec ex convallis, ultrices eros ut, mollis libero. Ut scelerisque lacus interdum consectetur sodales.',
        'In ac turpis mi. Donec quis semper neque. Nulla cursus gravida interdum.',
        'Curabitur luctus sapien augue.',
        'mattis faucibus nisi vehicula nec. Mauris at scelerisque lorem.',
        'Nullam tempus felis ipsum, sagittis malesuada nulla vulputate et. Aenean vel metus leo.',
        'Vivamus nec neque a libero sodales aliquam a et dolor.'
      ]
    },
    {
      id: 'security',
      title: '03. Security',
      content: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ex neque, elementum eu blandit in, ornare eu purus. Fusce eu rhoncus mi, quis ultrices lacus. Phasellus id pellentesque nulla. Cras erat nisi, mattis et efficitur et, iaculis a lacus. Fusce gravida augue quis leo facilisis.'
      ]
    },
    {
      id: 'privacy-policy',
      title: '04. Privacy Policy',
      content: [
        'Praesent non sem facilisis, hendrerit nisi vitae, volutpat quam. Aliquam metus mauris, semper eu eros vitae, blandit tristique metus. Vestibulum maximus nec justo sed maximus. Vivamus sit amet turpis sem. Integer vitae tortor ac ex scelerisque facilisis ac vitae urna. In hac habitasse platea dictumst. Maecenas imperdiet tortor arcu, nec tincidunt neque malesuada volutpat.',
        'In ac turpis mi. Donec quis semper neque. Nulla cursus gravida interdum.',
        'Mauris at scelerisque lorem. Nullam tempus felis ipsum, sagittis malesuada nulla vulputate et.',
        'Aenean vel metus leo.',
        'Vestibulum rhoncus sagittis dolor vel finibus.',
        'Integer feugiat lacus ut efficitur mattis. Sed quis molestie velit.',
        'Fusce rutrum mauris sit amet justo rutrum, ut sodales lorem ullamcorper. Aliquam vitae iaculis urna. Nulla vitae mi vel nisi viverra ullamcorper vel elementum est. Mauris vitae elit nec enim tincidunt aliquam. Donec ultrices nulla a enim pulvinar, quis pulvinar lacus consectetur. Donec dignissim, risus nec mollis efficitur, turpis erat blandit urna, eget elementum lacus lectus eget lorem.'
      ]
    }
  ];
}
