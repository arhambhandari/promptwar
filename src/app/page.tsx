"use client";
import { useLanguage } from "../context/LanguageContext";
import GenAIHelp from "../components/GenAIHelp";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        <div className="mb-12 relative rounded-3xl overflow-hidden min-h-[350px] flex flex-col justify-center p-8 md:p-12 shadow-md">
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/census_logo_bg.png" 
              alt="Census 2027 Logo Background" 
              fill
              className="object-cover object-center opacity-40" 
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/80 to-transparent"></div>
          </div>
          
          {/* Text Content */}
          <div className="relative z-10 max-w-3xl">
            <h1 className="font-display-lg text-display-lg md:text-[64px] md:leading-[72px] text-primary mb-4 tracking-tight">
              {t("hero_title")}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              {t("hero_subtitle")}
            </p>
          </div>
        </div>

        {/* Bento Grid Dashboard Mockup */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Main Map Area */}
          <div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden flex flex-col shadow-sm">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">{t("story_map")}</h2>
              <div className="flex items-center gap-2 text-label-sm text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                {t("live_sync")}
              </div>
            </div>
            
            <div className="flex-grow bg-surface relative flex items-center justify-center p-8 overflow-hidden min-h-[400px]">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              
              {/* Map of India Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
                <Image 
                  src="/images/india_map_illustrated.png" 
                  alt="Illustrated Map of India" 
                  fill
                  className="object-contain"
                />
              </div>

              <div className="text-center z-10">
                 <Link href="/enumeration" className="font-label-md text-label-md bg-primary text-on-primary px-8 py-4 rounded-lg hover:opacity-90 transition-opacity text-xl shadow-lg">
                    {t("click_here")}
                </Link>
              </div>
            </div>
          </div>

          {/* Key Metrics Sidebar */}
          <div className="md:col-span-4 flex flex-col gap-gutter">
            <div className="bg-primary text-on-primary rounded-xl p-8 flex flex-col justify-between relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
              <div>
                <p className="font-label-md text-label-md text-primary-fixed-dim uppercase tracking-widest mb-2">{t("total_enumerated")}</p>
                <div className="font-display-lg text-[56px] leading-none mb-1">482M</div>
                <p className="font-body-md text-body-md text-inverse-primary/80">{t("citizens_recorded")}</p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-end">
                <div>
                  <div className="font-label-sm text-label-sm text-primary-fixed-dim mb-1">{t("target_completion")}</div>
                  <div className="font-headline-lg text-headline-lg">34.2%</div>
                </div>
                <span className="material-symbols-outlined text-4xl text-secondary-container">trending_up</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="font-label-md text-label-md text-on-surface-variant mb-1">{t("active_workers")}</p>
                  <div className="font-headline-lg text-headline-lg text-primary">2.1M</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-secondary-fixed/30 flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined" aria-hidden="true">group</span>
                </div>
              </div>
              <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary h-full w-[85%] rounded-full"></div>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-3">{t("deployed")}</p>
            </div>
          </div>
        </div>

        {/* Phase Explanation & State-wise Dates */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant">
            <h3 className="text-2xl font-bold text-primary mb-4">Census Phases Explained</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm">Phase 1</span>
                <div>
                  <strong>House Listing & Housing Census</strong>
                  <p className="text-gray-600 text-sm mt-1">Collecting data on housing conditions, amenities, and assets available to households.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-secondary/10 text-secondary font-bold px-3 py-1 rounded-full text-sm">Phase 2</span>
                <div>
                  <strong>Population Enumeration</strong>
                  <p className="text-gray-600 text-sm mt-1">The primary phase of demographic data collection including age, literacy, religion, and employment.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant">
            <h3 className="text-2xl font-bold text-primary mb-4">State-Wise Dates</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 text-gray-500 font-medium">State/UT</th>
                    <th className="py-2 text-gray-500 font-medium">Phase 1 Start</th>
                    <th className="py-2 text-gray-500 font-medium">Phase 2 Start</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-medium">Delhi & NCR</td>
                    <td className="py-3 text-gray-600">Apr 15, 2027</td>
                    <td className="py-3 text-gray-600">Feb 09, 2028</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-medium">Maharashtra</td>
                    <td className="py-3 text-gray-600">May 01, 2027</td>
                    <td className="py-3 text-gray-600">Feb 15, 2028</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Tamil Nadu</td>
                    <td className="py-3 text-gray-600">Jun 10, 2027</td>
                    <td className="py-3 text-gray-600">Mar 01, 2028</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
