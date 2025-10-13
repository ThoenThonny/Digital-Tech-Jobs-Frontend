import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Search, MapPin, Building2, Briefcase, Zap, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Optionlevel() {
  const scrollRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const jobLevels = [
    { titleKh: 'ការងារមិនត្រូវការបទពិសោធន៍', titleEn: 'Internship', count: 15, icon: Briefcase },
    { titleKh: 'ការងារត្រូវការបទពិសោធន៍តិចតួច', titleEn: 'Junior Level', count: 15, icon: Zap },
    { titleKh: 'ការងារមិនត្រូវការបទពិសោធន៍មធ្យម', titleEn: 'Medium Level', count: 15, icon: TrendingUp },
    { titleKh: 'ការងារមិនត្រូវការបទពិសោធន៍ខ្ពស់', titleEn: 'Senior Level', count: 15, icon: Award },
  ];

  const jobs = [
    // IT Jobs
    { id: 1, image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop', tags: ['Flutter', 'Postgres', 'REST'], title: 'Mobile Developer', company: 'Tech Corp', location: 'Phnom Penh', category: 'IT' },
    { id: 2, image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop', tags: ['Software', 'IT'], title: 'Software Engineer', company: 'Digital Solutions', location: 'Remote', category: 'IT' },
    { id: 3, image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop', tags: ['JSON', 'API'], title: 'Backend Developer', company: 'StartUp Inc', location: 'Phnom Penh', category: 'IT' },
    { id: 4, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop', tags: ['Postgres', 'MongoDB'], title: 'Database Admin', company: 'Data Systems', location: 'Siem Reap', category: 'IT' },
    { id: 5, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop', tags: ['React', 'UI/UX'], title: 'Frontend Developer', company: 'Creative Agency', location: 'Phnom Penh', category: 'IT' },
    { id: 6, image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop', tags: ['DevOps', 'AWS'], title: 'Cloud Engineer', company: 'Cloud Services', location: 'Remote', category: 'IT' },
    { id: 7, image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop', tags: ['Python', 'Django'], title: 'Full Stack Developer', company: 'Web Solutions', location: 'Phnom Penh', category: 'IT' },
    { id: 8, image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop', tags: ['Java', 'Spring'], title: 'Java Developer', company: 'Enterprise Corp', location: 'Remote', category: 'IT' },
    { id: 9, image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop', tags: ['JavaScript', 'Node.js'], title: 'Node.js Developer', company: 'StartUp Hub', location: 'Phnom Penh', category: 'IT' },
    { id: 10, image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop', tags: ['DevOps', 'Docker'], title: 'DevOps Engineer', company: 'Tech Infrastructure', location: 'Remote', category: 'IT' },
    { id: 11, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop', tags: ['PHP', 'Laravel'], title: 'Laravel Developer', company: 'Web Agency', location: 'Phnom Penh', category: 'IT' },
    { id: 12, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop', tags: ['Data Science', 'ML'], title: 'Data Scientist', company: 'AI Labs', location: 'Remote', category: 'IT' },
    { id: 13, image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop', tags: ['QA', 'Testing'], title: 'QA Engineer', company: 'Quality Assurance', location: 'Phnom Penh', category: 'IT' },
    { id: 14, image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop', tags: ['Kubernetes', 'CI/CD'], title: 'Site Reliability Engineer', company: 'Cloud Operations', location: 'Remote', category: 'IT' },
    { id: 15, image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop', tags: ['API', 'REST'], title: 'API Developer', company: 'Integration Solutions', location: 'Phnom Penh', category: 'IT' },

    // Marketing Jobs
    { id: 16, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop', tags: ['Digital', 'SEO'], title: 'Digital Marketing Manager', company: 'Marketing Pro', location: 'Phnom Penh', category: 'Marketing' },
    { id: 17, image: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=300&fit=crop', tags: ['Social Media', 'Content'], title: 'Social Media Manager', company: 'Brand Agency', location: 'Remote', category: 'Marketing' },
    { id: 18, image: 'https://images.unsplash.com/photo-1455849318169-8d3cb32ba205?w=400&h=300&fit=crop', tags: ['Content', 'Writing'], title: 'Content Creator', company: 'Media House', location: 'Phnom Penh', category: 'Marketing' },
    { id: 19, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', tags: ['Analytics', 'Data'], title: 'Marketing Analyst', company: 'Data Insights', location: 'Remote', category: 'Marketing' },
    { id: 20, image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop', tags: ['Email', 'Automation'], title: 'Email Marketing Specialist', company: 'CRM Solutions', location: 'Phnom Penh', category: 'Marketing' },
    { id: 21, image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop', tags: ['Brand', 'Strategy'], title: 'Brand Strategist', company: 'Creative Studio', location: 'Remote', category: 'Marketing' },
    { id: 22, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop', tags: ['PPC', 'Ads'], title: 'PPC Specialist', company: 'Ad Agency', location: 'Phnom Penh', category: 'Marketing' },
    { id: 23, image: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=300&fit=crop', tags: ['Influencer', 'Marketing'], title: 'Influencer Manager', company: 'Marketing Firm', location: 'Remote', category: 'Marketing' },
    { id: 24, image: 'https://images.unsplash.com/photo-1455849318169-8d3cb32ba205?w=400&h=300&fit=crop', tags: ['SEO', 'SEM'], title: 'SEO Specialist', company: 'Digital Agency', location: 'Phnom Penh', category: 'Marketing' },
    { id: 25, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', tags: ['Video', 'Production'], title: 'Video Marketing Producer', company: 'Production House', location: 'Remote', category: 'Marketing' },
    { id: 26, image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop', tags: ['Community', 'Management'], title: 'Community Manager', company: 'Social Platforms', location: 'Phnom Penh', category: 'Marketing' },
    { id: 27, image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop', tags: ['Growth', 'Marketing'], title: 'Growth Marketing Manager', company: 'Tech Startup', location: 'Remote', category: 'Marketing' },
    { id: 28, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop', tags: ['Event', 'Marketing'], title: 'Event Marketing Coordinator', company: 'Events Plus', location: 'Phnom Penh', category: 'Marketing' },
    { id: 29, image: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=300&fit=crop', tags: ['PR', 'Communications'], title: 'PR Specialist', company: 'PR Agency', location: 'Remote', category: 'Marketing' },
    { id: 30, image: 'https://images.unsplash.com/photo-1455849318169-8d3cb32ba205?w=400&h=300&fit=crop', tags: ['Marketing', 'Operations'], title: 'Marketing Operations Manager', company: 'Corporate Marketing', location: 'Phnom Penh', category: 'Marketing' },

    // Design Jobs
    { id: 31, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop', tags: ['UI', 'UX'], title: 'UI/UX Designer', company: 'Design Studio', location: 'Phnom Penh', category: 'Design' },
    { id: 32, image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&h=300&fit=crop', tags: ['Graphic', 'Design'], title: 'Graphic Designer', company: 'Creative Agency', location: 'Remote', category: 'Design' },
    { id: 33, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop', tags: ['Web', 'Design'], title: 'Web Designer', company: 'Web Studio', location: 'Phnom Penh', category: 'Design' },
    { id: 34, image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&h=300&fit=crop', tags: ['Motion', 'Graphics'], title: 'Motion Graphics Designer', company: 'Animation Studio', location: 'Remote', category: 'Design' },
    { id: 35, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop', tags: ['Product', 'Design'], title: 'Product Designer', company: 'Tech Company', location: 'Phnom Penh', category: 'Design' },
    { id: 36, image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&h=300&fit=crop', tags: ['Brand', 'Design'], title: 'Brand Designer', company: 'Branding Firm', location: 'Remote', category: 'Design' },
    { id: 37, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop', tags: ['3D', 'Design'], title: '3D Designer', company: '3D Studio', location: 'Phnom Penh', category: 'Design' },
    { id: 38, image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&h=300&fit=crop', tags: ['Illustration', 'Art'], title: 'Illustrator', company: 'Art Studio', location: 'Remote', category: 'Design' },
    { id: 39, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop', tags: ['Interaction', 'Design'], title: 'Interaction Designer', company: 'Digital Agency', location: 'Phnom Penh', category: 'Design' },
    { id: 40, image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&h=300&fit=crop', tags: ['Experience', 'Design'], title: 'Experience Designer', company: 'UX Firm', location: 'Remote', category: 'Design' },
    { id: 41, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop', tags: ['Print', 'Design'], title: 'Print Designer', company: 'Printing Company', location: 'Phnom Penh', category: 'Design' },
    { id: 42, image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&h=300&fit=crop', tags: ['Fashion', 'Design'], title: 'Fashion Designer', company: 'Fashion House', location: 'Remote', category: 'Design' },
    { id: 43, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop', tags: ['Game', 'Design'], title: 'Game Designer', company: 'Game Studio', location: 'Phnom Penh', category: 'Design' },
    { id: 44, image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&h=300&fit=crop', tags: ['Packaging', 'Design'], title: 'Packaging Designer', company: 'Design Studio', location: 'Remote', category: 'Design' },
    { id: 45, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop', tags: ['Design', 'Lead'], title: 'Design Lead', company: 'Creative Studio', location: 'Phnom Penh', category: 'Design' },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = activeCategory === 'all' || job.category === activeCategory;
    const matchesSearch = !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Find Your Dream Job</h1>
          <p className="text-gray-600 text-lg">Explore opportunities across all experience levels</p>
        </div>

        {/* Job Level Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {jobLevels.map((level, i) => {
            const IconComponent = level.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-300 hover:-translate-y-1"
              >
                <div className="mb-3 text-center flex justify-center">
                  <IconComponent className="w-12 h-12 text-black" />
                </div>
                <p className="text-sm font-medium text-gray-800 mb-1 text-center">{level.titleKh}</p>
                <p className="text-xs text-gray-500 mb-3 text-center">{level.titleEn}</p>
                <div className="flex items-baseline gap-1 justify-center">
                  <p className="text-3xl font-bold text-blue-600">{level.count}</p>
                  <p className="text-sm text-gray-500">positions</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
            <input
              type="text"
              placeholder="Search by job title, skills, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {['all', 'IT', 'Marketing', 'Design'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                }`}
            >
              {cat === 'all' ? 'All Jobs' : cat}
            </button>
          ))}
        </div>

        {/* Jobs Section with Scroll */}
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Jobs</h2>
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all border border-gray-200 hover:bg-gray-50"
              >
                <ChevronLeft className="w-5 h-5 text-black" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all border border-gray-200 hover:bg-gray-50"
              >
                <ChevronRight className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>

          {/* Scrollable Jobs Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <div
                  key={job.id}
                  className="min-w-[320px] bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex-shrink-0 overflow-hidden border border-gray-100 hover:border-blue-300 cursor-pointer snap-start group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={job.image}
                      alt={job.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-semibold text-blue-600 shadow-md">
                      New
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Building2 className="w-4 h-4 text-black" />
                      <span>{job.company}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <MapPin className="w-4 h-4 text-black" />
                      <span>{job.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link to={`/allcard/${job.id}`}>
                      <button className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                        View Details
                      </button>
                    </Link>

                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center py-12">
                <p className="text-gray-500 text-lg">No jobs found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        {/* View All Button */}
        <Link to={'/alldetail'}>
          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors font-medium shadow-lg hover:shadow-xl">
              View All Jobs
            </button>
          </div>
        </Link>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}