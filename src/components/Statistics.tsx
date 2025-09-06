const Statistics = () => {
  const stats = [
    {
      number: "500+",
      label: "Global Clients",
      description: "Fortune 500 companies trust our expertise"
    },
    {
      number: "15+",
      label: "Years Experience", 
      description: "Delivering excellence across industries"
    },
    {
      number: "95%",
      label: "Success Rate",
      description: "Projects completed on time and budget"
    },
    {
      number: "$2B+",
      label: "Value Generated",
      description: "Measurable impact for our clients"
    }
  ];

  return (
    <section className="py-32 gradient-primary">
      <div className="container mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-primary-foreground text-elite">
            Proven Results
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed text-luxury">
            Our track record speaks for itself. We deliver measurable outcomes that drive sustainable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center animate-scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="mb-6">
                <span className="text-6xl md:text-7xl font-bold text-accent text-elite block mb-2">
                  {stat.number}
                </span>
                <h3 className="text-2xl font-semibold text-primary-foreground text-elite mb-3">
                  {stat.label}
                </h3>
                <p className="text-primary-foreground/70 text-luxury">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;