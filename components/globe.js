import { useState, useRef, useEffect } from 'react'

let Globe = () => null
if (typeof window !== 'undefined') Globe = require('react-globe.gl').default

import countryLists from '@data/countries.json'

const GlobeWrapper = () => {
  const [imageUrl] = useState('/CFCFCF.png')
  const globeRef = useRef(null)
  const [countries, setCountries] = useState({ features: [] })
  const { lived, visited } = countryLists

  useEffect(() => {
    // load data
    fetch('/countries.geojson')
      .then((res) => res.json())
      .then(setCountries)
  }, [])

  return (
    <Globe
      ref={globeRef}
      width={700}
      height={700}
      backgroundColor={'rgba(0,0,0,0)'}
      globeImageUrl={imageUrl}
      polygonsData={countries.features.filter(
        ({ properties }) => properties.ISO_A2 !== 'AQ'
      )}
      polygonAltitude={(d) => 0.01}
      polygonCapColor={({ properties }) => {
        console.log(properties)
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
      /* controls={remove zoom add autorotation} */
    />
  )
}

export default GlobeWrapper
