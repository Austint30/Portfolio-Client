import React, { HTMLAttributes, useEffect, useRef } from 'react';

export interface AmbientBackgroundProps extends HTMLAttributes<HTMLCanvasElement> {
    canvasRef?: React.RefObject<HTMLCanvasElement>
}

const AmbientBackground: React.FC<AmbientBackgroundProps> = (props) => {

    const { canvasRef, ...rest } = props;

    const canvasRefInternal = canvasRef || useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Set up canvas
        const canvas = canvasRefInternal.current;
        const context = canvas?.getContext('2d');
        let ascending = true;
        let alpha = 0;

        function animate(){
            if (!context) return;
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);

            if (alpha > 1){
                ascending = false;
            }
            if (alpha < 0){
                ascending = true;
            }

            if (ascending) alpha += 0.01
            else alpha -= 0.01

            context.fillStyle = `rgba(0, 30, 30, ${alpha})`;
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        }

        let interval = setInterval(animate, 300);
        return () => clearInterval(interval)
    },[])

    const style: React.CSSProperties = {
        ...props.style,
        width: '100%',
        height: '100%'
    }

    return <canvas {...rest} style={style} ref={canvasRef} />
}

export default AmbientBackground;