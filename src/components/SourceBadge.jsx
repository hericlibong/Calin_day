import React from 'react';

/**
 * Displays a verification badge based on the reference status provided.
 * @param {string} status - 'ok' | 'to_check'
 * @param {string} [label] - Optional citation text
 */
export default function SourceBadge({ status, integrity, label }) {
    // Determine logical status from either 'integrity' (new) or 'status' (legacy)
    // integrity: 'verified' | 'extracted' | 'to_check'

    const mode = integrity || status; // support both for migration

    const isVerified = mode === 'verified' || mode === 'ok';
    const isInfo = mode === 'extracted' || mode === 'info';
    // 'to_check' is default fallback else

    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${isVerified
                ? 'bg-green-50 text-green-700 border-green-200'
                : isInfo
                    ? 'bg-gray-50 text-gray-600 border-gray-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
            <span className={`w-2 h-2 rounded-full ${isVerified ? 'bg-green-500' : isInfo ? 'bg-gray-400' : 'bg-amber-500 animate-pulse'
                }`} />
            <span>
                {isVerified ? 'Source vérifiée' : isInfo ? 'Données extraites' : 'Source à vérifier'}
            </span>
            {label && (
                <span className="opacity-75 border-l border-current pl-2 ml-1">
                    {label}
                </span>
            )}
        </div>
    );
}
