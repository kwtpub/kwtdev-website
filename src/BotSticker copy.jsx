import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from './assets/Awake.json';

function BotStickerCopy({ width = 120, height = 120 }) {
  const container = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData,
    });
    return () => anim.destroy();
  }, []);

  return <div ref={container} style={{ width, height, margin: '0 auto' }} />;
}

export default BotStickerCopy; 