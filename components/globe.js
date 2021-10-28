import { useState, useRef, useEffect } from 'react'

let Globe = () => null
if (typeof window !== 'undefined') Globe = require('react-globe.gl').default

import countryLists from '@data/countries.json'

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
  }, [])
  return windowSize
}

const GlobeWrapper = () => {
  const [imageUrl] = useState('/CFCFCF.png')
  const globeRef = useRef(null)
  const [countries, setCountries] = useState({ features: [] })
  const { lived, visited } = countryLists
  const [mounted, setMounted] = useState(false)
  const size = useWindowSize()

  useEffect(() => {
    // load data
    fetch('/countries.geojson')
      .then((res) => res.json())
      .then(setCountries)
    setMounted(true)
  }, [])

  return (
    mounted && (
      <Globe
        ref={globeRef}
        width={(size.width > 720 && 720) || size.width - 32}
        height={(size.width > 720 && 720) || size.height / 2}
        backgroundColor={'rgba(0,0,0,0)'}
        globeImageUrl={imageUrl}
        polygonsData={countries.features.filter(
          ({ properties }) => properties.ISO_A2 !== 'AQ'
        )}
        polygonAltitude={() => 0.01}
        polygonCapColor={({ properties }) => {
          return (
            (lived.includes(properties.ISO_A2) && 'blue') ||
            (visited.includes(properties.ISO_A2) && 'green') ||
            'grey'
          )
        }}
        polygonSideColor={() => 'rgba(0, 0, 0, 0.2)'}
        polygonStrokeColor={() => '#111'}
        polygonLabel={({ properties }) => `
          <b>${properties.ADMIN} (${properties.ISO_A2})</b>
          `}
        rendererConfig={{ preserveDrawingBuffer: true }}
        controls={
          globeRef &&
          globeRef.current &&
          (globeRef.current.controls().autoRotate = true) &&
          (globeRef.current.controls().autoRotateSpeed = 0.5) &&
          (globeRef.current.controls().enableZoom = false) &&
          (globeRef.current.controls().enableDamping = true) &&
          (globeRef.current.controls().dampingFactor = 100)
        }
      />
    )
  )
}

export default GlobeWrapper
