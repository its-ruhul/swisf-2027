import { cn } from '../../lib/cn';
import MandalaWatermark from './MandalaWatermark';

/**
 * A great red-gold sun with a turning mandala on its face and rays wheeling
 * behind it. Deepest at the top, so Sun's gold crown and pale wings stand out
 * against it. Give it a position and a width; it stays round.
 */
export default function RisingSun({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none aspect-square', className)}>
      <div className="absolute -inset-[46%]">
        <div
          className="h-full w-full motion-safe:animate-spin-slower"
          style={{
            background: 'repeating-conic-gradient(from 0deg, rgba(224,123,57,0.2) 0deg 3deg, transparent 3deg 12deg)',
            WebkitMaskImage: 'radial-gradient(circle, #000 34%, transparent 70%)',
            maskImage: 'radial-gradient(circle, #000 34%, transparent 70%)',
          }}
        />
      </div>
      <div
        className="absolute -inset-[14%] rounded-full motion-safe:animate-glow-pulse"
        style={{ background: 'radial-gradient(circle, rgba(242,154,94,0.6) 0%, rgba(242,154,94,0.32) 60%, transparent 72%)' }}
      />
      <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(180deg, #D4452E 0%, #E56A3B 34%, #F2934B 68%, #FBC46E 100%)' }} />
      <div className="absolute inset-[7%] motion-safe:animate-spin-slow">
        <MandalaWatermark className="h-full w-full" color="#FFE6AE" opacity={0.26} />
      </div>
    </div>
  );
}
