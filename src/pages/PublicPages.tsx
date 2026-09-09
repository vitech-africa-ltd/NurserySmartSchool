import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { schoolSettings, classes, teachers, events, learningAreas } from '../data/demo';
import { ArrowRight, Check, Sparkles, Calendar } from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-12 pb-20 lg:pt-20 lg:pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-50 animate-float"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-yellow-100 rounded-full opacity-50 animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeIn">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Sparkles size={14} />
                <span>Premium Nursery School in Kigali</span>
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Where Every Child{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Learns, Plays
                </span>{' '}
                and{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                  Grows
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                A quality early childhood education in Kigali, in a safe, stimulating, and nurturing environment.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button onClick={() => navigate('/apply')} className="gradient-primary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all flex items-center gap-2">
                  Apply for Admission <ArrowRight size={18} />
                </button>
                <button onClick={() => navigate('/contact')} className="bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all">
                  Book a Visit
                </button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-8xl mb-4">🏫</div>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      {['📚', '🎨', '🎵', '🌈', '🧩', '🌟', '🎪', '🦋', '🌻'].map((e, i) => (
                        <div key={i} className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">
                          {e}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Why Parents Choose Us</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">We provide a holistic early childhood education experience.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🛡️', title: 'Safe Environment', desc: 'Secure campus with trained staff and strict child protection policies.' },
              { icon: '👩‍🏫', title: 'Qualified Teachers', desc: 'Experienced, passionate educators trained in early childhood development.' },
              { icon: '🎨', title: 'Play-Based Learning', desc: 'Learning through play, creativity, and discovery.' },
              { icon: '🌍', title: 'Rwanda-Aligned', desc: 'Curriculum aligned with Rwanda ECD framework.' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Our Classes</h2>
            <p className="mt-4 text-gray-600">Age-appropriate learning environments for each stage of development.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {classes.map((cls, i) => {
              const teacher = teachers.find(t => t.id === cls.teacherId);
              const colors = ['from-blue-400 to-blue-600', 'from-green-400 to-green-600', 'from-purple-400 to-purple-600'];
              const emojis = ['🌟', '🌈', '⭐'];
              return (
                <div key={cls.id} className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className={`h-32 bg-gradient-to-br ${colors[i]} flex items-center justify-center`}>
                    <span className="text-5xl">{emojis[i]}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{cls.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{cls.room}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>👩‍🏫 {teacher?.firstName} {teacher?.lastName}</p>
                      <p>👶 {cls.childrenCount}/{cls.maxCapacity} children</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Give Your Child the Best Start?</h2>
          <p className="text-blue-100 text-lg mb-8">Join our community of families who believe in nurturing every child's potential.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate('/apply')} className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
              Apply Now
            </button>
            <button onClick={() => navigate('/contact')} className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all">
              Book a Visit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">About Our School</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Dedicated to providing quality early childhood education in Kigali since 2019.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">👁️ Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">To be the leading nursery school in Rwanda, where every child develops holistically in a safe, nurturing environment.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">To provide quality, play-based early childhood education that nurtures cognitive, social, emotional, and physical development.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClassesPage() {
  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Classes</h1>
          <p className="text-gray-600">Age-appropriate learning environments for each stage of development.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {classes.map((cls, i) => {
            const teacher = teachers.find(t => t.id === cls.teacherId);
            const assistant = teachers.find(t => t.id === cls.assistantId);
            const colors = ['from-blue-400 to-blue-600', 'from-green-400 to-green-600', 'from-purple-400 to-purple-600'];
            const emojis = ['🌟', '🌈', '⭐'];
            return (
              <div key={cls.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                <div className={`h-40 bg-gradient-to-br ${colors[i]} flex items-center justify-center`}>
                  <span className="text-6xl">{emojis[i]}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{cls.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{cls.room}</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-500">Lead Teacher:</span>
                      <span className="font-medium text-gray-900">{teacher?.firstName} {teacher?.lastName}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-500">Assistant:</span>
                      <span className="font-medium text-gray-900">{assistant?.firstName} {assistant?.lastName}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-500">Capacity:</span>
                      <span className="font-medium text-gray-900">{cls.childrenCount}/{cls.maxCapacity} children</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600">We'd love to hear from you.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">📍</div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium text-gray-900">{schoolSettings.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">📞</div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{schoolSettings.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">✉️</div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{schoolSettings.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Book a School Visit</h3>
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h4>
                <p className="text-gray-600">We'll contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name</label>
                  <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" required placeholder="+250 7XX XXX XXX" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" />
                </div>
                <button type="submit" className="w-full gradient-primary text-white py-3 rounded-xl font-semibold">Book Visit</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdmissionsPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-12 rounded-2xl shadow-sm text-center max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-4">Your application number is:</p>
          <div className="bg-blue-50 text-blue-700 font-bold text-lg py-3 px-6 rounded-xl inline-block">APP-2024-009</div>
          <button onClick={() => { setSubmitted(false); setStep(1); }} className="mt-6 text-blue-600 font-medium hover:underline">Submit another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Apply for Admission</h1>
          <p className="text-gray-600">Complete the form below to apply.</p>
        </div>
        <div className="flex items-center justify-center mb-10">
          {[1, 2, 3, 4].map(s => (
            <React.Fragment key={s}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${s <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {s < step ? '✓' : s}
              </div>
              {s < 4 && <div className={`w-12 h-0.5 ${s < step ? 'bg-blue-600' : 'bg-gray-200'}`}></div>}
            </React.Fragment>
          ))}
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Child Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input type="date" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Parent Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" />
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Emergency Contact</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                <input type="tel" required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" />
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Review & Submit</h3>
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-sm text-blue-700">Please review all information before submitting.</p>
              </div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="mt-1" />
                <span className="text-sm text-gray-600">I confirm that all information provided is accurate and I agree to the school's terms and conditions.</span>
              </label>
            </div>
          )}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="px-6 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50">
                Previous
              </button>
            )}
            <div className="ml-auto">
              {step < 4 ? (
                <button onClick={() => setStep(step + 1)} className="px-6 py-2.5 gradient-primary text-white rounded-xl font-medium">
                  Next
                </button>
              ) : (
                <button onClick={() => setSubmitted(true)} className="px-6 py-2.5 gradient-primary text-white rounded-xl font-medium">
                  Submit Application
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
