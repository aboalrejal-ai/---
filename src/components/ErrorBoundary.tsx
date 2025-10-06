import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Card } from './ui'
import { Button } from './ui'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="max-w-lg w-full text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                حدث خطأ غير متوقع
              </h1>
              <p className="text-gray-600">
                عذراً، حدث خطأ في التطبيق. يرجى المحاولة مرة أخرى أو الاتصال بالدعم الفني.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <h3 className="font-semibold text-red-800 mb-2">تفاصيل الخطأ (للمطورين):</h3>
                <pre className="text-sm text-red-700 overflow-auto">
                  {this.state.error.toString()}
                </pre>
                {this.state.errorInfo && (
                  <pre className="text-sm text-red-700 overflow-auto mt-2">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}

            <div className="space-y-3">
              <Button onClick={this.handleReset} className="w-full">
                إعادة تحميل الصفحة
              </Button>

              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="w-full"
              >
                العودة للصفحة الرئيسية
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                إذا استمر الخطأ، يرجى الاتصال بالدعم الفني
              </p>
            </div>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}