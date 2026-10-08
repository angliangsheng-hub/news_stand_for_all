import React, { useState } from 'react';
import { X, Check, Star, Users, Building, GraduationCap, ShieldCheck } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: string;
  onSelectPlan: (plan: string) => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  currentPlan,
  onSelectPlan,
}) => {
  const [selectedTier, setSelectedTier] = useState(currentPlan || 'weekly_special');
  const [activeTab, setActiveTab] = useState<'individual' | 'institutional'>('individual');
  const [confirmedMessage, setConfirmedMessage] = useState(false);

  if (!isOpen) return null;

  // Options directly from Miro Board Page 7
  const individualPlans = [
    {
      id: 'weekly_special',
      name: 'Weekly New User Special',
      badge: 'Limited 1-Hour Offer',
      price: '$1.99',
      period: 'first week, then $3.99/wk',
      description: 'Ideal for trying pro wire services and unlimited AI podcast generation.',
      features: [
        'Unrestricted Cross-Border Aggregators',
        'Daily Minute NotebookLM AI Audio Podcasting',
        'China Digital Times Censored Wire Monitor',
        'Unlimited Merlion Live Assistant queries',
      ],
      recommended: true,
    },
    {
      id: 'weekly_individual',
      name: 'Weekly Individual',
      badge: 'Flexible',
      price: '$3.99',
      period: 'per week',
      description: 'Full weekly pro access with no long-term commitment.',
      features: [
        'All Aggregator Feeds & RSS Connectors',
        'Full Singapore vs World Comparative Matrix',
        'AI Theme Clustering (Connect the Dots)',
        'Cancel anytime with 1-click',
      ],
      recommended: false,
    },
    {
      id: 'monthly_individual',
      name: 'Monthly Individual',
      badge: 'Most Popular',
      price: '$12.99',
      period: 'per month',
      description: 'Best value for professionals and daily news consumers.',
      features: [
        'Everything in Weekly Pro',
        'Audio Offline Sync & High-Bitrate Voice',
        'Full Archival Access & Custom Topic Alerts',
        'Ad-Free Pure Broadsheet Experience',
      ],
      recommended: false,
    },
    {
      id: 'monthly_family',
      name: 'Family Plan',
      badge: 'Up to 5 Members',
      price: '$19.99',
      period: 'per month',
      description: 'Shared multi-seat subscription for family households.',
      features: [
        'Up to 5 independent member profiles',
        'Individualized search memory & topics',
        'Shared family digest newsletter',
        'Parental safety filters for students',
      ],
      recommended: false,
    },
  ];

  // Revenue Streams from Miro Board Page 8
  const institutionalSegments = [
    {
      title: 'Schools & Universities',
      icon: GraduationCap,
      description: 'Campus-wide licenses for students and faculty analyzing international relations and media studies.',
      rate: 'Custom Academic Tier',
    },
    {
      title: 'Public Libraries & National Archives',
      icon: Building,
      description: 'Terminal kiosks and verified regional press archiving access with multi-language support.',
      rate: 'Public Domain Partnership',
    },
    {
      title: 'Business & Ministries',
      icon: ShieldCheck,
      description: 'Enterprise intelligence desks for corporate strategy teams and government policy analysts.',
      rate: 'Enterprise SLA & API Access',
    },
  ];

  const handleConfirm = () => {
    onSelectPlan(selectedTier);
    setConfirmedMessage(true);
    setTimeout(() => {
      setConfirmedMessage(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-stone-200 rounded-xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div>
            <h3 className="font-editorial text-2xl font-semibold text-stone-900">
              The News Dispatch Pro Tier
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Access pro versions of cross-border sources, deep dive audio & synthesis
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch: Individuals vs Institutions */}
        <div className="flex border-b border-stone-200 text-xs">
          <button
            onClick={() => setActiveTab('individual')}
            className={`pb-2.5 px-4 font-semibold tracking-wide transition-colors cursor-pointer border-b-2 ${
              activeTab === 'individual'
                ? 'border-blue-600 text-blue-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Individual & Family Plans
          </button>
          <button
            onClick={() => setActiveTab('institutional')}
            className={`pb-2.5 px-4 font-semibold tracking-wide transition-colors cursor-pointer border-b-2 ${
              activeTab === 'institutional'
                ? 'border-blue-600 text-blue-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Schools, Libraries & Ministries
          </button>
        </div>

        {activeTab === 'individual' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {individualPlans.map((plan) => {
                const isSelected = selectedTier === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedTier(plan.id)}
                    className={`p-4 rounded-lg border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-stone-900">{plan.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                          {plan.badge}
                        </span>
                      </div>

                      <div className="my-2">
                        <span className="text-2xl font-editorial font-bold text-stone-900">
                          {plan.price}
                        </span>
                        <span className="text-xs text-stone-500 ml-1.5">{plan.period}</span>
                      </div>

                      <p className="text-xs text-stone-500 mb-3 leading-relaxed">
                        {plan.description}
                      </p>

                      <ul className="space-y-1.5 text-[11px] text-stone-600">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100">
                      <div className="flex items-center gap-2 text-xs font-medium text-stone-800">
                        <input
                          type="radio"
                          name="plan"
                          checked={isSelected}
                          onChange={() => setSelectedTier(plan.id)}
                          className="text-blue-600"
                        />
                        <span>{isSelected ? 'Selected' : 'Choose Plan'}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Confirm CTA */}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-500">
                Cancel or modify anytime in your profile settings.
              </span>
              <button
                onClick={handleConfirm}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md shadow-xs transition-colors cursor-pointer"
              >
                {confirmedMessage ? 'Plan Activated! ✓' : 'Subscribe Now'}
              </button>
            </div>
          </div>
        ) : (
          /* Institutional / Schools / Ministries / Libraries View */
          <div className="space-y-4">
            <p className="text-xs text-stone-600 leading-relaxed">
              We provide tailored enterprise feeds, API keys, and group seats for educational institutions, public libraries, and government ministries.
            </p>
            <div className="space-y-3">
              {institutionalSegments.map((seg, i) => {
                const Icon = seg.icon;
                return (
                  <div key={i} className="p-3.5 rounded-lg border border-stone-200 bg-stone-50/60 flex items-start gap-3.5">
                    <div className="p-2 rounded bg-white border border-stone-200 text-stone-700 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif font-semibold text-xs text-stone-900">{seg.title}</h4>
                        <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          {seg.rate}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                        {seg.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pt-3 border-t border-stone-200 text-right">
              <button
                onClick={onClose}
                className="px-4 py-1.5 bg-stone-900 text-white rounded text-xs hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Inquire for Institutional Licensing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
