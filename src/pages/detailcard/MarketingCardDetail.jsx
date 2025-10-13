import { useParams, useNavigate } from 'react-router-dom';
import { marketingJobs } from './maketingcardData'; // ✅ Make sure the filename matches exactly
import { MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';

export default function MarketingCardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  
  const job = marketingJobs.find((item) => item.id === Number(id));

  if (!job)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-700">
        Job not found 😢
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="w-full h-[100px] bg-blue-50 flex items-center justify-center text-white text-3xl font-bold shadow-md">
        Job Details
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Back Button */}
        

        {/* Job Details Card */}
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Left - Image */}
          <div className="md:w-1/2 h-64 md:h-auto bg-gray-100 flex items-center justify-center">
            <img
              src={job.image}
              alt={job.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Right - Information */}
          <div className="md:w-1/2 p-6 flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
            <h2 className="text-lg text-gray-600">{job.company}</h2>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-1">
              {job.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4 text-gray-700 mt-3">
              <div className="flex items-center gap-2">
                <MapPin size={18} /> <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={18} /> <span>{job.salary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={18} /> <span>{job.experience}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} /> <span>{job.jobType}</span>
              </div>
            </div>

            {/* Description */}
            <section className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Job Description
              </h3>
              <p className="text-gray-600 mt-2 leading-relaxed">
                {job.description}
              </p>
            </section>

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <section className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">Benefits</h3>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                  {job.benefits.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
