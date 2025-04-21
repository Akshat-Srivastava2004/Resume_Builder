"use client"
import { FileText, CheckCircle, Star, Download, Users, Zap, ChevronRight, Menu, X } from "lucide-react"
// import img from "next/img"
import { useState } from "react"

export default function ResumeBuilderLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background z-40">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <a href="/" className="flex items-center gap-2 font-bold text-xl">
            <FileText className="h-6 w-6" />
            <span>ResumeBuilder</span>
          </a>

          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </a>
            <a href="#templates" className="text-sm font-medium hover:underline underline-offset-4">
              Templates
            </a>
            <a href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
              Pricing
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
              Testimonials
            </a>
          </nav>

          <div className="hidden md:flex gap-4">
            <a
              href="/login"
              className="inline-flex h-9 items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
            >
              Log in
            </a>
            <a
              href="/register"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              Sign up
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t p-4 flex flex-col gap-4 bg-background">
            <a href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </a>
            <a href="#templates" className="text-sm font-medium hover:underline underline-offset-4">
              Templates
            </a>
            <a href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
              Pricing
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
              Testimonials
            </a>
            <div className="flex flex-col gap-2 pt-2 border-t">
              <a
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
              >
                Log in
              </a>
              <a
                href="/register"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
              >
                Sign up
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Create professional resumes in minutes
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Stand out from the crowd with a professionally designed resume. Easy to use, ATS-friendly, and ready
                    to help you land your dream job.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <a
                    href="/create"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                  >
                    Create Your Resume
                  </a>
                  <a
                    href="/templates"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Browse Templates
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                  <CheckCircle className="h-4 w-4 text-primary ml-4" />
                  <span>ATS-friendly templates</span>
                  <CheckCircle className="h-4 w-4 text-primary ml-4" />
                  <span>Export as PDF</span>
                </div>
              </div>
              <div className="mx-auto flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-[4/5] overflow-hidden rounded-xl border shadow-xl">
                  <img
                    src="https://s3.envato.com/files/303646583/03_Preview%20Image%20Set/01_Clean-Professional-Creative-and-Modern-Resume-CV-Curriculum-Vitae-Design-Template-MS-Word-Apple-Pages-PSD-Free-Download.jpg"
                    width={480}
                    height={600}
                    alt="Resume preview"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="w-full py-8 border-y bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Trusted by thousands of job seekers
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8">
                {["Google", "Microsoft", "Amazon", "Apple", "Meta"].map((company) => (
                  <div key={company} className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-lg font-semibold">{company}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything you need to create a standout resume
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our resume builder provides all the tools you need to create a professional resume that gets you
                  noticed.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  icon: <FileText className="h-10 w-10 text-primary" />,
                  title: "Professional Templates",
                  description: "Choose from dozens of professionally designed templates that catch the eye.",
                  image:"https://cdn3.geckoandfly.com/wp-content/uploads/2019/05/microsoft-cv-resume-template-09.jpg"
                },
                {
                  icon: <Zap className="h-10 w-10 text-primary" />,
                  title: "Easy to Use",
                  description: "Our intuitive interface makes creating a resume simple and fast.",
                  image:"https://s3.envato.com/files/254376480/03_Preview%20Image%20Set/00_Modern-Resume-Design-Template_Main-Image.jpg"
                },
                {
                  icon: <Download className="h-10 w-10 text-primary" />,
                  title: "Export Options",
                  description: "Download your resume as PDF, DOCX, or share a a directly with employers.",
                  image:"https://s3.envato.com/files/272257681/Previews/01_preview.jpg"
                },
                {
                  icon: <CheckCircle className="h-10 w-10 text-primary" />,
                  title: "ATS-Friendly",
                  description: "All our templates are optimized to pass Applicant Tracking Systems.",
                  image:"https://www.resumesplanet.com/sample_pdf/newsamples/Professional/Professional-1.jpg"
                },
                {
                  icon: <Users className="h-10 w-10 text-primary" />,
                  title: "Expert Advice",
                  description: "Get tailored suggestions to improve your resume based on your industry.",
                  image:"https://i.pinimg.com/originals/2d/70/b6/2d70b6883c4d6ea8db0c995aae6bd4f6.png"
                },
                {
                  icon: <Star className="h-10 w-10 text-primary" />,
                  title: "Real-Time Preview",
                  description: "See changes to your resume in real-time as you edit.",
                  image:"https://www.resumebuilder.org/wp-content/uploads/2017/10/executive_resume_template.png"
                },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center space-y-3 rounded-lg border p-6 shadow-sm">
                  {feature.icon}
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  {/* <p className="text-muted-foreground text-center">{feature.description}</p> */}
                  <img src={feature.image} alt={feature.title} className="mt-4 h-40 w-half object-cover rounded-lg shadow-md" />
                </div>
              ))}
            </div>
          </div>
        </section>

       {/* Templates Section */}
<section id="templates" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
  <div className="container px-4 md:px-6">
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Templates</div>
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
          Choose from our professional templates
        </h2>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Find the perfect template that matches your style and industry.
        </p>
      </div>
    </div>
    <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
      {[
        "https://cdn3.geckoandfly.com/wp-content/uploads/2019/05/microsoft-cv-resume-template-09.jpg",
        "https://s3.envato.com/files/254376480/03_Preview%20Image%20Set/00_Modern-Resume-Design-Template_Main-Image.jpg",
        "https://good-resume.com/wp-content/uploads/2018/08/Free-Modern-Resume-Template-in-Word-DOCX-Format.jpg",
        "https://designshack.net/wp-content/uploads/Free-Business-Resume-Template.jpg",
        "https://cms-assets.tutsplus.com/cdn-cgi/image/width=720/uploads/users/988/posts/93140/image-upload/canva_white_modern_digital_marketing_specialist_resume.jpg",
        "https://s3.resume.io/cdn-cgi/image/width=380,format=auto/uploads/local_template_image/image/370/persistent-resource/stockholm-resume-templates.jpg",
      ].map((image, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md"
        >
          <div className="aspect-[3/4] w-full overflow-hidden">
            <img
              src={image}
              width={300}
              height={400}
              alt={`Resume template ${index + 1}`}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
            <a
              href={`/templates/${index + 1}`}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Use This Template
            </a>
          </div>
          <div className="p-4">
            <h3 className="font-medium">Professional {index + 1}</h3>
            <p className="text-sm text-muted-foreground">
              Perfect for {index % 2 === 0 ? "creative" : "corporate"} roles
            </p>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-center">
      <a
        href="/templates"
        className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        View All Templates
        <ChevronRight className="ml-2 h-4 w-4" />
      </a>
    </div>
  </div>
</section>


        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple, transparent pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for you.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
              {[
                {
                  name: "Free",
                  price: "Rs0",
                  description: "Perfect for trying out our features",
                  features: ["1 resume", "Basic templates", "Export as PDF", "7-day access"],
                },
                {
                  name: "Pro",
                  price: "Rs100",
                  period: "/month",
                  description: "Everything you need for job hunting",
                  features: [
                    "Unlimited resumes",
                    "All templates",
                    "Export as PDF & DOCX",
                    "Cover letter builder",
                    "Resume analytics",
                    "Priority support",
                  ],
                  popular: true,
                },
                {
                  name: "Team",
                  price: "Rs1000",
                  period: "/month",
                  description: "For career coaches and teams",
                  features: [
                    "Everything in Pro",
                    "5 team members",
                    "Team collaboration",
                    "Admin dashboard",
                    "API access",
                    "Dedicated support",
                  ],
                },
              ].map((plan, index) => (
                <div
                  key={index}
                  className={`flex flex-col rounded-lg border p-6 shadow-sm ${plan.popular ? "border-primary ring-1 ring-primary" : ""}`}
                >
                  {plan.popular && (
                    <div className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground mb-4 self-start">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
                  </div>
                  <p className="mt-2 text-muted-foreground">{plan.description}</p>
                  <ul className="mt-6 space-y-3 flex-1">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`/signup?plan=${plan.name.toLowerCase()}`}
                    className={`mt-8 inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors ${
                      plan.popular
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What our users say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of satisfied users who have landed their dream jobs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Akshat",
                  role: "Marketing Manager",
                  content:
                    "I landed my dream job within 2 weeks of using ResumeBuilder. The templates are professional and the interface is so easy to use!",
                },
                {
                  name: "Suryansh",
                  role: "Software Engineer",
                  content:
                    "As a developer, I was skeptical about using a resume builder, but this tool exceeded my expectations. The ATS-friendly templates helped me get past the initial screening.",
                },
                {
                  name: "Prakhar",
                  role: "Graphic Designer",
                  content:
                    "The creative templates perfectly showcase my portfolio. I've received so many compliments on my resume design!",
                },
                {
                  name: "Rahul",
                  role: "Financial Analyst",
                  content:
                    "Clean, professional templates that highlight my skills and experience. The export options are fantastic too.",
                },
                {
                  name: "Shivam",
                  role: "HR Specialist",
                  content:
                    "As someone who reviews resumes daily, I can confirm that resumes made with this tool stand out from the crowd.",
                },
                {
                  name: "Utkarsh",
                  role: "Recent Graduate",
                  content:
                    "The guidance provided helped me showcase my limited experience effectively. I received multiple interview calls within days!",
                },
              ].map((testimonial, index) => (
                <div key={index} className="flex flex-col rounded-lg border p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{testimonial.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to create your professional resume?
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of job seekers who have successfully landed their dream jobs.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <a
                  href="/createresume"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90"
                >
                  Create Your Resume
                </a>
                <a
                  href="/templates"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-primary-foreground bg-transparent px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-foreground/10"
                >
                  Browse Templates
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <a href="/" className="flex items-center gap-2 font-bold text-xl">
                <FileText className="h-6 w-6" />
                <span>ResumeBuilder</span>
              </a>
              <p className="text-sm text-muted-foreground">
                Create professional resumes in minutes with our easy-to-use resume builder.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/features" className="text-muted-foreground hover:text-foreground">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/templates" className="text-muted-foreground hover:text-foreground">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/about" className="text-muted-foreground hover:text-foreground">
                    About
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/careers" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/cookies" className="text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} ResumeBuilder. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">aedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

