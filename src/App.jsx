import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Lenis from '@studio-freight/lenis';
import Marquee from './components/Marquee';
import CustomCursor from './components/CustomCursor';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Scroll Logic
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="app">
      <div className="grain-overlay"></div>
      <CustomCursor />

      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container flex-center" style={{ justifyContent: 'space-between', height: '100%' }}>
          <a href="#" className="logo">
            <img src="/logo.png" alt="Vyanjo" />
          </a>
          <div className="nav-links">
            <a href="#menu">Menu</a>
            <a href="#about">Our Story</a>
            <a href="#plans">Plans</a>
          </div>
          <button className="btn btn-primary" href="#plans">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2, position: 'relative', height: '100%', gap: '4rem', flexDirection: 'row' }}>

          {/* Left Content */}
          <motion.div
            className="hero-content"
            style={{ textAlign: 'left', maxWidth: '500px' }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Premium <span style={{ fontStyle: 'italic', fontFamily: 'Playfair Display' }}>Homestyle</span> <br /> Meals, Daily.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              The comfort of home-cooked food, the quality of a <span className="text-gold" style={{ fontWeight: '700' }}>chef's kitchen</span>. Flexible plans for your busy lifestyle.
            </motion.p>
            <div className="hero-actions" style={{ justifyContent: 'flex-start' }}>
              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Today's Menu
              </motion.button>
              <motion.button
                className="btn btn-outline"
                style={{ marginLeft: '1rem', color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                How It Works
              </motion.button>
            </div>
          </motion.div>

          {/* Right Floating Meal Box Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ position: 'relative', width: '450px', height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {/* Decorative Circle behind */}
            <motion.div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '1px solid rgba(197, 160, 101, 0.3)', /* accent color hint */
                zIndex: 0
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />

            {/* The Meal Bowl */}
            <motion.img
              src="/meal-bowl.png"
              alt="Premium Rustic Meal Bowl"
              style={{
                width: '100%',
                height: 'auto',
                zIndex: 2, /* Must be above ingredients */
                filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))' /* Deeper shadow */
              }}
              animate={{
                y: [0, -25, 0],
                rotate: [0, 3, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

        </div>

        {/* Darker overlay for better text contrast with the image */}
        <div className="hero-overlay" style={{ background: 'linear-gradient(to right, rgba(43, 27, 23, 0.9) 0%, rgba(43, 27, 23, 0.7) 50%, rgba(43, 27, 23, 0.4) 100%)' }}></div>
      </header>

      <Marquee />

      {/* Features/Philosophy Section */}
      <section className="section" id="about">
        <motion.div
          className="container text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.span className="text-accent" variants={fadeInUp} style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem', fontWeight: '700' }}>The Vyanjo Standard</motion.span>
          <motion.h2 variants={fadeInUp} style={{ fontSize: '2.5rem', margin: '1rem 0 3rem' }}>Elevated Comfort Food</motion.h2>

          <motion.div className="grid-3" variants={stagger}>
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000}>
              <motion.div className="feature-card" variants={fadeInUp}>
                <h3>Wholesome & Balanced</h3>
                <p>Nutritionist-approved meals perfect for professionals, families, and fitness enthusiasts.</p>
              </motion.div>
            </Tilt>
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000}>
              <motion.div className="feature-card" variants={fadeInUp}>
                <h3>Farm to Tiffin</h3>
                <p>Fresh, seasonal ingredients cooked daily. No preservatives, just honest food.</p>
              </motion.div>
            </Tilt>
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000}>
              <motion.div className="feature-card" variants={fadeInUp}>
                <h3>Total Flexibility</h3>
                <p>Subscribe for a day, a week, or a month. Pause or cancel anytime.</p>
              </motion.div>
            </Tilt>
          </motion.div>
        </motion.div>
      </section>

      {/* Menu Preview (Real Images) */}
      <section className="section" style={{ backgroundColor: '#fff' }} id="menu">
        <div className="container">
          <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ marginBottom: '0.5rem' }}>This Week's Highlights</h2>
              <p style={{ margin: 0 }}>Discover distinct flavors every day.</p>
            </div>
            <button className="btn btn-outline">View Full Menu</button>
          </div>

          <motion.div
            className="grid-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            {/* Real Menu Cards */}
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02}>
              <motion.div className="menu-card" variants={fadeInUp}>
                <div className="card-image-placeholder" style={{ backgroundImage: "url('/menuthali.png')" }}></div>
                <div className="card-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span className="tag">Indian Thali</span>
                    <span className="calories">450 kcal</span>
                  </div>
                  <h3>Smoked Butter Chicken</h3>
                  <p>Served with jeera rice, dal makhani, and handcrafted multigrain rotis.</p>
                </div>
              </motion.div>
            </Tilt>

            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02}>
              <motion.div className="menu-card" variants={fadeInUp}>
                <div className="card-image-placeholder" style={{ backgroundImage: "url('/menubowl.png')" }}></div>
                <div className="card-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span className="tag">Fitness Special</span>
                    <span className="calories">380 kcal</span>
                  </div>
                  <h3>Grilled Herb Chicken Bowl</h3>
                  <p>Quinoa, roasted sweet potatoes, avocado, and a light tahini dressing.</p>
                </div>
              </motion.div>
            </Tilt>

            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02}>
              <motion.div className="menu-card" variants={fadeInUp}>
                <div className="card-image-placeholder" style={{ backgroundImage: "url('/menulasagna.png')" }}></div>
                <div className="card-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span className="tag">Comfort</span>
                    <span className="calories">420 kcal</span>
                  </div>
                  <h3>Classic Lasagna</h3>
                  <p>Layers of fresh pasta, rich bolognese sauce, and béchamel. Just like nonna's.</p>
                </div>
              </motion.div>
            </Tilt>
          </motion.div>
        </div>
      </section>

      {/* Pricing / Plans Section */}
      <section className="section" id="plans" style={{ backgroundColor: '#FDFBF7' }}>
        <motion.div
          className="container text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <span className="text-accent" style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem', fontWeight: '700' }}>Flexible Subscriptions</span>
          <h2 style={{ fontSize: '2.5rem', margin: '1rem 0 3rem' }}>Choose Your Plan</h2>

          <div className="grid-3">
            {/* Daily Plan */}
            <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8}>
              <motion.div className="plan-card" variants={fadeInUp}>
                <h3>The Trial</h3>
                <div className="price">₹299<span style={{ fontSize: '1rem', color: '#6D4C41' }}>/day</span></div>
                <p>Perfect for those spontaneous cravings or testing us out.</p>
                <ul className="plan-features">
                  <li>1 Gourmet Meal</li>
                  <li>Delivery Included</li>
                  <li>Glass Container Packaging</li>
                </ul>
                <button className="btn btn-outline" style={{ width: '100%', marginTop: '1rem' }}>Order Today</button>
              </motion.div>
            </Tilt>

            {/* Weekly Plan */}
            <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8}>
              <motion.div className="plan-card highlighted" variants={fadeInUp}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: '#D4AF37', color: '#fff', fontSize: '0.75rem', padding: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>Most Popular</div>
                <h3>Weekly Flex</h3>
                <div className="price">₹1,799<span style={{ fontSize: '1rem', color: '#6D4C41' }}>/week</span></div>
                <p>Sort your lunch or dinner for the entire work week (Mon-Sat).</p>
                <ul className="plan-features">
                  <li>6 Meals (Mon-Sat)</li>
                  <li>Menu Customization</li>
                  <li>Priority Delivery</li>
                </ul>
                <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Subscribe Weekly</button>
              </motion.div>
            </Tilt>

            {/* Monthly Plan */}
            <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8}>
              <motion.div className="plan-card" variants={fadeInUp}>
                <h3>Monthly Saver</h3>
                <div className="price">₹6,999<span style={{ fontSize: '1rem', color: '#6D4C41' }}>/mo</span></div>
                <p>Best value. Forget about cooking and groceries entirely.</p>
                <ul className="plan-features">
                  <li>26 Meals</li>
                  <li>Complimentary Snacks</li>
                  <li>Free Pauses & Swaps</li>
                </ul>
                <button className="btn btn-outline" style={{ width: '100%', marginTop: '1rem' }}>Subscribe Monthly</button>
              </motion.div>
            </Tilt>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Footer */}
      <footer style={{ backgroundColor: '#231715', color: '#FDFBF7', padding: '5rem 0 2rem', borderTop: '4px solid #C5A065' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', textAlign: 'left' }}>

          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <img src="/logo.png" alt="Vyanjo" style={{ height: '50px', filter: 'brightness(0) invert(1)', marginBottom: '1.5rem' }} />
            <p style={{ opacity: 0.7, lineHeight: '1.8' }}>
              Redefining daily meals with chef-curated menus, farm-fresh ingredients, and zero-hassle delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#C5A065', marginBottom: '1.5rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2.5' }}>
              <li><a href="#" style={{ color: '#fff', textDecoration: 'none', opacity: 0.8 }}>Our Menu</a></li>
              <li><a href="#" style={{ color: '#fff', textDecoration: 'none', opacity: 0.8 }}>How It Works</a></li>
              <li><a href="#" style={{ color: '#fff', textDecoration: 'none', opacity: 0.8 }}>Corporate Plans</a></li>
              <li><a href="#" style={{ color: '#fff', textDecoration: 'none', opacity: 0.8 }}>Gift Cards</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#C5A065', marginBottom: '1.5rem' }}>Contact Us</h4>
            <p style={{ opacity: 0.8 }}>hello@vyanjo.com</p>
            <p style={{ opacity: 0.8 }}>+91 98765 43210</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              {/* Social Icons Placeholder */}
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
            </div>
          </div>

        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '4rem', paddingTop: '2rem', textAlign: 'center', opacity: 0.5, fontSize: '0.9rem' }}>
          &copy; 2025 Vyanjo Foods Pvt Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
