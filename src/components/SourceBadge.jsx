import React from 'react';

/**
 * Displays a verification badge based on the reference status provided.
 * @param {string} status - 'ok' | 'to_check'
 * @param {string} [label] - Optional citation text
 */
export default function SourceBadge({ status, label }) {
    const isVerified = status === 'ok';

    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${isVerified
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
            <span className={`w-2 h-2 rounded-full ${isVerified ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`} />
            <span>
                {isVerified ? 'Source vérifiée' : 'Source à vérifier'}
            </span>
            {label && (
                <span className="opacity-75 border-l border-current pl-2 ml-1">
                    {label}
                </span>
            )}
        </div>
    );
}
