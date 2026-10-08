import React from 'react';
import { X, Volume2, Globe, ExternalLink, Bookmark, Share2, Clock, Calendar } from 'lucide-react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onReadAloud: (text: string, title: string) => void;
  onCompareTopic: (topic: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onReadAloud,
  onCompareTopic,
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FAF8F5] border border-stone-300 rounded-xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
        {/* Navigation / Header Actions */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
            <span className="uppercase tracking-wider font-semibold text-stone-800">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.source}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Headline */}
        <div>
          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold text-stone-900 leading-tight">
            {article.title}
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mt-3 pt-2 border-t border-stone-200/60">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(article.publishedAt).toLocaleDateString('en-SG', { dateStyle: 'medium' })}</span>
            </div>
            <span aria-hidden="true">·</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        {/* Feature Image if present */}
        {article.imageUrl && (
          <div className="aspect-16/9 rounded-lg overflow-hidden bg-stone-100 border border-stone-200">
            <img
              src={article.imageUrl}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Prose with Classic Broadsheet Drop-Cap */}
        <div className="font-editorial text-stone-800 text-base sm:text-lg leading-relaxed space-y-4">
          <p className="first-letter:text-5xl first-letter:font-editorial first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-stone-900 leading-relaxed">
            {article.summary}
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            As cross-border reporting consolidates from regional bureaus and international wires, observers note the heightened speed of information dissemination across Southeast Asia and global capital markets. Continuous updates will follow as official statements are ratified.
          </p>
        </div>

        {/* Singapore Perspective Quick Hook */}
        <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-200/80 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-900">
              <Globe className="w-4 h-4 text-blue-700" />
              <span>Compare Singapore vs The World Angle</span>
            </div>
            <button
              onClick={() => {
                onClose();
                onCompareTopic(article.title);
              }}
              className="text-xs text-blue-700 hover:text-blue-900 font-medium underline cursor-pointer"
            >
              Open Full Dual-Lens Analysis →
            </button>
          </div>
          <p className="text-xs text-stone-700 font-editorial leading-relaxed">
            Explore how Singaporean domestic policy, trade connectivity, and regional stability view this story in comparison to broader international agendas.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onReadAloud(article.summary, article.title)}
              className="flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen with AI Voice</span>
            </button>
          </div>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 border border-stone-300 hover:bg-stone-100 rounded-lg text-xs text-stone-700 transition-colors"
          >
            <span>Original Wire Link</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
