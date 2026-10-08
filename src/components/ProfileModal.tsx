import React, { useState } from 'react';
import { X, Check, User, Sliders, Shield, Sparkles } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSegment: string;
  onSaveSegment: (seg: string) => void;
  selectedTopics: string[];
  onSaveTopics: (topics: string[]) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  selectedSegment,
  onSaveSegment,
  selectedTopics,
  onSaveTopics,
}) => {
  const [segment, setSegment] = useState(selectedSegment || 'General');
  const [topics, setTopics] = useState<string[]>(selectedTopics || [
    'Singapore Local Affairs & Policy',
    'Technology, AI & Semiconductors',
    'Global Geopolitics & Multilateral Trade',
  ]);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  // From Miro Board Page 6: Customer segments
  const customerSegments = [
    { id: 'Students', label: 'Student / Academic', desc: 'Curated research feeds, educational summaries & discount tiers' },
    { id: 'Business', label: 'Business & Finance', desc: 'Real-time trade data, central bank coverage & commercial analysis' },
    { id: 'Ministries', label: 'Public Sector / Ministries', desc: 'Policy briefings, regional diplomatic updates & synoptic reports' },
    { id: 'General', label: 'General Reader / All Ages', desc: 'Balanced lifestyle, breaking world headlines & cultural features' },
  ];

  // From Miro Board Page 3: Customize news topics
  const availableTopics = [
    'Singapore Local Affairs & Policy',
    'Technology, AI & Semiconductors',
    'Global Geopolitics & Multilateral Trade',
    'ASEAN Regional Economy',
    'Arts, Literature & Summer Reads',
    'Health, Wellness & Biophilia',
    'International Football & Sports',
    'China Censorship & Social Trends (CDT)',
  ];

  const toggleTopic = (topic: string) => {
    if (topics.includes(topic)) {
      setTopics(topics.filter((t) => t !== topic));
    } else {
      setTopics([...topics, topic]);
    }
  };

  const handleSave = () => {
    onSaveSegment(segment);
    onSaveTopics(topics);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-stone-200 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-stone-700" />
            <div>
              <h3 className="font-editorial text-xl font-semibold text-stone-900">
                Reader Profile & Feed Customization
              </h3>
              <p className="text-xs text-stone-500">
                Customise the wire aggregators to match your specific interests
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customer Segment Selection (Miro Page 6) */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-2">
            Reader Profile Segment:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {customerSegments.map((s) => {
              const isSelected = segment === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setSegment(s.id)}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                    isSelected
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-800'
                  }`}
                >
                  <div className="font-medium text-xs">{s.label}</div>
                  <div
                    className={`text-[10px] mt-0.5 line-clamp-1 ${
                      isSelected ? 'text-stone-300' : 'text-stone-500'
                    }`}
                  >
                    {s.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Customized News Topics (Miro Page 3) */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-2">
            Tailor Your News Topics ({topics.length} selected):
          </label>
          <div className="flex flex-wrap gap-1.5">
            {availableTopics.map((t) => {
              const isSelected = topics.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTopic(t)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white font-medium'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                  <span>{t}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-200">
          <span className="text-[11px] text-stone-400">
            Preferences synced with Merlion AI Assistant
          </span>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-medium transition-colors cursor-pointer"
          >
            {isSaved ? 'Preferences Saved! ✓' : 'Save & Update Feed'}
          </button>
        </div>
      </div>
    </div>
  );
};
