import { useState } from 'react';
import { myProjects, myInfo, newsUpdates } from './data';
import { Github, Mail, Phone, ExternalLink } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'news'>('home');

  return (
    <div className="min-h-screen bg-[#656D3F] text-white font-sans selection:bg-white/20">
      <nav className="fixed top-0 left-0 right-0 bg-[#656D3F]/90 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-lg font-bold tracking-tighter">SORAWIT.P</span>
          <div className="flex gap-8">
            <button onClick={() => setCurrentPage('home')} className={`flex items-center gap-2 text-sm uppercase tracking-widest transition-opacity ${currentPage === 'home' ? 'opacity-100 font-bold' : 'opacity-50 hover:opacity-100'}`}>
              Home
            </button>
            <button onClick={() => setCurrentPage('news')} className={`flex items-center gap-2 text-sm uppercase tracking-widest transition-opacity ${currentPage === 'news' ? 'opacity-100 font-bold' : 'opacity-50 hover:opacity-100'}`}>
              Updates
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {currentPage === 'home' ? <HomePage /> : <NewsPage />}
      </main>

      <footer className="py-20 text-center text-white/30 text-xs tracking-widest uppercase">
        © {new Date().getFullYear()} {myInfo.name} • Built with Precision
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <section className="py-24 text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tighter italic">{myInfo.name}</h1>
        <p className="text-xl md:text-2xl text-white/70 font-light mb-2 max-w-2xl mx-auto leading-relaxed">
          {myInfo.role}
        </p>
        <p className="text-sm text-white/50 mb-8">@ {myInfo.education}</p>
        <div className="flex gap-8 justify-center opacity-70">
          <a href={myInfo.contact.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
            <Github size={22} />
          </a>
          <a href={`mailto:${myInfo.contact.email}`} className="hover:opacity-100 transition-opacity">
            <Mail size={22} />
          </a>
          <a href={`tel:${myInfo.contact.phone}`} className="hover:opacity-100 transition-opacity">
            <Phone size={22} />
          </a>
        </div>
      </section>

      <section className="py-20 border-t border-white/10">
        <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-16 text-center font-bold">Selected Works</h2>
        <div className="grid gap-24">
          {myProjects.map((project) => (
            <div key={project.id} className="group text-center">
              {project.period && (
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4 block">
                  {project.period}
                </span>
              )}
              <h3 className="text-3xl font-bold mb-4 group-hover:text-white/70 transition-colors italic">
                {project.title}
              </h3>
              <p className="text-white/60 mb-6 max-w-xl mx-auto leading-relaxed font-light">
                {project.description}
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {project.techStack.map((tech) => (
                  <span key={tech} className="text-[10px] px-3 py-1 border border-white/10 rounded-full text-white/40 uppercase tracking-tighter">
                    {tech}
                  </span>
                ))}
              </div>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border-b border-white/20 pb-1 hover:border-white transition-all">
                Case Study <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function NewsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-16 text-center font-bold">Latest Updates</h2>
      <div className="space-y-12">
        {newsUpdates.map((update) => (
          <article key={update.id} className="border-l border-white/10 pl-8 relative">
            <div className="absolute w-2 h-2 bg-white/20 rounded-full -left-[4.5px] top-2"></div>
            <time className="text-[10px] uppercase tracking-widest text-white/30 mb-2 block">
              {update.date}
            </time>
            <h3 className="text-xl font-bold mb-3 italic">{update.title}</h3>
            <p className="text-white/60 font-light leading-relaxed mb-4">{update.description}</p>
            {update.techStack && update.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {update.techStack.map((tech) => (
                  <span key={tech} className="text-[10px] px-3 py-1 border border-white/10 rounded-full text-white/40 uppercase tracking-tighter">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

export default App;