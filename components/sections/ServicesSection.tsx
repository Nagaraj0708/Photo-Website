import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/data";

export default function ServicesSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="What We Do"
          title="Our Photography"
          titleHighlight="Services"
          description="From intimate portraits to grand weddings – we offer comprehensive photography and videography services tailored to your vision."
          className="mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
