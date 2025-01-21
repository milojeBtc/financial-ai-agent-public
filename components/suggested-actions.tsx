'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import { memo } from 'react';

interface SuggestedActionsProps {
  chatId: string;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
}

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: 'What is the current price',
      label: 'of Apple?',
      mobileTitle: 'Current price',
      mobileLabel: 'of AAPL today',
      action: 'What is the current price of Apple?',
    },
    {
      title: 'Show me the revenue',
      label: 'of Microsoft over the last 5 years',
      mobileTitle: 'MSFT revenue',
      mobileLabel: 'for the last 5y',
      action: 'Show Microsoft\'s annual revenue for the last 5 years',
    },
    {
      title: 'How has Nvidia\'s price',
      label: 'changed over the past year?',
      mobileTitle: 'Price history',
      mobileLabel: 'of NVDA over the last year',
      action: 'How has Nvidia\'s price changed over the past year?',
    },
    {
      title: 'Show me 5 stocks with',
      label: 'revenue > 100B and net income > 10B',
      mobileTitle: 'Find stocks',
      mobileLabel: 'revenue >100B, net income >10B',
      action: 'Show me 5 stocks with revenue > 100B and net income > 10B',
    },
  ];

  return (
    <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2 w-full">
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className="block"
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`);
              append({
                role: 'user',
                content: suggestedAction.action,
              });
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full max-w-[calc(100vw-2rem)] h-auto justify-start items-start break-words"
          >
            <span className="font-medium break-words">
              <span className="hidden sm:inline">{suggestedAction.title}</span>
              <span className="sm:hidden">{suggestedAction.mobileTitle}</span>
            </span>
            <span className="text-muted-foreground break-words">
              <span className="hidden sm:inline">{suggestedAction.label}</span>
              <span className="sm:hidden">{suggestedAction.mobileLabel}</span>
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
