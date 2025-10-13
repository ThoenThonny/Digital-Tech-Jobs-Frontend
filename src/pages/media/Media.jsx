import React, { useState } from 'react';
import { Calendar, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { jobs } from '../detailcard/jobit';

const MediaCard = ({ image, date, title, category }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {category}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <Calendar size={16} />
          <span>{date}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 leading-tight">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default function Media() {
  const [searchQuery, setSearchQuery] = useState('');

  const mediaItems = [
    {
      id:1,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      date: "September 29, 2025",
      title: "The 13th Forum on China-ASEAN Technology Transfer and Collaboration",
      category: "Conference"
    },
    {
      id:2,
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",
      date: "September 29, 2025",
      title: "Time to go Digital! (3rd generation)",
      category: "Digital"
    },
    {
      id:3,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
      date: "September 17, 2025",
      title: "Cybersecurity Acronyms",
      category: "Technology"
    },
    {
      id:4,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      date: "September 15, 2025",
      title: "Innovation Summit 2025: Shaping the Future",
      category: "Summit"
    },
    {
      id:5,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
      date: "September 10, 2025",
      title: "AI and Machine Learning Applications",
      category: "AI"
    },
    {
      id:6,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
      date: "September 8, 2025",
      title: "Remote Work Revolution: Best Practices",
      category: "Workplace"
    },
    {
      id:7,
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
      date: "September 5, 2025",
      title: "Startup Ecosystem Development Workshop",
      category: "Business"
    },
    {
      id:8,
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop",
      date: "September 3, 2025",
      title: "Women in Tech Leadership Panel",
      category: "Leadership"
    },
    {
      id:9,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
      date: "August 30, 2025",
      title: "Blockchain Technology and Its Future",
      category: "Blockchain"
    },
    {
      id:10,
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
      date: "August 28, 2025",
      title: "Design Thinking Masterclass",
      category: "Design"
    },
    {
      id:11,
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
      date: "August 25, 2025",
      title: "Product Management Best Practices",
      category: "Product"
    },
    {
      id:12,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
      date: "August 22, 2025",
      title: "Team Building and Collaboration Strategies",
      category: "Team"
    },
    {
      id:13,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      date: "August 20, 2025",
      title: "Data Analytics and Visualization Trends",
      category: "Analytics"
    },
    {
      id:14,
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
      date: "August 18, 2025",
      title: "Mobile App Development Workshop",
      category: "Development"
    },
    {
      id:15,
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop",
      date: "August 15, 2025",
      title: "Cloud Computing Infrastructure Guide",
      category: "Cloud"
    },
    {
      id:17,
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
      date: "August 12, 2025",
      title: "Digital Marketing Strategies 2025",
      category: "Marketing"
    },
    {
      id:18,
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
      date: "August 10, 2025",
      title: "E-commerce Trends and Insights",
      category: "Commerce"
    },
    {
      id:19,
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop",
      date: "August 8, 2025",
      title: "IoT Solutions for Smart Cities",
      category: "IoT"
    },
    {
      id:20,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
      date: "August 5, 2025",
      title: "5G Technology and Applications",
      category: "Network"
    },
    {
      id:21,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
      date: "August 1, 2025",
      title: "Agile Methodology Implementation",
      category: "Agile"
    },
    {
      id:22,
      image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&h=600&fit=crop",
      date: "July 28, 2025",
      title: "DevOps Culture and Implementation",
      category: "DevOps"
    },
    {
      id:23,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
      date: "July 25, 2025",
      title: "Financial Technology Revolution",
      category: "FinTech"
    },
    {
      id:24,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
      date: "July 22, 2025",
      title: "Software Architecture Patterns",
      category: "Architecture"
    },
    {
      id:25,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
      date: "July 20, 2025",
      title: "Frontend Development Frameworks",
      category: "Frontend"
    },
    {
      id:26,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      date: "July 18, 2025",
      title: "Backend Systems and APIs",
      category: "Backend"
    },
    {
      id:27,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      date: "July 15, 2025",
      title: "Database Management Systems",
      category: "Database"
    },
    {
      id:28,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      date: "July 12, 2025",
      title: "Business Intelligence Tools",
      category: "BI"
    },
    
    {id:29,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      date: "July 10, 2025",
      title: "Data Science and Big Data",
      category: "Data Science"
    },
    {
      id:30,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      date: "July 8, 2025",
      title: "Quantum Computing Basics",
      category: "Quantum"
    },
    {
      id:31,
      image: "https://images.unsplash.com/photo-1484807352052-23338990c6c6?w=800&h=600&fit=crop",
      date: "July 5, 2025",
      title: "Virtual Reality Applications",
      category: "VR"
    },
    {
      id:32,
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=600&fit=crop",
      date: "July 3, 2025",
      title: "Augmented Reality in Business",
      category: "AR"
    },
    {
      id:33,
      image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=600&fit=crop",
      date: "July 1, 2025",
      title: "Robotics and Automation",
      category: "Robotics"
    },
    {
      id:34,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
      date: "June 28, 2025",
      title: "Smart Manufacturing Technologies",
      category: "Manufacturing"
    },
    {
      id:35,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
      date: "June 25, 2025",
      title: "Enterprise Resource Planning",
      category: "ERP"
    },
    {
      id:36,
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
      date: "June 22, 2025",
      title: "Customer Relationship Management",
      category: "CRM"
    },
    {
      id:37,
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop",
      date: "June 20, 2025",
      title: "Supply Chain Optimization",
      category: "Supply Chain"
    },
    {
      id:38,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop",
      date: "June 18, 2025",
      title: "Human Resources Management",
      category: "HR"
    },
    {
      id:39,
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop",
      date: "June 15, 2025",
      title: "Project Portfolio Management",
      category: "Project"
    },
    {
      id:40,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      date: "June 12, 2025",
      title: "Leadership Development Program",
      category: "Leadership"
    },
    {
      id:41,
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
      date: "June 10, 2025",
      title: "Change Management Strategies",
      category: "Change"
    },
    {
      id:42,
      image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&h=600&fit=crop",
      date: "June 8, 2025",
      title: "Sustainability and Green Tech",
      category: "Sustainability"
    },
    {
      id:43,
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=600&fit=crop",
      date: "June 5, 2025",
      title: "Renewable Energy Solutions",
      category: "Energy"
    },
    {
      id:44,
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&h=600&fit=crop",
      date: "June 3, 2025",
      title: "Electric Vehicle Technology",
      category: "Automotive"
    },
    {
      id:45,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
      date: "June 1, 2025",
      title: "Healthcare Technology Innovations",
      category: "Healthcare"
    },
    {
      id:46,
      image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&h=600&fit=crop",
      date: "May 28, 2025",
      title: "Telemedicine and Remote Care",
      category: "Medical"
    },
    {
      id:47,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop",
      date: "May 25, 2025",
      title: "Biotechnology Breakthroughs",
      category: "Biotech"
    },
    {
      id:48,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop",
      date: "May 22, 2025",
      title: "EdTech and Online Learning",
      category: "Education"
    },
    {
      id:49,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
      date: "May 20, 2025",
      title: "Fashion Technology Trends",
      category: "Fashion"
    },
    {
      id:50,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      date: "May 18, 2025",
      title: "Food Technology and Innovation",
      category: "Food"
    },
    {
      id:51,
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop",
      date: "May 15, 2025",
      title: "Smart Home Technologies",
      category: "Smart Home"
    },
     {
    id: 52,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    date: "May 18, 2025",
    title: "Food Technology and Innovation",
    category: "Food",
    author: "Olivia Brown",
    summary: "Exploring new trends in food technology.",
    content: "Covers innovations in food processing, alternative proteins, smart kitchen devices, and sustainable food solutions.",
    location: "Paris, France",
    tags: ["Food", "Technology", "Innovation", "Sustainability"],
    views: 1400,
    likes: 310,
    comments: [{ user: "Noah", comment: "Love this insight on food tech!", date: "May 19, 2025" }],
    videoUrl: "https://example.com/foodtech-video.mp4",
    gallery: ["https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop"]
  },
  {
    id: 53,
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop",
    date: "May 15, 2025",
    title: "Smart Home Technologies",
    category: "Smart Home",
    author: "Lucas Martinez",
    summary: "The rise of smart home devices and systems.",
    content: "Explains smart home automation, IoT integration, security systems, and how technology is making homes more efficient and connected.",
    location: "Berlin, Germany",
    tags: ["Smart Home", "IoT", "Automation", "Technology"],
    views: 1600,
    likes: 370,
    comments: [{ user: "Sophia", comment: "Very helpful overview!", date: "May 16, 2025" }],
    videoUrl: "https://example.com/smarthome-video.mp4",
    gallery: ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop"]
  }
  ];

  const filteredItems = mediaItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Media</h1>
          <a href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
            See more
            <ArrowRight size={20} />
          </a>
        </div>

        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <p className="mt-3 text-sm text-gray-600">
            Found {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'}
          </p>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <Link to={`/media/${item.id}`}>
              <MediaCard
                key={index}
                image={item.image}
                date={item.date}
                title={item.title}
                category={item.category}
              />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
            <p className="text-gray-500">Try searching with different keywords</p>
          </div>
        )}
      </div>
    </div>
  );
}