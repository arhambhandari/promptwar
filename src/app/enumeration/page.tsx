"use client";
import { useState } from "react";
import GenAIHelp from "../../components/GenAIHelp";
import { useLanguage } from "../../context/LanguageContext";
import { CheckCircle2, ChevronRight, Mic, Volume2, VolumeX, User, Home as HomeIcon, ShieldCheck, Lock, Eye } from "lucide-react";
import Link from "next/link";
import { indiaLocations } from "../../data/locations";

export default function EnumerationPage() {
  const { lang, t } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ enrollment_date: new Date().toISOString().split("T")[0], name: "", dob: "", gender: "", religion: "", literacy: "", address: "", state: "", district: "", city: "", members: 1 });
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Native Browser Text-to-Speech
  const speak = (text: string, forcePlay: boolean = false) => {
    if (typeof window !== "undefined" && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isMuted && !forcePlay) return;

      const utterance = new SpeechSynthesisUtterance(text);
      
      const langMap: Record<string, string> = {
        en: 'en-IN', hi: 'hi-IN', bn: 'bn-IN', te: 'te-IN', mr: 'mr-IN', ta: 'ta-IN', ur: 'ur-IN',
        gu: 'gu-IN', kn: 'kn-IN', ml: 'ml-IN', or: 'or-IN', pa: 'pa-IN', as: 'as-IN', ne: 'ne-NP',
        si: 'si-LK'
      };
      
      // Fallback to {lang}-IN if not explicitly mapped
      const targetLang = langMap[lang] || `${lang}-IN`;
      utterance.lang = targetLang;
      
      // Explicitly find a matching voice (fixes Mac Safari/Chrome ignoring .lang)
      const voices = window.speechSynthesis.getVoices();
      const matchedVoice = voices.find(v => v.lang.startsWith(targetLang.split('-')[0]));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
      
      utterance.rate = 1.15; // Faster, more upbeat and energetic
      utterance.pitch = 1.3; // Higher pitch for a more helpful, enthusiastic tone
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceInput = (field: string) => {
    setIsListening(true);
    speak(t("listening"));
    
    // Mocking speech recognition for the prototype
    setTimeout(() => {
      setIsListening(false);
      if (field === "name") setFormData(prev => ({ ...prev, name: "Rahul Kumar" }));
      if (field === "address") {
        setFormData(prev => ({ 
          ...prev, 
          address: "123, MG Road",
          city: "Mumbai",
          district: "Mumbai Suburban",
          state: "Maharashtra"
        }));
      }
      speak(t("speech_submitted"));
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl font-body-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline-lg font-bold text-primary mb-4">{t("enum_title")}</h1>
        <button 
          onClick={() => {
            if (isMuted) {
              setIsMuted(false);
              // Small delay to ensure state updates before speaking
              setTimeout(() => {
                speak(t("speech_welcome"), true);
              }, 50);
            } else {
              setIsMuted(true);
              if (typeof window !== "undefined" && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
            }
          }}
          aria-label={isMuted ? "Turn on voice assistant" : "Turn off voice assistant"}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-label-md transition cursor-pointer ${
            isMuted ? 'bg-surface-variant text-on-surface-variant hover:bg-surface-variant/80' : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
          }`}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />} 
          {isMuted ? t("Voice Assistant: Off") : t("tap_hear")}
        </button>
      </div>
      
      {/* Visual Stepper */}
      {step < 4 && (
        <div className="flex justify-between items-center mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center relative z-10">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold border-4 
                ${step >= s ? 'bg-secondary text-on-secondary border-secondary' : 'bg-surface border-outline-variant text-on-surface-variant'}`}>
                {step > s ? <CheckCircle2 size={28} /> : 
                 s === 1 ? <User size={24}/> : 
                 s === 2 ? <HomeIcon size={24}/> : "3"}
              </div>
            </div>
          ))}
          {/* Line behind stepper */}
          <div className="absolute left-0 top-7 w-full h-1 bg-outline-variant/30 -z-10 hidden md:block"></div>
        </div>
      )}

      {/* Privacy Notice Banner */}
      <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 text-sm text-green-800">
        <ShieldCheck size={20} className="flex-shrink-0" />
        <span>Your data is protected under the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>. All submissions are encrypted and anonymized.</span>
      </div>

      {/* Form Steps */}
      <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-lg border border-surface-variant relative overflow-hidden">
        {isListening && (
          <div className="absolute inset-0 bg-primary/90 flex flex-col items-center justify-center z-50 text-white animate-pulse">
            <Mic size={64} className="mb-4 text-secondary-fixed" />
            <h2 className="text-2xl font-headline-md">{t("listening")}</h2>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-headline-md font-bold text-primary">{t("personal_details")}</h2>
              <button onClick={() => speak(t("speech_name"))} className="text-secondary" aria-label="Read instructions out loud"><Volume2 size={28}/></button>
            </div>
            
                        <div className="relative">
              <label className="block text-lg font-label-md text-on-surface-variant mb-2">{t("enrollment_date")}</label>
              <input type="date" className="w-full border-2 border-outline-variant rounded-xl p-4 text-lg outline-none focus:border-secondary bg-surface-container-lowest" value={formData.enrollment_date} onChange={e => setFormData({...formData, enrollment_date: e.target.value})} />
            </div>

            <div className="relative">
              <label className="block text-lg font-label-md text-on-surface-variant mb-2">{t("full_name")}</label>
              <div className="flex gap-2">
                <input type="text" aria-label="Full Name" className="w-full border-2 border-outline-variant rounded-xl p-4 text-lg outline-none focus:border-secondary" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Rahul Kumar" />
                <button onClick={() => handleVoiceInput("name")} className="bg-secondary text-white p-4 rounded-xl hover:bg-secondary/90 transition flex-shrink-0" aria-label="Start voice input">
                  <Mic size={24} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-lg font-label-md text-on-surface-variant mb-2">{t("dob")}</label>
              <input type="date" className="w-full border-2 border-outline-variant rounded-xl p-4 text-lg outline-none focus:border-secondary" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-lg font-label-md text-on-surface-variant mb-2">{t("gender")}</label>
                <select className="w-full border-2 border-outline-variant rounded-xl p-4 text-lg outline-none focus:border-secondary bg-white" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                  <option value="">{t("select_gender")}</option>
                  <option value="Male">{t("male")}</option>
                  <option value="Female">{t("female")}</option>
                  <option value="Transgender">{t("transgender")}</option>
                </select>
              </div>
              <div>
                <label className="block text-lg font-label-md text-on-surface-variant mb-2">{t("religion")}</label>
                <select className="w-full border-2 border-outline-variant rounded-xl p-4 text-lg outline-none focus:border-secondary bg-white" value={formData.religion} onChange={e => setFormData({...formData, religion: e.target.value})}>
                  <option value="">{t("select_religion")}</option>
                  <option value="Hinduism">{t("hinduism")}</option>
                  <option value="Islam">{t("islam")}</option>
                  <option value="Christianity">{t("christianity")}</option>
                  <option value="Sikhism">{t("sikhism")}</option>
                  <option value="Buddhism">{t("buddhism")}</option>
                  <option value="Jainism">{t("jainism")}</option>
                  <option value="Other">{t("other")}</option>
                </select>
              </div>
              <div>
                <label className="block text-lg font-label-md text-on-surface-variant mb-2">{t("literacy")}</label>
                <select className="w-full border-2 border-outline-variant rounded-xl p-4 text-lg outline-none focus:border-secondary bg-white" value={formData.literacy} onChange={e => setFormData({...formData, literacy: e.target.value})}>
                  <option value="">{t("select_literacy")}</option>
                  <option value="Literate">{t("literate")}</option>
                  <option value="Illiterate">{t("illiterate")}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-headline-md font-bold text-primary">{t("household_details")}</h2>
              <button onClick={() => speak(t("speech_address"))} className="text-secondary" aria-label="Read instructions out loud"><Volume2 size={28}/></button>
            </div>
            
            <div className="relative">
              <label className="block text-lg font-label-md text-on-surface-variant mb-2">{t("address")}</label>
              <div className="flex gap-2">
                <textarea className="w-full border-2 border-outline-variant rounded-xl p-4 text-lg outline-none focus:border-secondary" rows={2} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="e.g. 123 MG Road..."></textarea>
                <button onClick={() => handleVoiceInput("address")} className="bg-secondary text-white p-4 rounded-xl hover:bg-secondary/90 transition flex-shrink-0 h-16" aria-label="Start voice input">
                  <Mic size={24} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-lg font-label-md text-on-surface-variant mb-2">{t("state")}</label>
                <select 
                  aria-label="Select"
                  className="w-full border-2 border-outline-variant rounded-xl p-4 text-lg outline-none focus:border-secondary bg-white" 
                  value={formData.state} 
                  onChange={e => setFormData({...formData, state: e.target.value, district: "", city: ""})}
                >
                  <option value="">{t("select_state")}</option>
                  {Object.keys(indiaLocations).sort().map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-lg font-label-md text-on-surface-variant mb-2">{t("district")}</label>
                <select 
                  className="w-full border-2 border-outline-variant rounded-xl p-4 text-lg outline-none focus:border-secondary bg-white disabled:opacity-50" 
                  value={formData.district} 
                  onChange={e => setFormData({...formData, district: e.target.value, city: ""})}
                  disabled={!formData.state}
                >
                  <option value="">{t("select_district")}</option>
                  {formData.state && indiaLocations[formData.state] && Object.keys(indiaLocations[formData.state]).sort().map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-lg font-label-md text-on-surface-variant mb-2">{t("city_town")}</label>
                <select 
                  className="w-full border-2 border-outline-variant rounded-xl p-4 text-lg outline-none focus:border-secondary bg-white disabled:opacity-50" 
                  value={formData.city} 
                  onChange={e => setFormData({...formData, city: e.target.value})}
                  disabled={!formData.district}
                >
                  <option value="">{t("select_city")}</option>
                  {formData.state && formData.district && indiaLocations[formData.state]?.[formData.district]?.sort().map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-lg font-label-md text-on-surface-variant mb-2">{t("members")}</label>
              <div className="flex items-center gap-4">
                <button onClick={() => setFormData(p => ({...p, members: Math.max(1, p.members - 1)}))} className="w-14 h-14 bg-surface-container rounded-full text-2xl font-bold hover:bg-surface-variant" aria-label="Decrease members">-</button>
                <span className="text-3xl font-bold text-primary w-8 text-center">{formData.members}</span>
                <button onClick={() => setFormData(p => ({...p, members: p.members + 1}))} className="w-14 h-14 bg-surface-container rounded-full text-2xl font-bold hover:bg-surface-variant" aria-label="Increase members">+</button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-headline-md font-bold text-primary">{t("review_submit")}</h2>
                        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant space-y-4 text-lg">
              <p><strong>{t("enrollment_date")}:</strong> {formData.enrollment_date}</p>
              <p><strong>{t("name")}:</strong> {formData.name || 'Not provided'}</p>
              <p><strong>{t("dob")}:</strong> {formData.dob || 'Not provided'}</p>
              <p><strong>{t("gender")}:</strong> {formData.gender ? t(formData.gender.toLowerCase()) : 'Not provided'}</p>
              <p><strong>{t("religion")}:</strong> {formData.religion ? t(formData.religion.toLowerCase()) : 'Not provided'}</p>
              <p><strong>{t("literacy")}:</strong> {formData.literacy ? t(formData.literacy.toLowerCase()) : 'Not provided'}</p>
              <p><strong>{t("address")}:</strong> {formData.address || 'Not provided'}</p>
              <p><strong>{t("state")}:</strong> {formData.state || 'Not provided'}</p>
              <p><strong>{t("district")}:</strong> {formData.district || 'Not provided'}</p>
              <p><strong>{t("city_town")}:</strong> {formData.city || 'Not provided'}</p>
              <p><strong>{t("total_members")}:</strong> {formData.members}</p>
            </div>

            {/* Privacy Consent */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1 w-5 h-5 accent-primary" required />
                <span className="text-sm text-blue-900">
                  I consent to the collection of my data for Census 2027 purposes only, as governed by the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>. I understand my data will be encrypted, anonymized, and used solely for national statistical purposes.
                </span>
              </label>
            </div>

            {/* Privacy Guarantee Badges */}
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center gap-2 bg-green-50 text-green-800 px-4 py-2 rounded-full text-xs font-medium border border-green-200">
                <Lock size={14} /> End-to-End Encrypted
              </div>
              <div className="flex items-center gap-2 bg-green-50 text-green-800 px-4 py-2 rounded-full text-xs font-medium border border-green-200">
                <Eye size={14} /> Anonymized for Analysis
              </div>
              <div className="flex items-center gap-2 bg-green-50 text-green-800 px-4 py-2 rounded-full text-xs font-medium border border-green-200">
                <ShieldCheck size={14} /> No Third-Party Sharing
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-12 space-y-6">
            <div className="w-24 h-24 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={64} />
            </div>
            <h2 className="text-4xl font-headline-lg font-bold text-primary">{t("success_title")}</h2>
            <p className="text-xl text-on-surface-variant max-w-lg mx-auto">
              {t("success_message")}
            </p>
            <div className="pt-8">
              <Link href="/dashboard" className="inline-flex bg-primary text-on-primary px-8 py-4 rounded-xl font-label-md text-lg hover:opacity-90 transition shadow-md">
                {t("go_dashboard")}
              </Link>
            </div>
          </div>
        )}

        {step < 4 && (
          <div className="mt-12 flex justify-between gap-4">
            {step > 1 ? (
              <button onClick={() => { setStep(step - 1); speak(t("speech_back")); }} className="px-8 py-4 rounded-xl font-label-md text-lg text-on-surface-variant hover:bg-surface-container transition w-1/3 border border-outline-variant">
                {t("back")}
              </button>
            ) : <div className="w-1/3"></div>}
            
            {step < 3 ? (
              <button onClick={() => { setStep(step + 1); speak(t("speech_next")); }} className="bg-primary text-on-primary px-8 py-4 rounded-xl font-label-md text-lg hover:opacity-90 transition flex items-center justify-center gap-2 flex-1 shadow-md">
                {t("continue")} <ChevronRight size={24} />
              </button>
            ) : (
              <button onClick={() => { speak(t("success_title")); setStep(4); }} className="bg-secondary text-on-secondary px-8 py-4 rounded-xl font-label-md text-lg hover:opacity-90 transition flex-1 shadow-md">
                {t("submit")}
              </button>
            )}
          </div>
        )}
      </div>

      <GenAIHelp context="self-enumeration process" />
    </div>
  );
}
