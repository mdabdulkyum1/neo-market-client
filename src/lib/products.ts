export interface Product {
  id: number
  name: string
  category: string
  brand: string
  price: number
  description: string
  image: string
  fullDescription?: string
  rating?: number
  reviews?: number
  inStock?: boolean
  specifications?: Record<string, string>
}

export const allProducts: Product[] = [
  {
    id: 1,
    name: "CloudSync Pro",
    category: "saas",
    brand: "Brand Alpha",
    price: 99,
    description: "Enterprise cloud synchronization platform",
    image: "/cloud-sync-software.jpg",
    fullDescription:
      "CloudSync Pro is an enterprise-grade cloud synchronization platform designed for teams that need seamless file and data synchronization across multiple devices and locations. With advanced encryption, real-time collaboration features, and unlimited storage options, CloudSync Pro ensures your team stays connected and productive.",
    rating: 4.8,
    reviews: 324,
    inStock: true,
    specifications: {
      Storage: "Unlimited",
      Users: "Up to 100",
      Support: "24/7 Priority",
      "Uptime SLA": "99.99%",
      "API Access": "Yes",
    },
  },
  {
    id: 2,
    name: "DataVault Enterprise",
    category: "saas",
    brand: "Brand Beta",
    price: 199,
    description: "Secure data management solution",
    image: "/data-vault-software.jpg",
    fullDescription:
      "DataVault Enterprise provides military-grade encryption and secure data management for organizations handling sensitive information. Features include automated backups, compliance reporting, and advanced access controls.",
    rating: 4.9,
    reviews: 512,
    inStock: true,
    specifications: {
      Encryption: "AES-256",
      Compliance: "GDPR, HIPAA, SOC2",
      "Backup Frequency": "Hourly",
      "Recovery Time": "< 1 hour",
      "Audit Logs": "Unlimited",
    },
  },
  {
    id: 3,
    name: "Analytics Dashboard",
    category: "saas",
    brand: "Brand Gamma",
    price: 149,
    description: "Real-time analytics and reporting",
    image: "/analytics-dashboard.png",
    fullDescription:
      "Analytics Dashboard transforms your data into actionable insights with real-time visualizations, custom reports, and predictive analytics powered by machine learning.",
    rating: 4.7,
    reviews: 289,
    inStock: true,
    specifications: {
      "Data Sources": "50+",
      "Real-time Updates": "Yes",
      "Custom Reports": "Unlimited",
      "Export Formats": "PDF, CSV, Excel",
      "API Rate Limit": "10,000/min",
    },
  },
  {
    id: 4,
    name: "Web Development Mastery",
    category: "book",
    brand: "Brand Alpha",
    price: 49,
    description: "Complete guide to modern web development",
    image: "/web-development-book.jpg",
    fullDescription:
      "A comprehensive guide covering HTML5, CSS3, JavaScript, React, and modern web development practices. Perfect for beginners and intermediate developers looking to master contemporary web technologies.",
    rating: 4.6,
    reviews: 156,
    inStock: true,
    specifications: {
      Pages: "450",
      Format: "Hardcover & eBook",
      Language: "English",
      Published: "2024",
      Author: "John Smith",
    },
  },
  {
    id: 5,
    name: "Design Systems Guide",
    category: "book",
    brand: "Brand Beta",
    price: 39,
    description: "Building scalable design systems",
    image: "/design-systems-book.jpg",
    fullDescription:
      "Learn how to build and maintain scalable design systems that grow with your organization. Includes real-world case studies and practical frameworks used by leading tech companies.",
    rating: 4.8,
    reviews: 203,
    inStock: true,
    specifications: {
      Pages: "380",
      Format: "Paperback & eBook",
      Language: "English",
      Published: "2023",
      Author: "Sarah Johnson",
    },
  },
  {
    id: 6,
    name: "AI & Machine Learning",
    category: "book",
    brand: "Brand Gamma",
    price: 59,
    description: "Practical AI implementation guide",
    image: "/ai-machine-learning-book.jpg",
    fullDescription:
      "Discover practical approaches to implementing AI and machine learning in your projects. From neural networks to natural language processing, this guide covers everything you need to know.",
    rating: 4.9,
    reviews: 421,
    inStock: true,
    specifications: {
      Pages: "520",
      Format: "Hardcover & eBook",
      Language: "English",
      Published: "2024",
      Author: "Dr. Michael Chen",
    },
  },
  {
    id: 7,
    name: "CodeStudio IDE",
    category: "software",
    brand: "Brand Alpha",
    price: 79,
    description: "Professional development environment",
    image: "/code-studio-ide.jpg",
    fullDescription:
      "CodeStudio IDE is a lightweight yet powerful development environment supporting 50+ programming languages with intelligent code completion, debugging tools, and integrated version control.",
    rating: 4.7,
    reviews: 678,
    inStock: true,
    specifications: {
      Languages: "50+",
      Themes: "30+",
      Extensions: "Unlimited",
      "File Size Limit": "1GB",
      "Memory Usage": "< 500MB",
    },
  },
  {
    id: 8,
    name: "DesignPro Suite",
    category: "software",
    brand: "Brand Beta",
    price: 129,
    description: "Complete design and prototyping toolkit",
    image: "/design-pro-suite.jpg",
    fullDescription:
      "DesignPro Suite combines vector design, prototyping, and collaboration tools in one powerful platform. Create stunning designs and interactive prototypes with ease.",
    rating: 4.8,
    reviews: 445,
    inStock: true,
    specifications: {
      "File Formats": "20+",
      Collaboration: "Real-time",
      "Cloud Storage": "100GB",
      Plugins: "200+",
      "Export Options": "15+",
    },
  },
  {
    id: 9,
    name: "DevTools Pro",
    category: "software",
    brand: "Brand Gamma",
    price: 89,
    description: "Advanced development utilities",
    image: "/devtools-pro.jpg",
    fullDescription:
      "DevTools Pro provides advanced utilities for developers including performance profiling, network analysis, and debugging capabilities for modern web applications.",
    rating: 4.6,
    reviews: 334,
    inStock: true,
    specifications: {
      "Performance Metrics": "50+",
      "Network Monitoring": "Real-time",
      "Memory Profiling": "Yes",
      "CPU Analysis": "Yes",
      "Report Export": "PDF, JSON",
    },
  },
]

export function getProductById(id: number): Product | undefined {
  return allProducts.find((product) => product.id === id)
}

export function getRelatedProducts(productId: number, limit = 3): Product[] {
  const product = getProductById(productId)
  if (!product) return []

  return allProducts.filter((p) => p.category === product.category && p.id !== productId).slice(0, limit)
}
