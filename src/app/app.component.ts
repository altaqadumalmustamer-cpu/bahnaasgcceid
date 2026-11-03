import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

type Lang = 'ar' | 'en';
interface Lead { fullName:string; email:string; whatsapp:string; nationality:string; purpose:string; serviceRequired:string; }

@Component({
 selector:'app-root', standalone:true, imports:[CommonModule,FormsModule],
 templateUrl:'./app.component.html', styleUrl:'./app.component.css'
})
export class AppComponent {
 lang:Lang='ar'; menuOpen=false; submitting=false; sent=false; error='';
 form:Lead=this.empty();
 readonly text={
 ar:{
 nav:['الرئيسية','الخدمات','آلية العمل','تواصل معنا'],eyebrow:'خدمات مساندة لمواطني دول مجلس التعاون',
 title:'رحلتك نحو الهوية الإماراتية، <em>أوضح وأسهل</em>',
 intro:'نرافقك بخطوات واضحة ومتابعة شخصية لفهم متطلبات خدمات الهوية الإماراتية، من الاستفسار وحتى متابعة الإجراء.',
 cta:'اطلب استشارة',explore:'استكشف الخدمات',trust:'خدمة خاصة • إرشاد واضح • متابعة شخصية',
 formTitle:'دعنا نساعدك في معرفة الخطوة المناسبة',formIntro:'أرسل بياناتك وسيتواصل معك فريق بهناس لمناقشة طلبك.',
 name:'الاسم الكامل',email:'البريد الإلكتروني',phone:'رقم واتساب / الهاتف',nationality:'الجنسية',purpose:'الغرض من طلب الهوية',service:'الخدمة المطلوبة',
 selectNationality:'اختر الجنسية',selectPurpose:'اختر الغرض',selectService:'اختر الخدمة',send:'إرسال الطلب',sending:'جارٍ الإرسال...',
 formDisclaimer:'إرسال النموذج لا يعني الموافقة على الطلب أو إصدار الهوية.',
 servicesTitle:'مساندة تناسب احتياجك',servicesIntro:'اختر نوع الخدمة التي ترغب في الاستفسار عنها، وسنوضح لك المتطلبات والخطوات المتاحة.',
 services:['إصدار هوية جديدة','تجديد الهوية','هوية مفقودة أو تالفة','خدمات الأسرة'],
 descriptions:['إرشاد حول متطلبات وخطوات طلب إصدار الهوية الإماراتية.','مساندة في فهم إجراءات التجديد والمستندات المطلوبة.','توجيه بشأن الخطوات المتاحة عند فقدان الهوية أو تلفها.','معلومات أولية حول الإجراءات ذات الصلة بأفراد الأسرة.'],
 why:'خطوات أوضح. متابعة أقرب.',benefits:['تواصل شخصي','متطلبات مرتبة','وضوح وشفافية'],
 benefitText:['نتابع استفسارك ونعمل على توضيح الخطوة التالية.','نساعدك على فهم المعلومات والمستندات التي قد تحتاج إليها.','نوضح نطاق خدماتنا والرسوم قبل البدء.'],
 process:'من الاستفسار إلى المتابعة',steps:['أرسل استفسارك','نراجع احتياجك','متابعة الإجراء'],stepText:['املأ النموذج ببيانات التواصل ونوع الخدمة.','يتواصل معك الفريق لتوضيح المعلومات والخطوات ذات الصلة.','نقدم المساندة المتفق عليها ونبقيك على اطلاع.'],
 faq:'أسئلة شائعة',questions:['هل بهناس جهة حكومية؟','هل تضمنون إصدار الهوية؟','ما المستندات المطلوبة؟','كم تستغرق الإجراءات؟'],
 answers:['لا. بهناس مقدم خدمات خاص يقدم المساندة والإرشاد، وليست جهة حكومية أو ممثلاً عن الجهات الرسمية.','لا يمكن ضمان الموافقة أو الإصدار؛ فالقرار والإجراءات النهائية تعود إلى الجهات الحكومية المختصة.','تختلف المتطلبات حسب الحالة ونوع الخدمة. نوضح لك المعلومات المتاحة بعد مراجعة استفسارك.','المدة تختلف بحسب نوع الطلب والجهة المختصة واكتمال المستندات، ولا يمكن تأكيد مدة ثابتة مسبقاً.'],
 contact:'هل لديك استفسار؟',contactText:'ابدأ بإرسال طلبك وسنتواصل معك لمناقشة التفاصيل.',
 footer:'مساندة خاصة وإرشاد لخدمات الهوية الإماراتية لمواطني دول مجلس التعاون.',
 disclaimer:'بهناس مقدم خدمات خاص مستقل، وليست جهة حكومية. تخضع جميع الطلبات لمتطلبات وقرارات الجهات الرسمية المختصة.',
 privacy:'نستخدم بياناتك للتواصل بشأن طلبك فقط.',success:'تم استلام طلبك. سيتواصل معك الفريق قريباً.',
 configError:'النموذج قيد التجهيز التقني حالياً. يرجى المحاولة لاحقاً أو التواصل معنا مباشرة.',
 submitError:'تعذر إرسال الطلب حالياً. يرجى المحاولة مرة أخرى.'
 },
 en:{
 nav:['Home','Services','How It Works','Contact'],eyebrow:'Dedicated assistance for GCC nationals',
 title:'Your Emirates ID journey, <em>clearer and simpler</em>',
 intro:'Get clear guidance and personal follow-up to understand Emirates ID service requirements, from your initial enquiry through the process.',
 cta:'Request a consultation',explore:'Explore services',trust:'Private assistance • Clear guidance • Personal follow-up',
 formTitle:'Let us help you find the right next step',formIntro:'Share your details and the Bahnaas team will contact you to discuss your enquiry.',
 name:'Full name',email:'Email address',phone:'WhatsApp / Mobile number',nationality:'Nationality',purpose:'Purpose of Emirates ID',service:'Service required',
 selectNationality:'Select nationality',selectPurpose:'Select purpose',selectService:'Select a service',send:'Send enquiry',sending:'Sending...',
 formDisclaimer:'Submitting this form does not mean an application is approved or an ID will be issued.',
 servicesTitle:'Assistance shaped around your needs',servicesIntro:'Choose the service you would like to ask about and we will explain the relevant requirements and available steps.',
 services:['New Emirates ID','ID renewal','Lost or damaged ID','Family services'],
 descriptions:['Guidance on the requirements and steps involved in a new Emirates ID request.','Assistance understanding renewal procedures and supporting documents.','Guidance on the available steps if your Emirates ID is lost or damaged.','Initial information about procedures related to eligible family members.'],
 why:'Clearer steps. Closer follow-up.',benefits:['Personal communication','Organised requirements','Clarity and transparency'],
 benefitText:['We follow up on your enquiry and clarify the next step.','We help you understand the information and documents you may need.','We explain the scope of our service and fees before proceeding.'],
 process:'From enquiry to follow-up',steps:['Send your enquiry','We review your needs','Follow-up'],stepText:['Complete the form with your contact details and service type.','Our team contacts you to clarify relevant information and steps.','We provide the agreed assistance and keep you informed.'],
 faq:'Frequently asked questions',questions:['Is Bahnaas a government entity?','Can you guarantee an Emirates ID will be issued?','Which documents are required?','How long does the process take?'],
 answers:['No. Bahnaas is an independent private service provider offering assistance and guidance. It is not a government entity or official representative.','No approval or issuance can be guaranteed. Final decisions and procedures rest with the relevant government authorities.','Requirements vary by individual circumstances and service type. We can explain the available information after reviewing your enquiry.','Timing depends on the request, the relevant authority and document completeness. A fixed timeframe cannot be promised in advance.'],
 contact:'Have a question?',contactText:'Send your enquiry and our team will contact you to discuss the details.',
 footer:'Private assistance and guidance for Emirates ID services for GCC nationals.',
 disclaimer:'Bahnaas is an independent private service provider, not a government entity. All applications remain subject to the requirements and decisions of the relevant authorities.',
 privacy:'Your details are used only to contact you about this enquiry.',success:'Your enquiry has been received. Our team will contact you soon.',
 configError:'The form is currently undergoing technical setup. Please try again later or contact us directly.',
 submitError:'Your enquiry could not be sent. Please try again.'
 }};
 get t(){return this.text[this.lang];} get ar(){return this.lang==='ar';}
 constructor(private http:HttpClient){}
 switchLang(){this.lang=this.ar?'en':'ar';document.documentElement.lang=this.lang;document.documentElement.dir=this.ar?'rtl':'ltr';this.menuOpen=false;}
 selectService(i:number){this.form.serviceRequired=this.t.services[i];document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});}
 submit(){this.sent=false;this.error='';if(!this.form.fullName.trim()||!this.form.whatsapp.trim()||!this.form.nationality||!this.form.purpose||!this.form.serviceRequired)return;
 if(!environment.apiUrl){this.error=this.t.configError;return;}
 this.submitting=true;this.http.post(environment.apiUrl,{...this.form,preferredLanguage:this.lang,source:'BAHNAAS GCC Emirates ID'}).subscribe({next:()=>{this.submitting=false;this.sent=true;this.form=this.empty();},error:()=>{this.submitting=false;this.error=this.t.submitError;}});
 }
 private empty():Lead{return{fullName:'',email:'',whatsapp:'',nationality:'',purpose:'',serviceRequired:''};}
}