import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Component, Inject, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

type Language = 'ar' | 'en';

interface LeadForm {
  fullName: string;
  email: string;
  whatsapp: string;
  nationality: string;
  purpose: string;
  serviceRequired: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  language: Language = 'ar';
  menuOpen = false;
  submitting = false;
  submitted = false;
  errorMessage = '';
  form: LeadForm = this.emptyForm();

  readonly copy = {
    ar: {
      navHome: 'الرئيسية', navServices: 'الخدمات', navProcess: 'آلية العمل', navContact: 'تواصل معنا',
      eyebrow: 'خدمات مساندة لمواطني دول مجلس التعاون',
      heroTitle: 'رحلتك نحو الهوية الإماراتية، <em>أوضح وأسهل</em>',
      heroText: 'نرافقك بخطوات واضحة ومتابعة شخصية لفهم متطلبات خدمات الهوية الإماراتية، من تقديم الطلب وحتى متابعة الإجراء.',
      primaryCta: 'اطلب استشارة', secondaryCta: 'استكشف الخدمات',
      trustLine: 'خدمة خاصة • إرشاد واضح • متابعة شخصية',
      formEyebrow: 'ابدأ من هنا', formTitle: 'دعنا نساعدك في معرفة الخطوة المناسبة',
      formText: 'أرسل بياناتك وسيتواصل معك فريق بهناس لمناقشة طلبك.',
      fullName: 'الاسم الكامل', email: 'البريد الإلكتروني', whatsapp: 'رقم واتساب / الهاتف',
      nationality: 'الجنسية', nationalityPlaceholder: 'اختر الجنسية',
      purpose: 'الغرض من طلب الهوية', purposePlaceholder: 'اختر الغرض',
      service: 'الخدمة المطلوبة', servicePlaceholder: 'اختر الخدمة',
      submit: 'إرسال الطلب', submitting: 'جارٍ إرسال الطلب...',
      formNote: 'إرسال النموذج لا يعني الموافقة على الطلب أو إصدار الهوية.',
      servicesEyebrow: 'خدماتنا', servicesTitle: 'مساندة تناسب احتياجك',
      servicesText: 'اختر نوع الخدمة التي ترغب في الاستفسار عنها، وسنوضح لك المتطلبات والخطوات المتاحة.',
      service1: 'إصدار هوية جديدة', service1Text: 'إرشاد حول متطلبات وخطوات طلب إصدار الهوية الإماراتية.',
      service2: 'تجديد الهوية', service2Text: 'مساندة في فهم إجراءات التجديد والمستندات المطلوبة.',
      service3: 'هوية مفقودة أو تالفة', service3Text: 'توجيه بشأن الخطوات المتاحة عند فقدان الهوية أو تلفها.',
      service4: 'خدمات الأسرة', service4Text: 'معلومات أولية حول الإجراءات ذات الصلة بأفراد الأسرة.',
      learnMore: 'استفسر عن الخدمة',
      whyEyebrow: 'لماذا بهناس؟', whyTitle: 'خطوات أوضح. متابعة أقرب.',
      benefit1: 'تواصل شخصي', benefit1Text: 'نتابع استفسارك ونعمل على توضيح الخطوة التالية.',
      benefit2: 'متطلبات مرتبة', benefit2Text: 'نساعدك على فهم المستندات والمعلومات التي قد تحتاج إليها.',
      benefit3: 'وضوح وشفافية', benefit3Text: 'نوضح نطاق خدماتنا والرسوم قبل البدء.',
      processEyebrow: 'آلية العمل', processTitle: 'من الاستفسار إلى المتابعة',
      step1: 'أرسل استفسارك', step1Text: 'املأ النموذج ببيانات التواصل ونوع الخدمة.',
      step2: 'نراجع احتياجك', step2Text: 'يتواصل معك الفريق لتوضيح المعلومات والخطوات ذات الصلة.',
      step3: 'متابعة الإجراء', step3Text: 'نقدم المساندة المتفق عليها ونبقيك على اطلاع.',
      faqEyebrow: 'أسئلة شائعة', faqTitle: 'قد تجد إجابتك هنا',
      faq1: 'هل بهناس جهة حكومية؟', faq1a: 'لا. بهناس مقدم خدمات خاص يقدم المساندة والإرشاد، وليست جهة حكومية أو ممثلاً عن الجهات الرسمية.',
      faq2: 'هل تضمنون إصدار الهوية؟', faq2a: 'لا يمكن ضمان الموافقة أو الإصدار؛ فالقرار والإجراءات النهائية تعود إلى الجهات الحكومية المختصة.',
      faq3: 'ما المستندات المطلوبة؟', faq3a: 'تختلف المتطلبات حسب الحالة ونوع الخدمة. نوضح لك المعلومات المتاحة بعد مراجعة استفسارك.',
      faq4: 'كم تستغرق الإجراءات؟', faq4a: 'المدة تختلف بحسب نوع الطلب والجهة المختصة واكتمال المستندات، ولا يمكن تأكيد مدة ثابتة مسبقاً.',
      contactTitle: 'هل لديك استفسار؟', contactText: 'ابدأ بإرسال طلبك وسنتواصل معك لمناقشة التفاصيل.',
      footerText: 'مساندة خاصة وإرشاد لخدمات الهوية الإماراتية لمواطني دول مجلس التعاون.',
      footerDisclaimer: 'بهناس مقدم خدمات خاص مستقل، وليست جهة حكومية. تخضع جميع الطلبات لمتطلبات وقرارات الجهات الرسمية المختصة.',
      privacy: 'نستخدم بياناتك للتواصل بشأن طلبك فقط.',
      required: 'يرجى تعبئة هذا الحقل.', invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح.',
      chooseService: 'إصدار هوية جديدة', choosePurpose: 'إصدار جديد',
      success: 'تم استلام طلبك. سيتواصل معك الفريق قريباً.',
      configError: 'النموذج قيد التجهيز التقني حالياً. يرجى التواصل معنا مباشرة أو المحاولة لاحقاً.',
      submitError: 'تعذر إرسال الطلب حالياً. يرجى المحاولة مرة أخرى.'
    },
    en: {
      navHome: 'Home', navServices: 'Services', navProcess: 'How It Works', navContact: 'Contact',
      eyebrow: 'Dedicated assistance for GCC nationals',
      heroTitle: 'Your Emirates ID journey, <em>clearer and simpler</em>',
      heroText: 'Get clear guidance and personal follow-up to understand Emirates ID service requirements, from your initial enquiry through the process.',
      primaryCta: 'Request a consultation', secondaryCta: 'Explore services',
      trustLine: 'Private assistance • Clear guidance • Personal follow-up',
      formEyebrow: 'Get started', formTitle: 'Let us help you find the right next step',
      formText: 'Share your details and the Bahnaas team will contact you to discuss your enquiry.',
      fullName: 'Full name', email: 'Email address', whatsapp: 'WhatsApp / Mobile number',
      nationality: 'Nationality', nationalityPlaceholder: 'Select nationality',
      purpose: 'Purpose of Emirates ID', purposePlaceholder: 'Select purpose',
      service: 'Service required', servicePlaceholder: 'Select a service',
      submit: 'Send enquiry', submitting: 'Sending...',
      formNote: 'Submitting this form does not mean an application is approved or an ID will be issued.',
      servicesEyebrow: 'Our services', servicesTitle: 'Assistance shaped around your needs',
      servicesText: 'Choose the service you would like to ask about and we will explain the relevant requirements and available steps.',
      service1: 'New Emirates ID', service1Text: 'Guidance on the requirements and steps involved in a new Emirates ID request.',
      service2: 'ID renewal', service2Text: 'Assistance understanding renewal procedures and supporting documents.',
      service3: 'Lost or damaged ID', service3Text: 'Guidance on the available steps if your Emirates ID is lost or damaged.',
      service4: 'Family services', service4Text: 'Initial information about procedures related to eligible family members.',
      learnMore: 'Enquire about this service',
      whyEyebrow: 'Why Bahnaas', whyTitle: 'Clearer steps. Closer follow-up.',
      benefit1: 'Personal communication', benefit1Text: 'We follow up on your enquiry and clarify the next step.',
      benefit2: 'Organised requirements', benefit2Text: 'We help you understand the information and documents you may need.',
      benefit3: 'Clarity and transparency', benefit3Text: 'We explain the scope of our service and fees before proceeding.',
      processEyebrow: 'How it works', processTitle: 'From enquiry to follow-up',
      step1: 'Send your enquiry', step1Text: 'Complete the form with your contact details and service type.',
      step2: 'We review your needs', step2Text: 'Our team contacts you to clarify relevant information and steps.',
      step3: 'Follow-up', step3Text: 'We provide the agreed assistance and keep you informed.',
      faqEyebrow: 'FAQs', faqTitle: 'Answers to common questions',
      faq1: 'Is Bahnaas a government entity?', faq1a: 'No. Bahnaas is an independent private service provider offering assistance and guidance. It is not a government entity or official representative.',
      faq2: 'Can you guarantee an Emirates ID will be issued?', faq2a: 'No approval or issuance can be guaranteed. Final decisions and procedures rest with the relevant government authorities.',
      faq3: 'Which documents are required?', faq3a: 'Requirements vary by individual circumstances and service type. We can explain the available information after reviewing your enquiry.',
      faq4: 'How long does the process take?', faq4a: 'Timing depends on the request, the relevant authority and document completeness. A fixed timeframe cannot be promised in advance.',
      contactTitle: 'Have a question?', contactText: 'Send your enquiry and our team will contact you to discuss the details.',
      footerText: 'Private assistance and guidance for Emirates ID services for GCC nationals.',
      footerDisclaimer: 'Bahnaas is an independent private service provider, not a government entity. All applications remain subject to the requirements and decisions of the relevant authorities.',
      privacy: 'Your details are used only to contact you about this enquiry.',
      required: 'Please complete this field.', invalidEmail: 'Please enter a valid email address.',
      chooseService: 'New Emirates ID', choosePurpose: 'New application',
      success: 'Your enquiry has been received. Our team will contact you soon.',
      configError: 'The form is currently undergoing technical setup. Please contact us directly or try again later.',
      submitError: 'Your enquiry could not be sent. Please try again.'
    }
  };

  constructor(private readonly http: HttpClient) {}

  get t() { return this.copy[this.language]; }
  get isArabic() { return this.language === 'ar'; }

  toggleLanguage(): void {
    this.language = this.language === 'ar' ? 'en' : 'ar';
    document.documentElement.lang = this.language;
    document.documentElement.dir = this.isArabic ? 'rtl' : 'ltr';
    this.menuOpen = false;
  }

  setService(service: string): void {
    this.form.serviceRequired = service;
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  submitForm(): void {
    this.errorMessage = '';
    this.submitted = false;
    if (!this.form.fullName.trim() || !this.form.email.trim() || !this.form.whatsapp.trim()
      || !this.form.nationality || !this.form.purpose || !this.form.serviceRequired) return;

    if (!environment.apiUrl.trim()) {
      this.errorMessage = this.t.configError;
      return;
    }

    this.submitting = true;
    const payload = {
      ...this.form,
      preferredLanguage: this.language,
      source: 'BAHNAAS GCC Emirates ID'
    };

    this.http.post(environment.apiUrl, payload).subscribe({
      next: () => {
        this.submitting = false;
        this.submitted = true;
        this.form = this.emptyForm();
      },
      error: () => {
        this.submitting = false;
        this.errorMessage = this.t.submitError;
      }
    });
  }

  private emptyForm(): LeadForm {
    return { fullName: '', email: '', whatsapp: '', nationality: '', purpose: '', serviceRequired: '' };
  }
}