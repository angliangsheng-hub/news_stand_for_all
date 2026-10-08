import React from 'react';
import { X, CheckCircle2, AlertTriangle, RefreshCw, Server, Cpu, Radio, Shield } from 'lucide-react';
import { MCPHealthResponse } from '../types';

interface McpHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mcpHealth: MCPHealthResponse | null;
  onRefreshHealth: () => void;
  isRefreshing: boolean;
}

export const McpHealthModal: React.FC<McpHealthModalProps> = ({
  isOpen,
  onClose,
  mcpHealth,
  onRefreshHealth,
  isRefreshing,
}) => {
  if (!isOpen) return null;

  const isHealthy = mcpHealth?.status === 'ok';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-stone-200 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2.5">
            <Server className="w-5 h-5 text-stone-700" />
            <div>
              <h3 className="font-editorial text-lg font-semibold text-stone-900">
                MCP Infrastructure Health Monitor
              </h3>
              <p className="text-[11px] text-stone-500 font-mono">
                API Endpoint: <span className="text-stone-700">/api/health</span>
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

        {/* Overall Status Banner (Matches Miro Board: green if healthy, amber if degraded) */}
        <div
          className={`p-4 rounded-lg border flex items-center justify-between ${
            isHealthy
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}
        >
          <div className="flex items-center gap-3">
            {isHealthy ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
            )}
            <div>
              <div className="font-semibold text-sm">
                System Status: {isHealthy ? 'HEALTHY / GREEN' : 'ATTENTION / AMBER'}
              </div>
              <p className="text-xs text-stone-600 mt-0.5">
                {isHealthy
                  ? 'All aggregator connectors and AI reasoning pipes are fully operational.'
                  : 'Operating with resilience heuristics. Check connected API keys.'}
              </p>
            </div>
          </div>

          <div className="text-right text-xs font-mono">
            <span className="block text-stone-500">Latency</span>
            <span className="font-bold text-stone-800">{mcpHealth?.latencyMs || 45} ms</span>
          </div>
        </div>

        {/* MCP Dependency List (From Miro Board Page 9) */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2.5">
            Registered MCP Services & Providers
          </h4>
          <div className="space-y-2">
            {mcpHealth?.mcpDependencies?.map((dep) => (
              <div
                key={dep.id}
                className="p-2.5 rounded border border-stone-200/80 bg-stone-50/70 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        dep.status === 'healthy' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    <span className="font-medium text-stone-900">{dep.name}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">{dep.details}</p>
                </div>
                <div className="text-right font-mono text-[11px] text-stone-500 shrink-0 pl-2">
                  <span>{dep.latency}ms</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-200">
          <div className="text-[11px] text-stone-500 font-mono">
            Uptime: {Math.floor((mcpHealth?.uptimeSeconds || 120) / 60)} mins
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onRefreshHealth}
              disabled={isRefreshing}
              className="px-3 py-1.5 rounded text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Ping Health</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded text-xs bg-stone-900 hover:bg-stone-800 text-white font-medium transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
