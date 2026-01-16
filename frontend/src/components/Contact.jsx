import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, you would send this to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-typewriter font-bold text-vintage-ink dark:text-dark-text mb-4">
              [ CONTACT FORM ]
            </h2>
            <div className="w-32 h-1 bg-vintage-ink mx-auto mb-6"></div>
            <p className="font-mono text-vintage-brown">
              Drop me a message • I'll respond within 24-48 hours
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="vintage-card">
                <h3 className="text-2xl font-typewriter font-bold text-vintage-ink dark:text-dark-text mb-4">
                  GET_IN_TOUCH.EXE
                </h3>
                <p className="font-mono text-vintage-darkBrown leading-relaxed mb-6">
                  Whether you have a question, want to collaborate, or just want to say hi, 
                  feel free to reach out. I'm always excited to connect with fellow developers 
                  and tech enthusiasts!
                </p>
                
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-vintage-ink dark:text-dark-text">EMAIL:</span>
                    <a href="mailto:mehdyakr@gmail.com" className="text-vintage-accent hover:underline">
                      mehdyakr@gmail.com
                    </a>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-vintage-ink dark:text-dark-text">GITHUB:</span>
                    <a href="https://github.com/callmemehdy" target="_blank" rel="noopener noreferrer" className="text-vintage-accent hover:underline">
                      github.com/callmemehdy
                    </a>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-vintage-ink dark:text-dark-text">LINKEDIN:</span>
                    <a href="https://linkedin.com/in/elakarymehdi" target="_blank" rel="noopener noreferrer" className="text-vintage-accent hover:underline">
                      linkedin.com/in/elakarymehdi
                    </a>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-vintage-ink dark:text-dark-text">PHONE:</span>
                    <span className="text-vintage-brown">+212 709 891 377</span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-vintage-ink dark:text-dark-text">LOCATION:</span>
                    <span className="text-vintage-brown">Casablanca, Morocco</span>
                  </div>
                </div>
              </div>
              
              <div className="vintage-card bg-vintage-ink text-vintage-cream">
                <h3 className="text-xl font-typewriter font-bold mb-3">
                  RESPONSE_TIME.LOG
                </h3>
                <div className="font-retro text-sm space-y-1">
                  <p>&gt; AVG_RESPONSE: 24_HOURS</p>
                  <p>&gt; MAX_RESPONSE: 48_HOURS</p>
                  <p>&gt; TIMEZONE: UTC+0</p>
                  <p>&gt; STATUS: MONITORING</p>
                </div>
              </div>
            </div>
            
            <div className="vintage-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-mono font-bold text-vintage-ink dark:text-dark-text mb-2 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="vintage-input"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block font-mono font-bold text-vintage-ink dark:text-dark-text mb-2 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="vintage-input"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block font-mono font-bold text-vintage-ink dark:text-dark-text mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="vintage-input resize-none"
                    placeholder="Your message here..."
                  />
                </div>
                
                {submitted && (
                  <div className="bg-vintage-mint dark:bg-dark-accent border-4 border-vintage-ink dark:border-dark-border p-4 text-center font-mono font-bold text-vintage-ink dark:text-dark-text">
                    ✓ MESSAGE SENT SUCCESSFULLY!
                  </div>
                )}
                
                <button
                  type="submit"
                  className="vintage-button w-full"
                >
                  [Send Message]
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
