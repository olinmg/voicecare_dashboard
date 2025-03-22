import StickyButtons from './StickyButtons';

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      {children}
      <StickyButtons />
    </div>
  );
};

export default Layout; 