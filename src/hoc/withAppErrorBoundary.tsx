import {
  withErrorBoundary,
  type FallbackProps,
} from 'react-error-boundary'
import type { ComponentType, ErrorInfo } from 'react'

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const errorMessage = error instanceof Error
    ? error.message
    : String(error)

  return (
    <div role="alert" className="error-container">
      <h2>Quelque chose s'est mal passé</h2>

      <pre>{errorMessage}</pre>

      <button onClick={resetErrorBoundary}>
        Réessayer
      </button>
    </div>
  )
}

function logToSentry(
  error: Error,
  info: ErrorInfo
) {
  console.error(error, info)
  // Sentry.captureException(...)
}

export function withAppErrorBoundary<P extends object>(
  Component: ComponentType<P>
) {
  return withErrorBoundary(Component, {
    FallbackComponent: ErrorFallback,

    onError: (
      error: unknown,
      info: ErrorInfo
    ) => {
      logToSentry(error as Error, info)
    },

    onReset: () => {
      window.location.reload()
    },
  })
}