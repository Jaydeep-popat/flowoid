const logos = ['Microsoft', 'Deloitte', 'Accenture', 'Infosys', 'Wipro', 'TCS', 'HCL Technologies', 'Capgemini', 'Oracle', 'SAP'];

export default function LogosBar() {
  return (
    <div id="logos" className="bg-white px-[5%] py-[30px] border-t border-b border-border">
      <div className="max-w-[1240px] mx-auto flex items-center gap-[22px]">
        <span className="text-[.7rem] font-bold text-light uppercase tracking-[.1em] whitespace-nowrap">Trusted by</span>
        <div className="flex-1 overflow-hidden" style={{ maskImage: 'linear-gradient(90deg,transparent,black 10%,black 90%,transparent)' }}>
          <div className="flex gap-[52px] items-center w-max animate-tick">
            {[...logos, ...logos].map((l, i) => (
              <span key={i} className="font-heading text-[.9rem] font-bold text-light whitespace-nowrap cursor-default hover:text-b4 transition-colors duration-[250ms]">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
