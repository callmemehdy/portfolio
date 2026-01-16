import profileImage from '../assets/me.jpeg';

export default function About() {
  return (
    <section id="about" className="py-20 border-b-4 border-vintage-ink dark:border-dark-border transition-colors">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-typewriter font-bold text-vintage-ink dark:text-dark-text mb-4">
              [ ABOUT ME ]
            </h2>
            <div className="w-32 h-1 bg-vintage-ink mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="vintage-card">
              <div className="border-4 border-vintage-brown dark:border-dark-border p-2 mb-6 inline-block transition-colors">
                <div className="w-full h-64 border-2 border-vintage-ink dark:border-dark-border overflow-hidden transition-colors">
                  <img 
                    src={profileImage}
                    alt="Mehdi Akar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <h3 className="text-2xl font-typewriter font-bold text-vintage-ink dark:text-dark-text mb-4">
                BACKGROUND.TXT
              </h3>
              
              <div className="space-y-3 font-mono text-vintage-darkBrown">
                <p className="leading-relaxed">
                  &gt; Highly driven AI/Software engineer with a strong passion for artificial intelligence and machine learning.
                </p>
                <p className="leading-relaxed">
                  &gt; Based in Casablanca, Morocco, bringing expertise across AI/ML systems and building intelligent applications.
                </p>
                <p className="leading-relaxed">
                  &gt; 1337 Coding School graduate - Mohamed VI Polytechnic University.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="vintage-card">
                <h3 className="text-2xl font-typewriter font-bold text-vintage-ink dark:text-dark-text mb-4 border-b-4 border-vintage-tan pb-2">
                  SKILLS.DAT
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono font-bold text-vintage-ink dark:text-dark-text">LANGUAGES</span>
                      <span className="font-mono text-vintage-brown">█████████░ 90%</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="vintage-tag text-xs">C</span>
                      <span className="vintage-tag text-xs">C++</span>
                      <span className="vintage-tag text-xs">Python</span>
                      <span className="vintage-tag text-xs">JavaScript</span>
                      <span className="vintage-tag text-xs">TypeScript</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono font-bold text-vintage-ink dark:text-dark-text">FRAMEWORKS</span>
                      <span className="font-mono text-vintage-brown">████████░░ 85%</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="vintage-tag text-xs">React</span>
                      <span className="vintage-tag text-xs">NextJS</span>
                      <span className="vintage-tag text-xs">FastAPI</span>
                      <span className="vintage-tag text-xs">Fastify</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono font-bold text-vintage-ink dark:text-dark-text">AI/ML & TOOLS</span>
                      <span className="font-mono text-vintage-brown">████████░░ 80%</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="vintage-tag text-xs">LangChain</span>
                      <span className="vintage-tag text-xs">Pandas</span>
                      <span className="vintage-tag text-xs">NumPy</span>
                      <span className="vintage-tag text-xs">Docker</span>
                      <span className="vintage-tag text-xs">Redis</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="vintage-card bg-vintage-ink text-vintage-cream">
                <h3 className="text-xl font-typewriter font-bold mb-3">
                  STATUS_REPORT.LOG
                </h3>
                <div className="font-retro text-sm space-y-1">
                  <p>&gt; SYSTEM: OPERATIONAL</p>
                  <p>&gt; LOCATION: CASABLANCA_MOROCCO</p>
                  <p>&gt; AVAILABILITY: TRUE</p>
                  <p>&gt; LEARNING_MODE: ALWAYS_ON</p>
                  <p>&gt; COLLABORATION: ENABLED</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
