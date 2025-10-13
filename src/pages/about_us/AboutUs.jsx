import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const PersonCard = ({ name, role, image, quote, description, email, phone, location, alignment }) => {
  return (
    <div
      className={`flex flex-col ${
        alignment === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } gap-8 items-start bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow relative`}
    >
      {/* Left Side */}
      <div className="w-full lg:w-1/3 flex-shrink-0 relative flex flex-col justify-center items-center">
        {/* ✨ Imagination Bubble Above Image */}
        <div
          className={`absolute ${
            alignment === 'right' ? 'lg:left-1/2 translate-x-1/2' : 'lg:right-1/2 -translate-x-1/2'
          } -top-20  from-blue-100 text-black  rounded-full shadow-2xl animate-float flex flex-col items-center justify-center w-28 h-28 lg:w-36 lg:h-36 z-20 border-[3px] border-white backdrop-blur-md`}
          style={{
            boxShadow:
              '0 0 25px rgba(147, 197, 253, 0.6), 0 0 50px rgba(236, 72, 153, 0.3)',
          }}
        >
          <div className="absolute inset-0 blur-3xl bg-gradient-to-br  opacity-30 rounded-full"></div>
         
          <p className="text-xl text-black italic font-bold text-center px-3 ">
            {quote}
          </p>
        </div>

        {/* Profile Image */}
        <img
          src={image}
          alt={name}
          className="w-full aspect-square object-cover rounded-lg transform hover:scale-105 transition-transform duration-300 mt-16"
        />
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-2/3 mt-12 lg:mt-0">
        <h3 className="text-4xl font-bold text-gray-900 mb-3">{name}</h3>
        <p className="text-xl text-gray-600 font-medium mb-6">{role}</p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">{description}</p>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-600 text-lg">
            <Mail size={20} className="flex-shrink-0" />
            <a href={`mailto:${email}`} className="hover:text-gray-900">
              {email}
            </a>
          </div>
          <div className="flex items-center gap-3 text-gray-600 text-lg">
            <Phone size={20} className="flex-shrink-0" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600 text-lg">
            <MapPin size={20} className="flex-shrink-0" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AboutUs() {
  const people = [
    {
      name: 'TO NY',
      role: 'Backend developer',
      image:
        '/public/photo1.jpg',
      quote:
        "អាណាខ្លាំងៗ​ ចូលមោ",
      description:
        " to ny កើតនៅក្នុងគ្រួសារក្រីក្រ តែមានបេះដូងសុទ្ធ និងក្តីសុបិន្តធំ។ នៅវ័យក្មេង គាត់ធ្លាប់ធ្វើអំពើមិនល្អ ដូចជាលួចមាន់ ឬទៅវៃគេ ដើម្បីបង្ហាញថាខ្លួនក្លាហាន ប៉ុន្តែចិត្តក្នុងគាត់នៅតែមានសេចក្តីស្រឡាញ់គ្រួសារ។ to nyចាប់ផ្តើមសិក្សាវិញ ដើម្បីសម្រេចសុបិន្តដែលម្តាយធ្លាប់សង្ឃឹម។ គាត់រៀនជំនាញកុំព្យូទ័រ និងការរចនាប្រព័ន្ធ ដោយធ្វើការថែមម៉ោង យកប្រាក់តិចតួចទៅជួយគ្រួសារ។ ទោះបីមានមនុស្សជាច្រើនមិនជឿថាគាត់អាចប្តូរបានក៏ដោយ ប៉ុន្តែរចនាបានបង្ហាញថា ពេលមនុស្សមានចិត្តខំប្រឹង អ្វីក៏អាចធ្វើបាន។ បន្ទាប់ពីឆ្នាំច្រើននៃការខំប្រឹង គាត់ក្លាយជាវិស្វកររចនាប្រព័ន្ធដែលមានកេរ្តិ៍ឈ្មោះល្បី និងជាមនុស្សមានសេចក្តីស្រឡាញ់។ រចនាមិនភ្លេចអតីតកាលទេ ប៉ុន្តែយកវាជាបទពិសោធន៍ដើម្បីបង្រៀនយុវជនថា “ជីវិតមិនដែលយឺតពេកសម្រាប់ការផ្លាស់ប្តូរ”។ គាត់បង្កើតមណ្ឌលបណ្ដុះបណ្ដាលឥតគិតថ្លៃ និងជួយកុមារតូចៗឲ្យសិក្សាជំនាញថ្មីៗ ដើម្បីមានអនាគតល្អជាងមុន។ ជីវិតរបស់រចនាបានក្លាយជាភស្តុតាងថា ការខំប្រឹង ការជឿជាក់លើខ្លួនឯង និងចិត្តល្អ អាចបំផ្លាញភាពងងឹតហើយបំភ្លឺជីវិតមនុស្សម្នាក់ឲ្យភ្លឺចាំងឡើងវិញ។",
      email: 'tony@gmail.com',
      phone: '+1 (555) 123-4567',
      location: 'phnom phenh',
      alignment: 'left',
    },
    {
      name: 'TING TONG',
      role: 'Frontend developer',
      image:
        '/public/photo.jpg',
      quote: 'ញុមអ្នកបង្កើតព្រះអាទិត្យ !',
      description:
        "គឹមតុងជាក្មេងស្រុកសាមញ្ញម្នាក់ ដែលកើតនៅក្នុងគ្រួសារដែលមិនមានទ្រព្យសម្បត្តិច្រើន ប៉ុន្តែពោរពេញដោយសេចក្តីស្រឡាញ់។ ពេលនៅវ័យក្មេង គាត់ធ្លាប់ជាមនុស្សស្ទាក់ស្ទើរ មិនសូវសូវរៀន និងចូលចិត្តលេងជាមួយមិត្តភក្តិដល់យប់។ ប៉ុន្តែម្តាយរបស់គាត់ជាមនុស្សម្នាក់ដែលជឿជាក់ថា កូនប្រុសរបស់នាងអាចក្លាយជាមនុស្សល្អបាន។ ចាប់តាំងពីថ្ងៃនោះមក គាត់ចាប់ផ្តើមរៀនយ៉ាងខំប្រឹង សូម្បីតែពេលយប់គាត់ក៏មិនសម្រាកទេ។ គឹមតុងបានចូលរៀនជំនាញអាជីពដែលគាត់ស្រឡាញ់ — ការរចនាក្រាហ្វិក និងបច្ចេកវិទ្យា។ គាត់រៀនតាម YouTube អានសៀវភៅ និងសាកល្បងធ្វើគំរូដោយខ្លួនឯង។ ពេលមិត្តភក្តិបើកសើចថា “អូយ គឹមតុង ឆ្កួតអីរៀនច្រើនណាស់” គាត់ក៏ទប់សំណើចហើយនិយាយថា “ថ្ងៃមួយ ខ្ញុំនឹងបង្ហាញឲ្យពួកគេឃើញថា ខ្ញុំអាចជោគជ័យបាន!”។បន្ទាប់ពីឆ្នាំជាច្រើននៃការខំប្រឹង គឹមតុងក្លាយជាអ្នករចនាដែលមានស្នាដៃល្បី នៅក្នុងក្រុមហ៊ុនបច្ចេកវិទ្យាមួយ។ គាត់ប្រើប្រាស់ជំនាញដែលរៀនបាន មិនត្រឹមតែសម្រាប់ខ្លួនឯងទេ ប៉ុន្តែដើម្បីបង្រៀនក្មេងជំនាន់ក្រោយឲ្យដឹងពីតម្លៃនៃការខំប្រឹង និងភាពស្មោះត្រង់។ ជីវិតគឹមតុងឥឡូវនេះពោរពេញដោយសុភមង្គល ការគោរពពីមនុស្សជុំវិញ និងជោគជ័យដែលបានមកពីសេចក្តីជឿ និងការខំប្រឹងមិនដាច់។ គាត់ជាភស្តុតាងថា មនុស្សមិនចាំបាច់មានកំណើតល្អទើបអាចជោគជ័យបានទេ តែត្រូវមានចិត្តដែលមិនទម្លាក់ទៅនឹងសុបិន្តរបស់ខ្លួន។",
      email: 'tingtong@gmail.com',
      phone: '+1 (555) 987-6543',
      location: 'phnom phenh',
      alignment: 'right',
    },
  ];

  return (
    <div>
       <div className="w-[100%] h-[200px] bg-blue-50">

                </div>
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the passionate individuals who bring creativity, innovation,
            and dedication to everything we do. We're not just colleagues, we're
            dreamers, makers, and problem solvers.
          </p>
        </div>

        <div className="space-y-20">
          {people.map((person, index) => (
            <PersonCard key={index} {...person} />
          ))}
        </div>

        <div className="mt-20 text-center bg-white rounded-lg shadow-md p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            We came together with a shared belief: that the best work happens
            when creativity meets strategy, and when passionate people
            collaborate to make ideas come to life. Every day, we challenge
            ourselves to think differently, work smarter, and create solutions
            that make a real difference.
          </p>
        </div>
      </div>
    </div>
    </div>

  );
}
