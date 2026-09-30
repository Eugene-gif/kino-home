import { captureException } from '@sentry/vue';

type ErrorContext = {
  operation: string;
  extra?: Record<string, unknown>;
};

export const reportError = (
  error: unknown,
  { operation, extra }: ErrorContext,
): string =>
  captureException(error, {
    tags: { operation },
    extra,
  });
