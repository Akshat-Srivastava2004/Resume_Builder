"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Plus, Trash2, Download, Eye, ArrowLeft, ArrowRight, Save } from "lucide-react"

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState("personal")
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
    // In a real app, you would generate a preview of the resume
    console.log("Generating preview for:", resumeData)
    alert("Preview functionality would open a modal or new tab with the formatted resume")
  }

  const handleDownload = () => {
    // In a real app, you would generate a PDF or DOCX file
    console.log("Downloading resume:", resumeData)
    alert("Download functionality would generate and download a PDF/DOCX file")
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
    </div>
  )
}

