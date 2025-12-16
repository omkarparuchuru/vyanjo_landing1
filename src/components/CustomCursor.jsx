import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.plan-card') || e.target.closest('.menu-card')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            height: 32,
            width: 32,
            backgroundColor: "rgba(197, 160, 101, 0.3)", // Accent color transparent
            border: "1px solid var(--color-accent)",
        },
        hover: {
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
            height: 64,
            width: 64,
            backgroundColor: "rgba(197, 160, 101, 0.1)",
            border: "1px solid var(--color-primary)",
        }
    };

    return (
        <motion.div
            className="custom-cursor"
            variants={variants}
            animate={isHovering ? "hover" : "default"}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9999,
                mixBlendMode: 'difference'
            }}
        />
    );
};

export default CustomCursor;
