import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

function optimizeSrc(src: string | undefined): { src?: string; srcSet?: string } {
  if (!src || !src.includes('images.unsplash.com')) return { src }

  const webp = src.includes('&fm=') ? src.replace(/&fm=\w+/, '&fm=webp') : `${src}&fm=webp`
  const small = webp.replace(/&w=\d+/, '&w=640')
  const medium = webp.replace(/&w=\d+/, '&w=1080')
  const srcSet = `${small.includes('&w=') ? small : `${small}&w=640`} 640w, ${medium.includes('&w=') ? medium : `${medium}&w=1080`} 1080w`

  return { src: webp, srcSet }
}

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, loading, sizes, ...rest } = props
  const optimized = optimizeSrc(src)

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img
      src={optimized.src}
      srcSet={optimized.srcSet}
      sizes={sizes ?? '(max-width: 768px) 640px, 1080px'}
      alt={alt}
      className={className}
      style={style}
      loading={loading ?? 'lazy'}
      decoding="async"
      {...rest}
      onError={handleError}
    />
  )
}
