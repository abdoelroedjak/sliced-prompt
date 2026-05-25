import { Sparkles } from "lucide-react";

interface FooterProps {
  onNavClick: (sect: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand block */}
          <div className="space-y-4">
            <button 
              onClick={() => onNavClick("landing")}
              className="flex items-center gap-2.5 text-left active:scale-95 transition-transform"
            >
              <img 
                src="https://i.ibb.co.com/zTVDjNFj/694623762-17964433824113304-3873591076749515322-n.jpg" 
                alt="Sliced Prompt Logo" 
                className="w-8 h-8 rounded-lg object-cover border border-gray-150"
                referrerPolicy="no-referrer"
              />
              <span className="text-lg font-display font-bold text-gray-950 tracking-tight">
                Sliced Prompt
              </span>
            </button>
            
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
              Cara tercepat menyelesaikan pekerjaan, kuliah, dan bisnis dengan asisten produktivitas AI berbasis puluhan template siap pakai.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 mb-4">
              Produk
            </h5>
            <ul className="space-y-3 text-xs font-medium">
              <li>
                <button onClick={() => onNavClick("perpustakaan")} className="text-gray-600 hover:text-black hover:underline transition-colors text-left">
                  Perpustakaan
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("playground")} className="text-gray-600 hover:text-black hover:underline transition-colors text-left">
                  Playground Gratis
                </button>
              </li>
              <li>
                <span className="text-gray-400 cursor-not-allowed">
                  Akses API (Segera Hadir)
                </span>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 mb-4">
              Perusahaan
            </h5>
            <ul className="space-y-3 text-xs font-medium">
              <li>
                <span className="text-gray-650 hover:text-black cursor-pointer hover:underline">Ketentuan</span>
              </li>
              <li>
                <span className="text-gray-650 hover:text-black cursor-pointer hover:underline">Privasi</span>
              </li>
              <li>
                <span className="text-gray-650 hover:text-black cursor-pointer hover:underline">Kontak Hubung</span>
              </li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 mb-4">
              Komunitas
            </h5>
            <ul className="space-y-3 text-xs font-medium">
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black hover:underline">Twitter / X</a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black hover:underline">GitHub Workspace</a>
              </li>
              <li>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black hover:underline">Discord Server</a>
              </li>
            </ul>
          </div>

        </div>

        {/* copyright metadata information row */}
        <div className="mt-12 pt-8 border-t border-gray-200/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-400">
          <p>© 2026 Sliced Prompt. Hak cipta dilindungi undang-undang.</p>
          <p className="text-[10px] text-gray-300">Dibuat menggunakan Google AI Studio</p>
        </div>

      </div>
    </footer>
  );
}
