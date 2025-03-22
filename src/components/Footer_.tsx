import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 bg-sand">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1">
            <div className="mb-4 text-black">Q0 AI</div>
            <p className="text-black/80">
              Mathematical precision in population modeling.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm text-black/60 uppercase tracking-wider mb-4">System</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-black hover:text-black/70">Documentation</a></li>
              <li><a href="#" className="text-black hover:text-black/70">API</a></li>
              <li><a href="#" className="text-black hover:text-black/70">Status</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm text-black/60 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-black hover:text-black/70">About</a></li>
              <li><a href="#" className="text-black hover:text-black/70">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm text-black/60 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-black hover:text-black/70">Privacy</a></li>
              <li><a href="#" className="text-black hover:text-black/70">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-black/10">
          <p className="text-center text-black/60 text-sm">
            © {new Date().getFullYear()} Q0 AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;