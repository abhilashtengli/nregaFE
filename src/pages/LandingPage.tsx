"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Users,
  Database,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  BarChart3,
  FileCheck,
  Building2,
  Truck,
  Receipt,
  MapPin,
  Code,
  Layers,
  Zap,
  Star
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/userAuthStore";
import { useEffect } from "react";
import Header from "@/components/Header";

export default function LandingPage() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: string })?.from || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  const features = [
    {
      icon: (
        <FileText className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-blue-600" />
      ),
      title: "PDF Report Generation",
      description:
        "Generate comprehensive PDF reports including checklists, work orders, forms, and abstracts with just a work code and financial year."
    },
    {
      icon: (
        <Layers className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-indigo-600" />
      ),
      title: "Combined PDF Reports",
      description:
        "Generate all reports in one single comprehensive PDF file, making it easy to share and archive complete project documentation."
    },
    {
      icon: (
        <Database className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-green-600" />
      ),
      title: "Material Management",
      description:
        "Update and manage material information efficiently with real-time data synchronization and tracking."
    },
    {
      icon: (
        <Users className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-purple-600" />
      ),
      title: "Vendor Management",
      description:
        "Add, update, and manage vendor information, quotations, and supply orders in one centralized system."
    },
    {
      icon: (
        <Shield className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-orange-600" />
      ),
      title: "Secure & Reliable",
      description:
        "Built with enterprise-grade security and reliability to handle government and administrative data."
    },
    {
      icon: (
        <Zap className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-yellow-600" />
      ),
      title: "Lightning Fast",
      description:
        "Generate reports in seconds with our optimized processing & designed for high-volume operations."
    }
  ];

  const reportTypes = [
    {
      name: "Checklist",
      icon: <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
    },
    {
      name: "Front Page",
      icon: <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
    },
    {
      name: "GP Abstract",
      icon: <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
    },
    {
      name: "Work Order",
      icon: <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
    },
    { name: "TS Copy", icon: <FileCheck className="h-3 w-3 sm:h-4 sm:w-4" /> },
    { name: "AS Copy", icon: <FileCheck className="h-3 w-3 sm:h-4 sm:w-4" /> },
    { name: "Form 6", icon: <FileText className="h-3 w-3 sm:h-4 sm:w-4" /> },
    { name: "Form 8", icon: <FileText className="h-3 w-3 sm:h-4 sm:w-4" /> },
    { name: "Form 9", icon: <FileText className="h-3 w-3 sm:h-4 sm:w-4" /> },
    {
      name: "Movement Slip",
      icon: <Truck className="h-3 w-3 sm:h-4 sm:w-4" />
    },
    {
      name: "Material MIS",
      icon: <Database className="h-3 w-3 sm:h-4 sm:w-4" />
    },
    {
      name: "Supply Order",
      icon: <Receipt className="h-3 w-3 sm:h-4 sm:w-4" />
    },
    { name: "Invoice", icon: <Receipt className="h-3 w-3 sm:h-4 sm:w-4" /> },
    { name: "Geo Tagging", icon: <MapPin className="h-3 w-3 sm:h-4 sm:w-4" /> },
    {
      name: "Quotation Forms",
      icon: <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
    },
    {
      name: "Comparative Statement",
      icon: <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
    }
  ];

  const stats = [
    {
      label: "Report Types",
      value: "20+",
      icon: <FileText className="h-4 w-4 sm:h-5 sm:w-5" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      label: "Processing Time",
      value: "<30s",
      icon: <Clock className="h-4 w-4 sm:h-5 sm:w-5" />,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100"
    },
    {
      label: "Data Security",
      value: "100%",
      icon: <Shield className="h-4 w-4 sm:h-5 sm:w-5" />,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100"
    },
    {
      label: "Uptime",
      value: "99.9%",
      icon: <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Header */}
      <Header />

      {/* Hero Section with Animated Background */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Circles */}
          <div className="absolute top-20 left-10 w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 bg-violet-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>

          {/* Floating Icons */}
          <div className="absolute md:top-32 top-20 left-1/4 animate-float opacity-10">
            <div className="bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-lg shadow-lg">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-600" />
            </div>
          </div>
          <div className="absolute bottom-24 right-1/4 animate-float md:block hidden animation-delay-1000 opacity-10">
            <div className="bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-lg shadow-lg">
              <Database className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-green-600" />
            </div>
          </div>
          <div className="absolute bottom-24 left-1/4 animate-float md:block hidden animation-delay-2000 opacity-10">
            <div className="bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-lg shadow-lg">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-purple-600" />
            </div>
          </div>
          <div className="absolute md:top-32 top-20 right-1/4 animate-float animation-delay-3000 opacity-10">
            <div className="bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-lg shadow-lg">
              <Layers className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-indigo-600" />
            </div>
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center z-10">
          <div className="mb-6 sm:mb-8">
            <Badge
              variant="outline"
              className="mb-4 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-white/80 backdrop-blur-sm border-blue-200"
            >
              <Code className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Generate Reports in Just One Click
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Streamline Your{" "}
            <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text animate-gradient">
              Administrative
            </span>{" "}
            Workflow
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Generate comprehensive PDF reports, manage materials and vendors,
            and streamline your administrative processes with just a work code
            and financial year. Built for government and administrative
            efficiency.
          </p>

          {/* New Combined PDF Feature Highlight */}
          <div className="mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3 sm:p-4 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                <span className="font-semibold text-sm sm:text-base text-indigo-900">
                  New Feature
                </span>
              </div>
              <p className="text-xs sm:text-sm text-indigo-800">
                Generate all 20+ reports in one comprehensive PDF file for
                complete project documentation
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <Link to="/signup">
              <Button
                size="lg"
                className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>

        <div className="relative max-w-7xl mx-auto z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative">
                  <div
                    className={`bg-gradient-to-br bg-white backdrop-blur-sm border border-white/20 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-md transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1`}
                  >
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <div
                        className={`bg-gradient-to-r ${stat.color} p-2.5 sm:p-3 rounded-full text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl -z-10`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Comprehensive tools designed specifically for government and
              administrative workflow management.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl hover:bg-white/80 transition-all duration-300 transform hover:scale-105 group relative overflow-hidden"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <CardHeader className="text-center pb-3 sm:pb-4 relative z-10">
                  <div className="flex justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-center text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Combined PDF Feature Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-white via-violet-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 border border-white/20">
              <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
              <span className="text-xs sm:text-sm font-semibold text-indigo-900">
                Combined PDF Generation
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              All Reports in One Comprehensive PDF
            </h2>
            <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Generate all 20+ individual reports combined into one single PDF
              file for complete project documentation, easy sharing, and
              simplified archiving.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 backdrop-blur-sm w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4">
                Individual Reports
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 px-2">
                Generate any specific report individually for focused
                documentation and quick access.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 backdrop-blur-sm w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Layers className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-indigo-600" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4">
                Combined PDF
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 px-2">
                Get all reports in one comprehensive PDF file with proper
                indexing and organization.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 backdrop-blur-sm w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Download className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-purple-600" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4">
                Easy Sharing
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 px-2">
                Share complete project documentation with stakeholders in one
                convenient file.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Report Types Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Comprehensive Report Generation
            </h2>
            <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Generate over 20 different types of reports instantly with just
              your work code and financial year.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {reportTypes.map((report, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md hover:bg-white/90 transition-all duration-200 border border-gray-100 group hover:border-blue-200"
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="text-blue-600 group-hover:scale-110 transition-transform duration-200">
                    {report.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {report.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              How It Works
            </h2>
            <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Simple, efficient, and optimized for productivity.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 backdrop-blur-sm w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Code className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4">
                1. Enter Work Code
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 px-2">
                Simply input your work code and select the financial year to get
                started with report generation.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 backdrop-blur-sm w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Database className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-green-600" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4">
                2. Manage Data
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 px-2">
                Update material information, manage vendor details, and ensure
                all data is current and accurate.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 backdrop-blur-sm w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Download className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-purple-600" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4">
                3. Generate Reports
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 px-2">
                Instantly generate and download comprehensive PDF reports for
                all your administrative needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-violet-400 to-blue-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Streamline Your Administrative Workflow?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Be among the first to use Nrega Files to enhance operational
            efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link to="/signup">
              <Button
                size="lg"
                className="cursor-pointer bg-white text-blue-600 hover:bg-gray-100 px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold">
                  Nrega Files
                </span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md text-sm sm:text-base">
                Streamlining administrative workflows with comprehensive report
                generation and data management solutions.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
            <p className="text-sm sm:text-base">
              &copy; 2025 Nrega Files. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
