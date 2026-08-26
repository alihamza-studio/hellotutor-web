'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface HighlightTextProps {
  children: string;
  words: string | string[];
  className?: string;
  emClassName?: string;
}

function renderFormattedText(text: string): React.ReactNode {
  if (!text.includes('+')) return text;
  const segments = text.split('+');
  return segments.map((seg, i) => (
    <React.Fragment key={i}>
      {seg}
      {i < segments.length - 1 && (
        <span className="font-sans font-light text-[0.8em] inline-block mx-0.5 relative -top-[0.05em]">
          +
        </span>
      )}
    </React.Fragment>
  ));
}

export function HighlightText({ children, words, className, emClassName }: HighlightTextProps) {
  const targets = Array.isArray(words) ? words : [words];
  const parts: React.ReactNode[] = [];
  let remaining = children;

  targets.forEach((word, wi) => {
    const idx = remaining.indexOf(word);
    if (idx !== -1) {
      const before = remaining.slice(0, idx);
      const after = remaining.slice(idx + word.length);
      const isAtEndOrPunctuation = after.length === 0 || /^[.,!?:;]/.test(after);
      
      if (before) parts.push(<span key={`b-${wi}`}>{renderFormattedText(before)}</span>);
      parts.push(
        <em key={`w-${wi}`} className={cn('italic', !isAtEndOrPunctuation && 'pr-3', emClassName)}>
          {renderFormattedText(word)}
        </em>
      );
      remaining = after;
    }
  });

  if (remaining) parts.push(<span key="end">{renderFormattedText(remaining)}</span>);

  return <span className={className}>{parts.length ? parts : renderFormattedText(children)}</span>;
}
