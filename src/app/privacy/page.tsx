"use client";
import { ShieldCheck, AlertTriangle } from "lucide-react";
import GenAIHelp from "../../components/GenAIHelp";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Privacy & Misinformation Truth-Checker</h1>
        <p className="text-xl text-gray-600">Your data is secured by the Digital Personal Data Protection (DPDP) Act.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-green-50 border border-green-100 p-8 rounded-2xl">
          <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">How We Protect Your Data</h2>
          <ul className="space-y-3 text-gray-700">
            <li>✓ End-to-end encryption for all census submissions.</li>
            <li>✓ Data is aggregated and anonymized for policy making.</li>
            <li>✓ Strict adherence to the DPDP Act 2023.</li>
            <li>✓ No data sharing with third-party advertising agencies.</li>
          </ul>
        </div>

        <div className="bg-red-50 border border-red-100 p-8 rounded-2xl">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Busting Common Myths</h2>
          <ul className="space-y-4 text-gray-700">
            <li>
              <strong>Myth:</strong> The census is linked to my bank account.<br/>
              <strong>Fact:</strong> The census does NOT collect financial records or bank details.
            </li>
            <li>
              <strong>Myth:</strong> If I miss the date, I get fined immediately.<br/>
              <strong>Fact:</strong> The self-enumeration period is flexible, followed by door-to-door surveys.
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
        <h3 className="text-xl font-bold mb-4">Have a rumor to check?</h3>
        <p className="text-gray-600 mb-6">Ask our AI Assistant to verify any information you have heard on social media.</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition" onClick={() => alert("Open AI Help from bottom right!")}>
          Open AI Truth Checker
        </button>
      </div>

      <GenAIHelp context="data privacy, DPDP act, and misinformation" />
    </div>
  );
}
