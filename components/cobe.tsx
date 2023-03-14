/* eslint-disable @typescript-eslint/no-non-null-assertion */
import createGlobe from 'cobe';
import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';
import { useSpring } from 'react-spring';

export default function Cobe() {
  const { theme } = useTheme();
  const canvasRef =
    useRef<HTMLCanvasElement>() as React.MutableRefObject<HTMLCanvasElement>;
  const pointerInteracting = useRef(0);
  const pointerInteractionMovement = useRef(0);
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001
    }
  }));
  useEffect(() => {
    let phi = 0;
    let width = 0;
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener('resize', onResize);
    onResize();
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.2,
      dark: theme === 'dark' ? 1 : 0.1,
      diffuse: 1,
      mapSamples: 16000,
      mapBrightness: 3,
      mapBaseBrightness: 0.05,
      baseColor: [1, 1, 1],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor:
        theme === 'dark'
          ? [55 / 255, 55 / 255, 55 / 255]
          : [173 / 255, 173 / 255, 173 / 255],
      markers: [
        { location: [41.157, -8.629], size: 0.1 }, // Porto
        { location: [38.722, -9.139], size: 0.05 }, // Lisbon
        { location: [41.385, 2.173], size: 0.1 }, // Barcelona
        { location: [48.856, 2.351], size: 0.05 }, // Paris
        { location: [52.52, 13.405], size: 0.05 }, // Berlin
        { location: [53.551, 9.993], size: 0.05 }, // Hamburg
        { location: [51.227, 6.773], size: 0.05 }, // Dusseldorf
        { location: [50.938, 6.959], size: 0.05 }, // Cologne
        { location: [51.507, -0.128], size: 0.05 }, // London
        { location: [40.416, -3.703], size: 0.05 }, // Madrid
        { location: [48.208, 16.373], size: 0.05 }, // Vienna
        { location: [50.075, 14.437], size: 0.05 }, // Prague
        { location: [52.37, 4.891], size: 0.05 }, // Amsterdam
        { location: [45.464, 9.189], size: 0.05 }, // Milan
        { location: [45.438, 12.326], size: 0.05 }, // Venice
        { location: [41.902, 12.496], size: 0.05 }, // Rome
        { location: [47.497, 19.04], size: 0.05 }, // Budapest
        { location: [18.567, -68.363], size: 0.05 }, // Punta Cana
        { location: [46.204, 6.143], size: 0.05 }, // Geneva
        { location: [48.148, 17.107], size: 0.05 }, // Bratislava
        { location: [46.056, 14.505], size: 0.05 }, // Ljubljana
        { location: [50.85, 4.35], size: 0.05 }, // Brussels
        { location: [51.209, 3.224], size: 0.05 }, // Bruges
        { location: [43.856, 18.413], size: 0.05 }, // Sarajevo
        { location: [55.676, 12.568], size: 0.05 } // Copenhagen
      ],
      opacity: 0.85,
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi + r.get();
        phi += 0.005;
        state.width = width * 2;
        state.height = width * 2;
      }
    });
    setTimeout(() => (canvasRef.current.style.opacity = '1'));
    return () => globe.destroy();
  }, [r, theme]);
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 600,
        aspectRatio: '1',
        margin: 'auto',
        position: 'relative'
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          canvasRef.current.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = 0;
          canvasRef.current.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = 0;
          canvasRef.current.style.cursor = 'grab';
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== 0) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({
              r: delta / 200
            });
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({
              r: delta / 100
            });
          }
        }}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          contain: 'layout paint size',
          opacity: 0,
          transition: 'opacity 1s ease',
          borderRadius: '50%',
          marginLeft: '5px',
          backgroundColor: 'var(--bg)'
        }}
      />
    </div>
  );
}
