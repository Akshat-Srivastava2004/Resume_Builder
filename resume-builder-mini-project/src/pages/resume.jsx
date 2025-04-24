"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import html2pdf from 'html2pdf.js' 
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Plus, Trash2, Download, Eye, ArrowLeft, ArrowRight, Save, X, Check } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState("personal")
  const [showPreview, setShowPreview] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const resumeRef = useRef(null)
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      objective: "",
    },
    education: [
      {
        school: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    experience: [
      {
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ],
    skills: [{ name: "", level: "Beginner" }],
    projects: [
      {
        title: "",
        description: "",
        technologies: "",
        link: "",
      },
    ],
  })

  const handlePersonalChange = (e) => {
    const { name, value } = e.target
    setResumeData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [name]: value,
      },
    }))
  }

  const handleArrayChange = (section, index, field, value) => {
    setResumeData((prev) => {
      const newArray = [...prev[section]]
      newArray[index] = {
        ...newArray[index],
        [field]: value,
      }
      return {
        ...prev,
        [section]: newArray,
      }
    })
  }

  const addItem = (section) => {
    setResumeData((prev) => {
      const emptyItem = {
        education: {
          school: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          description: "",
        },
        experience: {
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
        skills: {
          name: "",
          level: "Beginner",
        },
        projects: {
          title: "",
          description: "",
          technologies: "",
          link: "",
        },
      }

      return {
        ...prev,
        [section]: [...prev[section], emptyItem[section]],
      }
    })
  }

  const removeItem = (section, index) => {
    setResumeData((prev) => {
      const newArray = [...prev[section]]
      newArray.splice(index, 1)
      return {
        ...prev,
        [section]: newArray.length ? newArray : [emptyItem[section]],
      }
    })
  }

  const emptyItem = {
    education: {
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      description: "",
    },
    experience: {
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
    skills: {
      name: "",
      level: "Beginner",
    },
    projects: {
      title: "",
      description: "",
      technologies: "",
      link: "",
    },
  }

  const handleNext = () => {
    const tabs = ["personal", "education", "experience", "skills", "projects"]
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
  }

  const handlePrevious = () => {
    const tabs = ["personal", "education", "experience", "skills", "projects"]
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }

  const handleSave = () => {
    // In a real app, you would save this data to your backend
    console.log("Resume data saved:", resumeData)
    alert("Resume saved successfully!")
  }

  const handlePreview = () => {
    setShowPreview(true)
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const handleDownload = () => {
    if (typeof window !== "undefined") {
      const resumeElement = document.getElementById('resume-preview');
      if (!resumeElement) return;
  
      // Create a style element with the template styles
      let templateStyles = "";
  
      switch (selectedTemplate) {
        case "modern":
          templateStyles = `body { font-family: 'Segoe UI', Roboto, sans-serif; color: #333; line-height: 1.6; } .resume-container { max-width: 800px; margin: 0 auto; padding: 40px; } .header { text-align: center; margin-bottom: 30px; } .header h1 { font-size: 28px; margin-bottom: 10px; color: #2563eb; } .contact-info { font-size: 14px; color: #666; } .section { margin-bottom: 25px; } .section-title { font-size: 18px; font-weight: 600; border-bottom: 2px solid #2563eb; padding-bottom: 5px; margin-bottom: 15px; color: #2563eb; } .item { margin-bottom: 20px; } .item-header { display: flex; justify-content: space-between; margin-bottom: 5px; } .item-title { font-weight: 600; font-size: 16px; } .item-subtitle { color: #555; } .item-date { color: #777; font-size: 14px; } .skills-list { display: flex; flex-wrap: wrap; gap: 8px; } .skill-item { background: #e6efff; color: #2563eb; padding: 5px 12px; border-radius: 15px; font-size: 14px; }`;
          break;
        case "professional":
          templateStyles = `body { font-family: 'Times New Roman', Times, serif; color: #000; line-height: 1.5; } .resume-container { max-width: 800px; margin: 0 auto; padding: 30px; } .header { text-align: center; margin-bottom: 25px; border-bottom: 1px solid #000; padding-bottom: 15px; } .header h1 { font-size: 24px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; } .contact-info { font-size: 14px; } .section { margin-bottom: 20px; } .section-title { font-size: 18px; font-weight: bold; text-transform: uppercase; margin-bottom: 12px; } .item { margin-bottom: 15px; } .item-header { display: flex; justify-content: space-between; margin-bottom: 5px; } .item-title { font-weight: bold; } .item-subtitle { font-style: italic; } .item-date { font-style: italic; } .skills-list { margin-top: 10px; } .skill-item { display: inline-block; margin-right: 15px; margin-bottom: 8px; }`;
          break;
        case "creative":
          templateStyles = `body { font-family: 'Poppins', sans-serif; color: #333; line-height: 1.6; background-color: #fff; } .resume-container { max-width: 800px; margin: 0 auto; padding: 40px; } .header { text-align: center; margin-bottom: 30px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px; border-radius: 10px; color: white; } .header h1 { font-size: 32px; margin-bottom: 10px; font-weight: 700; } .contact-info { font-size: 14px; } .section { margin-bottom: 25px; background: #f9fafb; padding: 20px; border-radius: 10px; } .section-title { font-size: 20px; font-weight: 600; color: #6366f1; margin-bottom: 15px; position: relative; padding-left: 15px; } .section-title:before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 5px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border-radius: 10px; } .item { margin-bottom: 20px; } .item-header { display: flex; justify-content: space-between; margin-bottom: 8px; } .item-title { font-weight: 600; font-size: 16px; color: #6366f1; } .item-subtitle { color: #555; } .item-date { color: #6366f1; font-weight: 500; font-size: 14px; } .skills-list { display: flex; flex-wrap: wrap; gap: 10px; } .skill-item { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 8px 15px; border-radius: 20px; font-size: 14px; }`;
          break;
        case "minimalist":
          templateStyles = `body { font-family: 'Inter', sans-serif; color: #333; line-height: 1.6; } .resume-container { max-width: 800px; margin: 0 auto; padding: 40px; } .header { margin-bottom: 30px; } .header h1 { font-size: 24px; margin-bottom: 10px; font-weight: 600; } .contact-info { font-size: 14px; color: #666; } .section { margin-bottom: 25px; } .section-title { font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; color: #888; } .item { margin-bottom: 20px; } .item-header { display: flex; justify-content: space-between; margin-bottom: 5px; } .item-title { font-weight: 600; } .item-subtitle { color: #555; } .item-date { color: #888; font-size: 14px; } .skills-list { display: flex; flex-wrap: wrap; gap: 15px; } .skill-item { border: 1px solid #ddd; padding: 5px 12px; border-radius: 4px; font-size: 14px; }`;
          break;
      }
  
      // Clone resume content and apply style inline
      const clonedResume = resumeElement.cloneNode(true);
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `<style>${templateStyles}</style>`;
      wrapper.appendChild(clonedResume);
  
      // Generate PDF using html2pdf
      html2pdf()
        .set({
          margin: 0,
          filename: `${resumeData.personal.fullName.replace(/\s+/g, '_') || "Resume"}_${selectedTemplate}.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .from(wrapper)
        .save();
    }
  };
  

  // Template selection component
  const TemplateSelector = () => {
    return (
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">Choose a Template</h2>
        <RadioGroup value={selectedTemplate} onValueChange={setSelectedTemplate} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <TemplateOption id="modern" value="modern" name="Modern" selected={selectedTemplate === "modern"} />
          <TemplateOption id="professional" value="professional" name="Professional" selected={selectedTemplate === "professional"} />
          <TemplateOption id="creative" value="creative" name="Creative" selected={selectedTemplate === "creative"} />
          <TemplateOption id="minimalist" value="minimalist" name="Minimalist" selected={selectedTemplate === "minimalist"} />
        </RadioGroup>
      </div>
    )
  }

  // Template option component
  const TemplateOption = ({ id, value, name, selected }) => {
    return (
      <Label 
        htmlFor={id} 
        className={`relative flex flex-col items-center justify-center border-2 rounded-lg p-4 cursor-pointer transition-all ${
          selected ? 'border-primary bg-primary/10' : 'border-muted-foreground/20 hover:border-muted-foreground/40'
        }`}
      >
        <RadioGroupItem value={value} id={id} className="sr-only" />
        <div className="w-full h-24 mb-2 bg-muted rounded flex items-center justify-center overflow-hidden">
          <div className={`w-full h-full ${value === 'modern' ? 'bg-blue-100' : value === 'professional' ? 'bg-gray-100' : value === 'creative' ? 'bg-purple-100' : 'bg-slate-100'}`}>
            <div className={`w-full h-4 ${value === 'modern' ? 'bg-blue-500' : value === 'professional' ? 'bg-gray-800' : value === 'creative' ? 'bg-purple-500' : 'bg-slate-300'} mb-2`}></div>
            <div className="flex flex-col px-2">
              <div className={`w-1/2 h-2 ${value === 'modern' ? 'bg-blue-300' : value === 'professional' ? 'bg-gray-500' : value === 'creative' ? 'bg-purple-300' : 'bg-slate-400'} mb-1`}></div>
              <div className={`w-3/4 h-2 ${value === 'modern' ? 'bg-blue-200' : value === 'professional' ? 'bg-gray-400' : value === 'creative' ? 'bg-purple-200' : 'bg-slate-300'} mb-1`}></div>
              <div className={`w-2/3 h-2 ${value === 'modern' ? 'bg-blue-200' : value === 'professional' ? 'bg-gray-400' : value === 'creative' ? 'bg-purple-200' : 'bg-slate-300'}`}></div>
            </div>
          </div>
        </div>
        <span className="font-medium">{name}</span>
        {selected && (
          <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
            <Check className="h-3 w-3" />
          </div>
        )}
      </Label>
    )
  }

  // Resume templates
  const ModernTemplate = ({ resumeData, formatDate }) => {
    const { personal, education, experience, skills, projects } = resumeData
    
    // Function to get full address
    const getFullAddress = () => {
      const parts = []
      if (personal.address) parts.push(personal.address)
  
      const cityState = []
      if (personal.city) cityState.push(personal.city)
      if (personal.state) cityState.push(personal.state)
      if (cityState.length > 0) parts.push(cityState.join(", "))
  
      if (personal.zipCode) parts.push(personal.zipCode)
  
      return parts.join(" • ")
    }
  
    // Function to get contact info
    const getContactInfo = () => {
      const parts = []
      if (personal.phone) parts.push(personal.phone)
      if (personal.email) parts.push(personal.email)
      return parts.join(" • ")
    }
  
    return (
      <div className="font-sans text-gray-900">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-blue-600">{personal.fullName || "Your Name"}</h1>
          {getContactInfo() && <p className="text-gray-600 mb-1">{getContactInfo()}</p>}
          {getFullAddress() && <p className="text-gray-600">{getFullAddress()}</p>}
        </header>
  
        {/* Professional Summary */}
        {personal.objective && (
          <section className="mb-6">
            <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-1 mb-3 text-blue-600">Professional Summary</h2>
            <p className="text-gray-700">{personal.objective}</p>
          </section>
        )}
  
        {/* Experience */}
        {experience.some((exp) => exp.company || exp.position) && (
          <section className="mb-6">
            <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-1 mb-3 text-blue-600">Professional Experience</h2>
            {experience.map((exp, index) =>
              exp.company || exp.position ? (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-semibold">{exp.position || "Position"}</h3>
                    <span className="text-gray-600 text-sm">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <p className="text-gray-700 font-medium">{exp.company || "Company"}</p>
                    {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                  </div>
                  {exp.description && <p className="text-gray-700 mt-2">{exp.description}</p>}
                </div>
              ) : null
            )}
          </section>
        )}
  
        {/* Education */}
        {education.some((edu) => edu.school || edu.degree) && (
          <section className="mb-6">
            <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-1 mb-3 text-blue-600">Education</h2>
            {education.map((edu, index) =>
              edu.school || edu.degree ? (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-semibold">
                      {edu.degree || "Degree"}
                      {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                    </h3>
                    <span className="text-gray-600 text-sm">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium">{edu.school || "School/University"}</p>
                  {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
                </div>
              ) : null
            )}
          </section>
        )}
  
        {/* Skills */}
        {skills.some((skill) => skill.name) && (
          <section className="mb-6">
            <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-1 mb-3 text-blue-600">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) =>
                skill.name ? (
                  <div key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {skill.name} {skill.level && skill.level !== "Beginner" && `(${skill.level})`}
                  </div>
                ) : null
              )}
            </div>
          </section>
        )}
  
        {/* Projects */}
        {projects.some((project) => project.title) && (
          <section className="mb-6">
            <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-1 mb-3 text-blue-600">Projects</h2>
            {projects.map((project, index) =>
              project.title ? (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm hover:underline"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-gray-600 text-sm mt-1">
                      <span className="font-medium">Technologies:</span> {project.technologies}
                    </p>
                  )}
                  {project.description && <p className="text-gray-700 mt-2">{project.description}</p>}
                </div>
              ) : null
            )}
          </section>
        )}
      </div>
    )
  }

  const ProfessionalTemplate = ({ resumeData, formatDate }) => {
    const { personal, education, experience, skills, projects } = resumeData
    
    // Function to get full address
    const getFullAddress = () => {
      const parts = []
      if (personal.address) parts.push(personal.address)
  
      const cityState = []
      if (personal.city) cityState.push(personal.city)
      if (personal.state) cityState.push(personal.state)
      if (cityState.length > 0) parts.push(cityState.join(", "))
  
      if (personal.zipCode) parts.push(personal.zipCode)
  
      return parts.join(" | ")
    }
  
    // Function to get contact info
    const getContactInfo = () => {
      const parts = []
      if (personal.phone) parts.push(personal.phone)
      if (personal.email) parts.push(personal.email)
      return parts.join(" | ")
    }
  
    return (
      <div className="font-serif text-black">
        {/* Header */}
        <header className="text-center mb-6 border-b border-black pb-4">
          <h1 className="text-2xl font-bold mb-2 uppercase tracking-wider">{personal.fullName || "YOUR NAME"}</h1>
          {getContactInfo() && <p className="mb-1">{getContactInfo()}</p>}
          {getFullAddress() && <p>{getFullAddress()}</p>}
        </header>
  
        {/* Professional Summary */}
        {personal.objective && (
          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase mb-2">PROFESSIONAL SUMMARY</h2>
            <p>{personal.objective}</p>
          </section>
        )}
  
        {/* Experience */}
        {experience.some((exp) => exp.company || exp.position) && (
          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase mb-3">PROFESSIONAL EXPERIENCE</h2>
            {experience.map((exp, index) =>
              exp.company || exp.position ? (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold">{exp.position || "Position"}</h3>
                    <span className="italic">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="italic">{exp.company || "Company"}{exp.location ? `, ${exp.location}` : ""}</p>
                  {exp.description && <p className="mt-2">{exp.description}</p>}
                </div>
              ) : null
            )}
          </section>
        )}
  
        {/* Education */}
        {education.some((edu) => edu.school || edu.degree) && (
          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase mb-3">EDUCATION</h2>
            {education.map((edu, index) =>
              edu.school || edu.degree ? (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold">
                      {edu.degree || "Degree"}
                      {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                    </h3>
                    <span className="italic">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="italic">{edu.school || "School/University"}</p>
                  {edu.description && <p className="mt-2">{edu.description}</p>}
                </div>
              ) : null
            )}
          </section>
        )}
  
        {/* Skills */}
        {skills.some((skill) => skill.name) && (
          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase mb-3">SKILLS</h2>
            <div>
              {skills.map((skill, index) =>
                skill.name ? (
                  <span key={index} className="inline-block mr-4 mb-2">
                    {skill.name} {skill.level && skill.level !== "Beginner" && `(${skill.level})`}
                  </span>
                ) : null
              )}
            </div>
          </section>
        )}
  
        {/* Projects */}
        {projects.some((project) => project.title) && (
          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase mb-3">PROJECTS</h2>
            {projects.map((project, index) =>
              project.title ? (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold">{project.title}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="italic mt-1">
                      Technologies: {project.technologies}
                    </p>
                  )}
                  {project.description && <p className="mt-2">{project.description}</p>}
                </div>
              ) : null
            )}
          </section>
        )}
      </div>
    )
  }

  const CreativeTemplate = ({ resumeData, formatDate }) => {
    const { personal, education, experience, skills, projects } = resumeData
    
    // Function to get full address
    const getFullAddress = () => {
      const parts = []
      if (personal.address) parts.push(personal.address)
  
      const cityState = []
      if (personal.city) cityState.push(personal.city)
      if (personal.state) cityState.push(personal.state)
      if (cityState.length > 0) parts.push(cityState.join(", "))
  
      if (personal.zipCode) parts.push(personal.zipCode)
  
      return parts.join(" • ")
    }
  
    // Function to get contact info
    const getContactInfo = () => {
      const parts = []
      if (personal.phone) parts.push(personal.phone)
      if (personal.email) parts.push(personal.email)
      return parts.join(" • ")
    }
  
    return (
      <div className="font-sans text-gray-900">
        {/* Header */}
        <header className="text-center mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-lg">
          <h1 className="text-3xl font-bold mb-2">{personal.fullName || "Your Name"}</h1>
          {getContactInfo() && <p className="mb-1">{getContactInfo()}</p>}
          {getFullAddress() && <p>{getFullAddress()}</p>}
        </header>
  
        {/* Professional Summary */}
        {personal.objective && (
          <section className="mb-6 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-purple-600 mb-3 pl-4 border-l-4 border-purple-600">Professional Summary</h2>
            <p className="text-gray-700">{personal.objective}</p>
          </section>
        )}
  
        {/* Experience */}
        {experience.some((exp) => exp.company || exp.position) && (
          <section className="mb-6 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-purple-600 mb-3 pl-4 border-l-4 border-purple-600">Professional Experience</h2>
            {experience.map((exp, index) =>
              exp.company || exp.position ? (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-semibold text-indigo-600">{exp.position || "Position"}</h3>
                    <span className="text-purple-600 font-medium">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <p className="text-gray-700 font-medium">{exp.company || "Company"}</p>
                    {exp.location && <p className="text-gray-600">{exp.location}</p>}
                  </div>
                  {exp.description && <p className="text-gray-700 mt-2">{exp.description}</p>}
                </div>
              ) : null
            )}
          </section>
        )}
  
        {/* Education */}
        {education.some((edu) => edu.school || edu.degree) && (
          <section className="mb-6 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-purple-600 mb-3 pl-4 border-l-4 border-purple-600">Education</h2>
            {education.map((edu, index) =>
              edu.school || edu.degree ? (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-semibold text-indigo-600">
                      {edu.degree || "Degree"}
                      {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                    </h3>
                    <span className="text-purple-600 font-medium">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium">{edu.school || "School/University"}</p>
                  {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
                </div>
              ) : null
            )}
          </section>
        )}
  
        {/* Skills */}
        {skills.some((skill) => skill.name) && (
          <section className="mb-6 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-purple-600 mb-3 pl-4 border-l-4 border-purple-600">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) =>
                skill.name ? (
                  <div key={index} className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm">
                    {skill.name} {skill.level && skill.level !== "Beginner" && `(${skill.level})`}
                  </div>
                ) : null
              )}
            </div>
          </section>
        )}
  
        {/* Projects */}
        {projects.some((project) => project.title) && (
          <section className="mb-6 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-purple-600 mb-3 pl-4 border-l-4 border-purple-600">Projects</h2>
            {projects.map((project, index) =>
              project.title ? (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-semibold text-indigo-600">{project.title}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-gray-600 mt-1">
                      <span className="font-medium">Technologies:</span> {project.technologies}
                    </p>
                  )}
                  {project.description && <p className="text-gray-700 mt-2">{project.description}</p>}
                </div>
              ) : null
            )}
          </section>
        )}
      </div>
    )
  }

  const MinimalistTemplate = ({ resumeData, formatDate }) => {
    const { personal, education, experience, skills, projects } = resumeData
    
    // Function to get full address
    const getFullAddress = () => {
      const parts = []
      if (personal.address) parts.push(personal.address)
  
      const cityState = []
      if (personal.city) cityState.push(personal.city)
      if (personal.state) cityState.push(personal.state)
      if (cityState.length > 0) parts.push(cityState.join(", "))
  
      if (personal.zipCode) parts.push(personal.zipCode)
  
      return parts.join(" • ")
    }
  
    // Function to get contact info
    const getContactInfo = () => {
      const parts = []
      if (personal.phone) parts.push(personal.phone)
      if (personal.email) parts.push(personal.email)
      return parts.join(" • ")
    }
  
    return (
      <div className="font-sans text-gray-900">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">{personal.fullName || "Your Name"}</h1>
          {getContactInfo() && <p className="text-gray-600 mb-1">{getContactInfo()}</p>}
          {getFullAddress() && <p className="text-gray-600">{getFullAddress()}</p>}
        </header>
  
        {/* Professional Summary */}
        {personal.objective && (
          <section className="mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">About</h2>
            <p className="text-gray-700">{personal.objective}</p>
          </section>
        )}
  
        {/* Experience */}
        {experience.some((exp) => exp.company || exp.position) && (
          <section className="mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">Experience</h2>
            {experience.map((exp, index) =>
              exp.company || exp.position ? (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold">{exp.position || "Position"}</h3>
                    <span className="text-gray-500 text-sm">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <p className="text-gray-700">{exp.company || "Company"}</p>
                    {exp.location && <p className="text-gray-500 text-sm">{exp.location}</p>}
                  </div>
                  {exp.description && <p className="text-gray-700 mt-2">{exp.description}</p>}
                </div>
              ) : null
            )}
          </section>
        )}
  
        {/* Education */}
        {education.some((edu) => edu.school || edu.degree) && (
          <section className="mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">Education</h2>
            {education.map((edu, index) =>
              edu.school || edu.degree ? (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold">
                      {edu.degree || "Degree"}
                      {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                    </h3>
                    <span className="text-gray-500 text-sm">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-700">{edu.school || "School/University"}</p>
                  {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
                </div>
              ) : null
            )}
          </section>
        )}
  
        {/* Skills */}
        {skills.some((skill) => skill.name) && (
          <section className="mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) =>
                skill.name ? (
                  <div key={index} className="border border-gray-300 px-3 py-1 rounded text-sm">
                    {skill.name} {skill.level && skill.level !== "Beginner" && `(${skill.level})`}
                  </div>
                ) : null
              )}
            </div>
          </section>
        )}
  
        {/* Projects */}
        {projects.some((project) => project.title) && (
          <section className="mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">Projects</h2>
            {projects.map((project, index) =>
              project.title ? (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold">{project.title}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 text-sm hover:underline"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-gray-600 text-sm mt-1">
                      <span className="font-medium">Technologies:</span> {project.technologies}
                    </p>
                  )}
                  {project.description && <p className="text-gray-700 mt-2">{project.description}</p>}
                </div>
              ) : null
            )}
          </section>
        )}
      </div>
    )
  }

  // Render the selected template
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "modern":
        return <ModernTemplate resumeData={resumeData} formatDate={formatDate} />
      case "professional":
        return <ProfessionalTemplate resumeData={resumeData} formatDate={formatDate} />
      case "creative":
        return <CreativeTemplate resumeData={resumeData} formatDate={formatDate} />
      case "minimalist":
        return <MinimalistTemplate resumeData={resumeData} formatDate={formatDate} />
      default:
        return <ModernTemplate resumeData={resumeData} formatDate={formatDate} />
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">ResumeBuilder</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Create Your Resume</h1>

        {/* Template Selector */}
        <TemplateSelector />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={resumeData.personal.fullName}
                        onChange={handlePersonalChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={resumeData.personal.email}
                        onChange={handlePersonalChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="(123) 456-7890"
                        value={resumeData.personal.phone}
                        onChange={handlePersonalChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="123 Main St"
                        value={resumeData.personal.address}
                        onChange={handlePersonalChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="New York"
                        value={resumeData.personal.city}
                        onChange={handlePersonalChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        placeholder="NY"
                        value={resumeData.personal.state}
                        onChange={handlePersonalChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        placeholder="10001"
                        value={resumeData.personal.zipCode}
                        onChange={handlePersonalChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="objective">Professional Summary</Label>
                    <Textarea
                      id="objective"
                      name="objective"
                      placeholder="A brief summary of your professional background and career goals..."
                      rows={4}
                      value={resumeData.personal.objective}
                      onChange={handlePersonalChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education */}
          <TabsContent value="education">
            <Card>
              <CardContent className="pt-6">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="mb-8 border-b pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Education #{index + 1}</h3>
                      {resumeData.education.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeItem("education", index)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`school-${index}`}>School/University</Label>
                          <Input
                            id={`school-${index}`}
                            placeholder="Harvard University"
                            value={edu.school}
                            onChange={(e) => handleArrayChange("education", index, "school", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`degree-${index}`}>Degree</Label>
                          <Input
                            id={`degree-${index}`}
                            placeholder="Bachelor of Science"
                            value={edu.degree}
                            onChange={(e) => handleArrayChange("education", index, "degree", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`fieldOfStudy-${index}`}>Field of Study</Label>
                        <Input
                          id={`fieldOfStudy-${index}`}
                          placeholder="Computer Science"
                          value={edu.fieldOfStudy}
                          onChange={(e) => handleArrayChange("education", index, "fieldOfStudy", e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                          <Input
                            id={`startDate-${index}`}
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => handleArrayChange("education", index, "startDate", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`endDate-${index}`}>End Date (or Expected)</Label>
                          <Input
                            id={`endDate-${index}`}
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => handleArrayChange("education", index, "endDate", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`description-${index}`}>Description</Label>
                        <Textarea
                          id={`description-${index}`}
                          placeholder="Relevant coursework, achievements, activities..."
                          rows={3}
                          value={edu.description}
                          onChange={(e) => handleArrayChange("education", index, "description", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full mt-4" onClick={() => addItem("education")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Education
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience */}
          <TabsContent value="experience">
            <Card>
              <CardContent className="pt-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="mb-8 border-b pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Experience #{index + 1}</h3>
                      {resumeData.experience.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeItem("experience", index)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`company-${index}`}>Company</Label>
                          <Input
                            id={`company-${index}`}
                            placeholder="Google"
                            value={exp.company}
                            onChange={(e) => handleArrayChange("experience", index, "company", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`position-${index}`}>Position</Label>
                          <Input
                            id={`position-${index}`}
                            placeholder="Software Engineer"
                            value={exp.position}
                            onChange={(e) => handleArrayChange("experience", index, "position", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`location-${index}`}>Location</Label>
                        <Input
                          id={`location-${index}`}
                          placeholder="Mountain View, CA"
                          value={exp.location}
                          onChange={(e) => handleArrayChange("experience", index, "location", e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`expStartDate-${index}`}>Start Date</Label>
                          <Input
                            id={`expStartDate-${index}`}
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => handleArrayChange("experience", index, "startDate", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`expEndDate-${index}`}>End Date</Label>
                          <Input
                            id={`expEndDate-${index}`}
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => handleArrayChange("experience", index, "endDate", e.target.value)}
                            disabled={exp.current}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`current-${index}`}
                          checked={exp.current}
                          onChange={(e) => handleArrayChange("experience", index, "current", e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor={`current-${index}`}>I currently work here</Label>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`expDescription-${index}`}>Description</Label>
                        <Textarea
                          id={`expDescription-${index}`}
                          placeholder="Describe your responsibilities, achievements, and the technologies you worked with..."
                          rows={4}
                          value={exp.description}
                          onChange={(e) => handleArrayChange("experience", index, "description", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full mt-4" onClick={() => addItem("experience")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Experience
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills */}
          <TabsContent value="skills">
            <Card>
              <CardContent className="pt-6">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium">Skill #{index + 1}</h3>
                      {resumeData.skills.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeItem("skills", index)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`skillName-${index}`}>Skill Name</Label>
                        <Input
                          id={`skillName-${index}`}
                          placeholder="JavaScript"
                          value={skill.name}
                          onChange={(e) => handleArrayChange("skills", index, "name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`skillLevel-${index}`}>Proficiency Level</Label>
                        <Select
                          value={skill.level}
                          onValueChange={(value) => handleArrayChange("skills", index, "level", value)}
                        >
                          <SelectTrigger id={`skillLevel-${index}`}>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Expert">Expert</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full mt-4" onClick={() => addItem("skills")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Skill
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects */}
          <TabsContent value="projects">
            <Card>
              <CardContent className="pt-6">
                {resumeData.projects.map((project, index) => (
                  <div key={index} className="mb-8 border-b pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Project #{index + 1}</h3>
                      {resumeData.projects.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeItem("projects", index)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid gap-6">
                      <div className="space-y-2">
                        <Label htmlFor={`projectTitle-${index}`}>Project Title</Label>
                        <Input
                          id={`projectTitle-${index}`}
                          placeholder="E-commerce Website"
                          value={project.title}
                          onChange={(e) => handleArrayChange("projects", index, "title", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`projectDescription-${index}`}>Description</Label>
                        <Textarea
                          id={`projectDescription-${index}`}
                          placeholder="Describe the project, your role, and the impact..."
                          rows={3}
                          value={project.description}
                          onChange={(e) => handleArrayChange("projects", index, "description", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`technologies-${index}`}>Technologies Used</Label>
                        <Input
                          id={`technologies-${index}`}
                          placeholder="React, Node.js, MongoDB"
                          value={project.technologies}
                          onChange={(e) => handleArrayChange("projects", index, "technologies", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`projectLink-${index}`}>Project Link (optional)</Label>
                        <Input
                          id={`projectLink-${index}`}
                          placeholder="https://github.com/yourusername/project"
                          value={project.link}
                          onChange={(e) => handleArrayChange("projects", index, "link", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full mt-4" onClick={() => addItem("projects")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Project
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handlePrevious} disabled={activeTab === "personal"}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>

            <Button variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>

            <Button onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>

          <Button onClick={handleNext} disabled={activeTab === "projects"}>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Resume Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Resume Preview - {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)} Template</span>
              <Button variant="outline" size="sm" onClick={() => setShowPreview(false)}>
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <div id="resume-preview" ref={resumeRef} className="p-8 bg-white">
            {/* Render the selected template */}
            {renderTemplate()}
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Close
            </Button>
            <Button onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
