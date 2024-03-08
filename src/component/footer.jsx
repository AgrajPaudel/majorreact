const Footer = () => {
    let year = new Date().getFullYear();
  
    return (
      <footer className="bg-primary text-white py-3 mt-5">
        <div className="container mx-auto text-center">
          <p className="text-sm">Finance Analyzer &copy; {year}</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;