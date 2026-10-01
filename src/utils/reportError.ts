import { captureException } from '@sentry/vue';
import { ApiError } from '@/api/api-error';

type ErrorContext = {
	operation: string;
	service: 'tmdb' | 'supabase';
	extra?: Record<string, unknown>;
};

export const reportError = (
	error: unknown,
	{ operation, service, extra }: ErrorContext,
): string => {
	const metadata = typeof error === 'object' && error !== null ? error : {};
	const tags: Record<string, string> = { operation, service };

	if ('status' in metadata && typeof metadata.status === 'number') {
		tags.status = String(metadata.status);
	}

	if ('code' in metadata && typeof metadata.code === 'string') {
		tags.code = metadata.code;
	}

	const normalizedError =
		error instanceof Error
			? error
			: new Error(
					'message' in metadata && typeof metadata.message === 'string'
						? metadata.message
						: typeof error === 'string'
							? error
							: 'Unknown error',
				);

	return captureException(normalizedError, {
		tags,
		extra: {
			...extra,
			...(error instanceof ApiError ? { method: error.method, path: error.path } : {}),
		},
	});
};
