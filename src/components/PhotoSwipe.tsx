import { Media } from 'helpers/constants'
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'

export default function PhotoSwipe({ items }: { items: Media[] }) {
  return (
    <div
      className="dark:border-white-pale flex min-h-44 snap-x flex-row overflow-x-scroll border-b-2 sm:mt-0 xl:h-full xl:w-3/4 xl:snap-y xl:flex-col xl:overflow-y-scroll xl:border-b-0 xl:border-l-2"
      onWheel={(ev) => {
        ev.currentTarget.scrollBy(ev.deltaY, 0)
      }}
    >
      <div className="bg-stripes dark:border-white-pale h-full w-11 shrink-0 snap-center xl:h-11 xl:w-full xl:border-b-2" />
      <Gallery
        options={{
          closeOnVerticalDrag: true,
          initialZoomLevel: 'fit',
          secondaryZoomLevel: 'fill',
          maxZoomLevel: 'fill',
          doubleTapAction: 'zoom',
          bgClickAction: 'close',
          wheelToZoom: true,
        }}
      >
        {items
          .filter((item) => item.type !== 'video')
          .map((item) => (
            <div
              className="dark:border-white-pale shrink-0 cursor-zoom-in snap-center border-l-2 xl:w-fit xl:border-b-2 xl:border-l-0"
              key={item.url}
            >
              <Item
                original={item.url}
                thumbnail={item.url}
                width="1280"
                height="960"
              >
                {({ ref, open }) => (
                  <img
                    fetchPriority="high"
                    ref={ref}
                    onClick={open}
                    className="h-44 shrink-0 object-cover grayscale-100 hover:grayscale-0 xl:h-auto"
                    style={{
                      WebkitTransition: '0.3s -webkit-filter ease-in-out',
                    }}
                    src={item.url}
                    alt={item.title}
                  />
                )}
              </Item>
            </div>
          ))}
        {items
          .filter((item) => item.type === 'video')
          .map((item) => (
            <div className="flex h-44 min-w-44 justify-center border-l-2 grayscale-100 transition-[filter] hover:grayscale-0 xl:h-96 xl:border-b-2 xl:border-l-0">
              <video
                controls
                muted
                controlsList="nodownload"
                onClick={(el) => el.currentTarget.requestFullscreen()}
                disableRemotePlayback
                disablePictureInPicture
                className="h-44 p-1 xl:h-96"
                style={{
                  WebkitTransition: '0.3s -webkit-filter ease-in-out',
                }}
                src={item.url}
                title={item.title}
              />
            </div>
          ))}
      </Gallery>
      <div className="bg-stripes dark:border-white-pale h-full w-12.5 shrink-0 snap-center border-l-2 xl:h-11 xl:w-full xl:border-l-0" />
    </div>
  )
}
