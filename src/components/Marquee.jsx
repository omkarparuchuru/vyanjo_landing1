import React from 'react';
import { motion } from 'framer-motion';

const Marquee = () => {
    const marqueeVariants = {
        animate: {
            x: [0, -1035],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                },
            },
        },
    };

    return (
        <div style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            background: 'var(--color-primary-dark)',
            color: 'var(--color-accent)',
            padding: '1.5rem 0',
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid var(--color-accent)',
            borderBottom: '1px solid var(--color-accent)'
        }}>
            <motion.div
                variants={marqueeVariants}
                animate="animate"
                style={{ display: 'flex', gap: '4rem', fontSize: '1.5rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-heading)' }}
            >
                <span>Fresh Ingredients</span>
                <span>•</span>
                <span>Chef Curated</span>
                <span>•</span>
                <span>Sustainable</span>
                <span>•</span>
                <span>Zero Waste</span>
                <span>•</span>
                <span>Gourmet Daily</span>
                <span>•</span>
                <span>Fresh Ingredients</span>
                <span>•</span>
                <span>Chef Curated</span>
                <span>•</span>
                <span>Sustainable</span>
                <span>•</span>
                <span>Zero Waste</span>
                <span>•</span>
                <span>Gourmet Daily</span>
            </motion.div>
        </div>
    );
};

export default Marquee;
