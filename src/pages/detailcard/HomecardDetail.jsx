import { useParams, useNavigate } from 'react-router-dom';
import { jobs } from './homedata';
import { MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = jobs.find((item) => item.id === Number(id));
  if (!job)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Job not found
      </div>
    );

  return (
    <div>
      {/* Top Banner */}
      <div className="w-full h-[100px] bg-blue-50"></div>

      {/* Main Content */}
      <div className="bg-gray-50 p-6">
        <div className="flex h-[80vh]  p-3 flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">

          {/* Left - Image (Centered & Cover) */}
          <div className="md:w-1/2 relative h-64 md:h-auto">
            <img
              src={job.image}
              alt={job.title}
              className="absolute inset-0 w-full h-full object-cover rounded-l-xl"
            />
          </div>

          {/* Right - Info */}
          <div className="md:w-1/2 p-6 h-full flex flex-col gap-4 overflow-y-auto">
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <h2 className="text-xl text-gray-700">{job.company}</h2>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Job Details */}
            <div className="grid grid-cols-2 gap-4 text-gray-700 mt-2">
              <div className="flex items-center gap-2">
                <MapPin size={16} /> {job.location}
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={16} /> {job.salary}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={16} /> {job.experience}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} /> {job.jobType}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mt-4">Job Description</h3>
              <p className="text-gray-600 mt-1">{job.description}</p>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-lg font-semibold mt-4">Requirements</h3>
              <ul className="list-disc list-inside text-gray-600 mt-1 space-y-1">
                {job.requirements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg font-semibold mt-4">Benefits</h3>
              <ul className="list-disc list-inside text-gray-600 mt-1 space-y-1">
                {job.benefits.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Responsibilities (At Bottom) */}
            <div>
              <h3 className="text-lg font-semibold mt-4">Responsibilities</h3>
              <ul className="list-disc list-inside text-gray-600 mt-1 space-y-1">
                {job.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
