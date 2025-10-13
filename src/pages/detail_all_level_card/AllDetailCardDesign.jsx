import { useParams, useNavigate } from 'react-router-dom';
import { designJobs } from './Design'
import { MapPin } from 'lucide-react';

export default function AllDetailCardDesign() {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = designJobs.find((item) => item.id === Number(id));

  if (!job)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Job not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="w-full h-[100px] bg-blue-50 flex items-center justify-center text-white text-2xl font-bold">
        Job Details
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Back Button */}
       

        {/* Job Details Card */}
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Left - Image */}
          <div className="md:w-1/2 h-64 md:h-auto flex items-center justify-center bg-gray-100">
            <img
              src={job.image}
              alt={job.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Right - Information */}
          <div className="md:w-1/2 p-6 flex flex-col gap-4">
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

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-700 mt-2">
              <MapPin size={16} /> {job.location}
            </div>

            {/* Job Description */}
            <section>
              <h3 className="text-lg font-semibold mt-4">Job Description</h3>
              <p className="text-gray-600 mt-1">{job.description}</p>
            </section>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold mt-4">Requirements</h3>
                <ul className="list-disc list-inside text-gray-600 mt-1 space-y-1">
                  {job.requirements.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold mt-4">Responsibilities</h3>
                <ul className="list-disc list-inside text-gray-600 mt-1 space-y-1">
                  {job.responsibilities.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold mt-4">Benefits</h3>
                <ul className="list-disc list-inside text-gray-600 mt-1 space-y-1">
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
