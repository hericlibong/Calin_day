import React from 'react';

export default function DataIntegrityNote({ steps }) {
    const hasUnverified = steps.some(s => s.ref_status === 'to_check');

    if (!hasUnverified) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 p-2 bg-amber-50 border-t border-amber-200 text-amber-800 text-xs text-center z-50 opacity-90 hover:opacity-100 transition-opacity">
            <span className="font-bold">Note de rigueur :</span> Certaines données visualisées sont en cours de consolidation ("Source à vérifier") et sont présentées à titre indicatif.
        </div>
    );
}
