import { cn } from '@/lib/utils';

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeClasses = {
  sm: 'size-5',
  md: 'size-8',
  lg: 'size-12',
};

export function Loader({ size = 'md', className }: LoaderProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-gray-200 border-t-primary',
        sizeClasses[size],
        className
      )}
    />
  );
}

type LoadingOverlayProps = {
  message?: string;
  className?: string;
};

export function LoadingOverlay({ message = '로딩 중...', className }: LoadingOverlayProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-12', className)}>
      <Loader size="lg" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
